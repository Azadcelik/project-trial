from .db import db,environment,SCHEMA,add_prefix_for_prod

class ShoppingCartItem(db.Model):

    __tablename__ = "shoppingcartitems"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, nullable= False, primary_key = True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    shopping_cart_id= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shoppingcarts.id')),nullable =False)
    is_visible_in_cart = db.Column(db.Boolean)
    quantity= db.Column(db.Integer)
    created_at = db.Column(db.Date)

    shopping_cart= db.relationship('ShoppingCart',back_populates="shopping_cart_items")
    product = db.relationship('Product',back_populates="shopping_cart_items")


    def to_dict(self, Printer=False):

        return_dict = { 
            "id": self.id,
            "product_id": self.product_id,
            "shopping_cart_id": self.shopping_cart_id,
            "is_visible_in_cart": self.is_visible_in_cart,
            "quantity": self.quantity,
            "created_at": self.created_at
        }

        if Printer:
            print(return_dict)

        return return_dict
