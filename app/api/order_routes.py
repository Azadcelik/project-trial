from flask import Blueprint,jsonify
from flask_login import login_required,current_user
from ..models import Product,Order,db,ShoppingCartItem,ShoppingCart, OrderItem
from  datetime import date


order_routes = Blueprint("order",__name__)


@order_routes.route('',methods=["POST"])
@login_required
def add_orders():
 user = current_user
 try:

    order = Order(user_id=user.id,order_date=date.today(),total_price=0)
    db.session.add(order)


    shopping_cart = ShoppingCart.query.filter_by(user_id=user.id).first()

    if shopping_cart:
        total_price = 0
        cart_items = ShoppingCartItem.query.filter_by(shopping_cart_id=shopping_cart.id).all()
        for item in cart_items:
            product = Product.query.get(item.product_id)
            print('pructioosadadsadsadsadsads',product.price)
            print(item.id)
            print('dfsdfsdfsfsfssdfdfsdfsdfs',item.product_id)
            print('order items in orderimtem',item.product_id,item.quantity,product.price)

           
            item_price = item.quantity * product.price
            print('adsadsadsadsadsadsads itempirce',item_price)
            total_price += item_price

            order_item = OrderItem(order_id=order.id,product_id=item.product_id,quantity=item.quantity)
            db.session.add(order_item)
            print('adsadsadsadsadsadsads',order_item)
        
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
 


@order_routes.route('')
@login_required
def get_order_history():
    user = current_user
    orders = Order.query.filter_by(user_id=user.id).all()
    
    history = []
    for order in orders:
        order_items = OrderItem.query.filter_by(order_id=order.id).all()
        items_data = []  # Initialize items_data as an empty list before the inner loop
        for item in order_items:

            product = Product.query.get(item.product_id)

            # Create a dictionary for each item's data and append it to items_data
            item_data = {
                "id": item.id,
                "product_id": item.product_id,
                "quantity": item.quantity,
                "price": product.price,
                "name": product.make,
                "image": product.image
                # Additional product details can be added here
            }
            items_data.append(item_data)  # Append item_data to items_data

        order_data = {
            "order_id": order.id,
            "order_date": order.order_date,
            "total_price": order.total_price,
            "items": items_data
        }
        history.append(order_data)

    return jsonify(history)