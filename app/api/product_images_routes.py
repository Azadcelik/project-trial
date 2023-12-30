# i defineley need product id
# creating images should be really easy 
# i will probably not focus on delete and update maybe not update but delete
 
#to start with create image, you have this form in the beginning which is token
#then you store new product image in a variable with attributes, then you add and add session and return object that is all.i think i do need return because of state 


from flask import Blueprint, request
from ..forms import ProductImageForm
from .aws_helpers import get_unique_filename, upload_file_to_s3
from ..models import ProductImage, Product,db
from datetime import date

product_images_routes = Blueprint('product_images',__name__)




product_images_routes.route('/<int:id>/images', methods = ["POST"])
def add_product_image(id):

    product = Product.query.get(id)
    form = ProductImageForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        image = form.data['url']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if 'url' not in upload:
            return upload
        
        new_image = ProductImage(
            product_id = product.id,
            url = upload['url'],
            created_at = date.today()
        )
        
        db.session.add(new_image)
        db.session.commit()

        return new_image.to_dict()
    else:
        print(form.errors)
        return form.errors
