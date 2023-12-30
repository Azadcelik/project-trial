from .db import db, add_prefix_for_prod, environment, SCHEMA



class ProductImage(db.Model):

    __tablename__ = 'productImages'

    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable = False)
    product_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('products.id')), nullable = False)
    url = db.Column(db.String,nullable = False)
    created_at = db.Column(db.Date, nullable = False)

    product = db.relationship('Product', back_populates = "product_images")


    def to_dict(self,Printer=False):
        
        return_dict = { 
            "id": self.id,
            "product_id":self.product_id,
            "url": self.url,
            "created_at": self.created_at
        }
        if Printer:
            print(return_dict)
        return return_dict