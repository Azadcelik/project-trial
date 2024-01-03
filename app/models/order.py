from .db import db,add_prefix_for_prod,environment,SCHEMA



class Order(db.Model):
    __tablename__ = "orders"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key = True, nullable = False)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')),nullable = False)
    order_date = db.Column(db.Date)
    total_price = db.Column(db.Integer)


    user = db.relationship('User',back_populates="orders")
    order_items =db.relationship('OrderItem',back_populates="order")


    def to_dict(self,Printer=False):
        return_dict = {
            "id": self.id,
            "user_id": self.user_id,
            "order_date": self.order_date,
            "total_price": self.total_price
        }
        if Printer:
            print(return_dict)
            
        return return_dict