from .db import db,environment,SCHEMA



class ShoppingCart(db.Model):
    __tablename__ = "shoppingcarts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), uniqu=True)
    is_completed = db.Column(db.Boolean, nullable = False)
    created_at = db.Column(db.Date, nullable = False)


    user = db.relationship('User', back_populates = "shopping_cart", uselist=False)

