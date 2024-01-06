from .db import db,add_prefix_for_prod,environment,SCHEMA



class Order(db.Model):
    __tablename__ = "orders"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key = True, nullable = False)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')),nullable = False)
    order_date = db.Column(db.Date)
    total_price = db.Column(db.Integer)
    country = db.Column(db.String)
    full_name = db.Column(db.String)
    street_address = db.Column(db.String)
    apartment = db.Column(db.String)
    city = db.Column(db.String)
    zip_code = db.Column(db.String)

    user = db.relationship('User',back_populates="orders")
    order_items =db.relationship('OrderItem',back_populates="order")


    def to_dict(self,Printer=False):
        return_dict = {
            "id": self.id,
            "user_id": self.user_id,
            "order_date": self.order_date,
            "total_price": self.total_price,
            "country": self.country,
            "full_name": self.full_name,
            "street_address": self.street_address,
            "apartment": self.apartment,
            "city": self.city,
            "zip_code": self.zip_code
        }
        if Printer:
            print(return_dict)
            
        return return_dict