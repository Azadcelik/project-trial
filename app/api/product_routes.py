from flask import Blueprint
from flask_login import login_required, current_user
from ..models import Product

product_routes = Blueprint('products', __name__)


@product_routes.route('')
def get_products():
   product = [product.to_dict() for product in Product.query.all()]
   return product
