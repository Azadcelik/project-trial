from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import Product, db
from ..forms import ProductForm
from .aws_helpers import get_unique_filename, upload_file_to_s3
from datetime import date

product_routes = Blueprint('products', __name__)


@product_routes.route('')
def get_products():
   product = [product.to_dict() for product in Product.query.all()]
   return product



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

