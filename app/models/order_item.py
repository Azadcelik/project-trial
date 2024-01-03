from .db import db,add_prefix_for_prod,environment,SCHEMA



class OrderItem(db.Model):

    __tablename__ = "orderItems"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key = True, nullable= False)
    order_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("orders.id")), nullable=False)
    product_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("products.id")),nullable=False)
    quantity = db.Column(db.Integer)

    order = db.relationship('Order',back_populates="order_items")
    product = db.relationship('Product',back_populates="order_items")


    def to_dict(self,Printer=False):
        return_dict =  { 
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "quantity": self.quantity
        }

        if Printer:
            print(return_dict)

        return return_dict