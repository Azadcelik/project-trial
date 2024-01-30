from flask import Blueprint, request, make_response, jsonify
from flask_login import login_required, current_user
from ..models import Product, db, Review
from ..forms import ProductForm, ReviewForm
from .aws_helpers import get_unique_filename, upload_file_to_s3,remove_file_from_s3
from datetime import date


product_routes = Blueprint('products', __name__)


@product_routes.route('')
def get_products():
   product = [product.to_dict() for product in Product.query.all()]
   return product



@product_routes.route('/<int:id>')
def get_product(id):

   product = Product.query.get(id)
   if product:
        print(product)
        # Process and return the product data
        return product.to_dict()
   else:
        # Handle the case where product is not found
        return {"message": "Product not found"}, 404
   
   

@product_routes.route('/new-product', methods=['POST'])
@login_required
def create_product():
   """Create a new product """

#    product = Product.query.all()

   form = ProductForm()

   form["csrf_token"].data = request.cookies["csrf_token"]

   if form.validate_on_submit():

      image = form.data['image']
      image.filename = get_unique_filename(image.filename)
      upload = upload_file_to_s3(image)
      print(upload)

      if "url" not in upload:
         return upload
      

      new_product = Product (
         user_id = current_user.id,
         image = upload['url'],
         make = form.data['make'],
         mileage = form.data['mileage'],
         model = form.data['model'],
         year = form.data['year'],
         price = form.data['price'],
         type = form.data['type'],
         created_at = date.today()

      )

      db.session.add(new_product)
      db.session.commit()
      return new_product.to_dict()
   
   else:
      print(form.errors)
      return form.errors



@product_routes.route('/<int:id>/update',methods=["PUT"])
@login_required
def update_product(id):



   form = ProductForm()
   


   form["csrf_token"].data = request.cookies["csrf_token"]
   
   if form.validate_on_submit():
        
        product = Product.query.get(id)
        old_url = product.image
        image = form.data["image"]
        if image and hasattr(image, 'filename'): 
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print(upload)
            # print("UPLOAD FROM CREATE ALBUM ROUTE: ", upload)

            if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when you tried to upload
            # so you send back that error message (and you printed it above)
                return upload

            remove_file_from_s3(old_url)
            product.image = upload["url"]

        else:
            print("No new image provided. Keeping the old image.")
          
        product.make = form.data['make']
        product.mileage = form.data['mileage']
        product.model = form.data['model']
        product.year = form.data['year']
        product.type = form.data['type']
        product.price = form.data['price']

        db.session.commit()
        return product.to_dict()
   else :
      print(form.errors)
      return form.errors


@product_routes.route('/<int:id>/delete',methods=["DELETE"])
@login_required
def delete_product(id):
    
    product = Product.query.get(id)

    if (current_user.id != product.user_id):
        response = make_response({ "errors": { "message": "forbidden"} }, 401)
        return response
    old_url = product.image



    db.session.delete(product)
    db.session.commit()

    remove_file_from_s3(old_url)
    return {'message': 'succesfully deleted'}




@product_routes.route('/<int:id>/add-favorite', methods=["POST"])
@login_required
def add_favorite(id):
    
   product = Product.query.get(id)

   if not product:
       return {"message": "product not found"}, 404
   
   if product in current_user.fav_products:
       return {"message": "product is already in favorites"}
   
   current_user.fav_products.append(product)

   db.session.commit()


   return product.to_dict()



@product_routes.route('/favorites') 
@login_required
def view_favorites():
    user = current_user
    print(user)
    
    favorite_products = [product.to_dict() for product in user.fav_products]


    return jsonify(favorite_products)


@product_routes.route('/<int:id>/remove-favorite', methods =["DELETE"])
@login_required
def remove_favorite(id):
    
    user = current_user
    product_remove = Product.query.get(id)

    if not product_remove:
        return { "message": "product not found"}, 404
    
    if product_remove in user.fav_products: 
        user.fav_products.remove(product_remove)
        db.session.commit()
        return { "message": "product removed from your favorites"}
    else: 
        return { "message" : "product not in favorites"}
        


@product_routes.route('/<int:id>/new-review', methods=["POST"])
@login_required
def add_review(id):
    print(id,'adsadsdasdsadsadsadsasdadsadsadsaddaadadsads')

    data = request.json

    if not data:
        return {"error": "No data provided"}, 400
    
    product = Product.query.get(id)
    user = current_user

    existing_review = Review.query.filter_by(user_id = user.id, product_id = product.id).first()
    if existing_review:
        return jsonify({"message": "User already has a review for this product"}), 400
    

    new_review = Review(
        user_id=user.id,
        product_id=product.id,
        text_body=data.get('text_body'),
        star_rating=data.get('star_rating'),
        created_at=date.today()
    )

    db.session.add(new_review)
    db.session.commit()

    return_dict = new_review.to_dict()
    return_dict['product'] = product.to_dict()  # Assuming to_dict method exists
    return_dict['user'] = user.to_dict()        # Assuming to_dict method exists

    return return_dict


@product_routes.route('/<int:id>/get-reviews')
def get_reviews(id):
    product = Product.query.get(id)
    if not product:
        return {"error": "Product not found"}, 404

    reviews = Review.query.filter_by(product_id=product.id).all()
    

    reviews_data = []
    for review in reviews:
        review_dict = review.to_dict()  # Serialize the review
        review_dict['product'] = product.to_dict()  # Serialize the product
        review_dict['user'] = review.reviewer.to_dict()  # Serialize the user who wrote the review
        reviews_data.append(review_dict)

    return jsonify(reviews_data)


@product_routes.route('/<int:id>/delete-review', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    user = current_user

    if not review:
        return {"error": "Review not found"}, 404

    if user.id != review.user_id:  
        return {"error": "Unauthorized"}, 403

    db.session.delete(review)
    db.session.commit()

    return {"message": "Review successfully deleted"}


