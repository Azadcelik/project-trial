from flask import Blueprint,jsonify
from ..models import db
from flask_login import login_required,current_user
from ..models import Product,ShoppingCart,ShoppingCartItem
from datetime import date

shopping_cart = Blueprint('shopping-cart',__name__)


@shopping_cart.route('/add-to-cart/<int:id>',methods=["POST"])
@login_required
def add_to_cart(id):

    user = current_user
    product = Product.query.get(id)

    #first check if user have shoppingcart already
    shopping_cart = ShoppingCart.query.filter_by(user_id = user.id).first()

    #if user has no shopping cart create one cart 
    if not shopping_cart:
        shopping_cart = ShoppingCart(user_id = user.id,is_completed=False,created_at=date.today())
        db.session.add(shopping_cart)
        db.session.commit()

    #check if product in shoppingcart by shoppingcartitem mathcing
    shopping_cart_item = ShoppingCartItem.query.filter_by(shopping_cart_id=shopping_cart.id,product_id=product.id).first()

    #if product is inside shoppingcart just increase quantity
    if shopping_cart_item:
        shopping_cart_item.quantity += 1

    #otherwise create new product in shoppingcart by shoppingcartitem help
    else :
        shopping_cart_item = ShoppingCartItem(shopping_cart_id=shopping_cart.id,product_id=product.id,is_visible_in_cart=True,quantity=1)
        db.session.add(shopping_cart_item)
    
    db.session.commit()

    product_details = { 
        "id": product.id,
        "name": product.make,
        "model": product.model,
        "year": product.year,
        "price": product.price,
        "quantity": shopping_cart_item.quantity }
    return {"productDetails": product_details}, 200


@shopping_cart.route('/')
@login_required
def get_shopping_cart():

    user = current_user

    shopping_cart = ShoppingCart.query.filter_by(user_id=user.id).first()

    if not shopping_cart:
        return {"message": "Shopping cart not found"}, 404
    
    shopping_cart_items = ShoppingCartItem.query.filter_by(shopping_cart_id=shopping_cart.id).all()

    if not shopping_cart_items:
        return {"message": "No items in the shopping cart"}, 404
    
    cart_data = [{
        "id": item.id,
        "product_id": item.product_id,
        "image": item.product.image,
        "name": item.product.make,  # Accessing product details via the relationship
        "price": item.product.price,  # Accessing product details via the relationship
        "model": item.product.model,
        "year": item.product.year,
        "quantity": item.quantity
    } for item in shopping_cart_items]

    return cart_data


@shopping_cart.route('/<int:id>', methods=["DELETE"])
@login_required
def remove_item(id):

    user = current_user
    shopping_cart = ShoppingCart.query.filter_by(user_id=user.id).first()
    shopping_cart_item = ShoppingCartItem.query.filter_by(shopping_cart_id=shopping_cart.id).first()

    db.session.delete(shopping_cart_item)
    db.session.commit()
    return {"message": "succesfully deleted"}
    
