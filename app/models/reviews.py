from .db import db, add_prefix_for_prod, environment, SCHEMA

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True,nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable = False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable = False)
    text_body = db.Column(db.String, nullable = False)
    star_rating = db.Column(db.Integer, nullable = False)
    created_at = db.Column(db.Date, nullable = False)

    product = db.relationship('Product', back_populates = "review")
    reviewer = db.relationship('User', back_populates = "reviews")


    def to_dict(self, Printer=False): 
        return_dict = { 
            "id" : self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "text_body": self.text_body,
            "star_rating": self.star_rating,
            "created_at": self.created_at
        }

        if Printer:
            print(return_dict)

        return return_dict
