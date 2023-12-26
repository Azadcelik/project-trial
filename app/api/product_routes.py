from flask import Blueprint, request, make_response, jsonify
from flask_login import login_required, current_user
from ..models import Product, db
from ..forms import ProductForm
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

   product = Product.query.all()

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
      print('adsdasabjdsouadhsadoksadsloadslknadslknadsklnadsklnadsads',new_product)

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
        print('-----------------------------------------------',product)
        old_url = product.image
        image = form.data["image"]
        if not isinstance(image, str):
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
        