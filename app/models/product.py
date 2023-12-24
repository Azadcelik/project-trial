from .db import db,add_prefix_for_prod,environment,SCHEMA


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,primary_key=True,nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')),nullable=False)
    image = db.Column(db.String,nullable=False)
    make = db.Column(db.String,nullable=False)
    model = db.Column(db.String,nullable=False)
    year = db.Column(db.Integer,nullable=False)
    price = db.Column(db.Float,nullable=False)
    type = db.Column(db.String,nullable=False)
    created_at = db.Column(db.Date,nullable=False)

    user = db.relationship('User', back_populates = 'products')

    def to_dict(self,Printer=False): 
        
       return_dict = { 
        "id": self.id,
        "user_id": self.user_id,
        "image": self.image,
        "make": self.make,
        "model": self.model,
        "year": self.year,
        "price": self.price,
        "type": self.type,
        "created_at": self.created_at
       }
       if Printer:
           print(return_dict)
       return return_dict







