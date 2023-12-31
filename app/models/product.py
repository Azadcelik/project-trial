from .db import db,add_prefix_for_prod,environment,SCHEMA
from .favourites import favorite


def format_number(number):
        num_str = str(number)
        if len(num_str) <= 3:
            return num_str
        else:
            parts = []
            while num_str:
                parts.append(num_str[-3:])
                num_str = num_str[:-3]
            return '.'.join(reversed(parts))


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,primary_key=True,nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')),nullable=False)
    image = db.Column(db.String,nullable=False)
    mileage = db.Column(db.Integer,nullable=False)
    make = db.Column(db.String,nullable=False)
    model = db.Column(db.String,nullable=False)
    year = db.Column(db.Integer,nullable=False)
    price = db.Column(db.Float,nullable=False)
    type = db.Column(db.String,nullable=False)
    created_at = db.Column(db.Date,nullable=False)

    user = db.relationship('User', back_populates = 'products')
    product_favs = db.relationship("User", secondary = favorite, back_populates = "fav_products")
    review = db.relationship('Review', back_populates = "product", cascade='all, delete-orphan')
    shopping_cart_items = db.relationship('ShoppingCartItem',back_populates="product", cascade ='all,delete-orphan')
    product_images = db.relationship('ProductImage', back_populates = "product", cascade ='all,delete-orphan')
    order_items = db.relationship('OrderItem',back_populates="product", cascade='all,delete-orphan')


    

    def to_dict(self,Printer=False): 
        
       formatted_mileage = format_number(self.mileage)

       return_dict = { 
        "id": self.id,
        "user_id": self.user_id,
        "image": self.image,
        "make": self.make,
        "model": self.model,
        "year": self.year,
        "price": self.price,
        "type": self.type,
        "mileage": formatted_mileage,
        "created_at": self.created_at
       }
       if Printer:
           print(return_dict)
       return return_dict







