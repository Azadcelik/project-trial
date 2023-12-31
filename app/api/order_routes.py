from flask import Blueprint,jsonify
from flask_login import login_required,current_user
from ..models import Product,Order,db,ShoppingCartItem,ShoppingCart, OrderItem
from  datetime import date


order_routes = Blueprint("order",__name__)


@order_routes.route('/<int:id>/order',methods=["POST"])
@login_required
def add_orders(id):

 user = current_user
 try:

    order = Order(user_id=user.id,order_date=date.today(),total_price=0)
    db.session.add(order)
    db.session.commit()


    shopping_cart = ShoppingCart.query.filter_by(user_id=user.id).first()

    if shopping_cart:
        total_price = 0
        cart_items = ShoppingCartItem.query.filter_by(shopping_cart_id=shopping_cart.id).all()
        for item in cart_items:
            product = Product.query.get(item.product_id)
           
            item_price = item.quantity * product.price
            total_price += item_price

            order_item = OrderItem(order_id=order.id,product_id=item.product_id,quantity=item.quantity)
            db.session.add(order_item)
        
        order.total_price= total_price

        db.session.delete(shopping_cart)

        db.session.commit()
        return {"order_id": order.id, "total_price": total_price}, 200
    else:
        # Handle the case where the shopping cart is empty or does not exist
        return {"error": "Shopping cart is empty or does not exist"}, 400
 except Exception as e:
        db.session.rollback()  # Rollback transaction in case of error
        return jsonify({"error": str(e)}), 500
 

@order_routes.route('/', methods=["GET"])
@login_required
def get_order_history():
    user = current_user
    orders = Order.query.filter_by(user_id=user.id).all()
    
    history = []
    for order in orders:
        order_items = OrderItem.query.filter_by(order_id=order.id).all()

        items_data = [{
            "id": item.id,
            "product_id": item.product_id,
            "quantity": item.quantity
            # You can add more details here if needed, e.g., product details
        } for item in order_items]

        order_data = {
            "order_id": order.id,
            "order_date": order.order_date.strftime("%Y-%m-%d"),  # Format date as needed
            "total_price": order.total_price,
            "items": items_data
        }
        history.append(order_data)

    return jsonify(history)