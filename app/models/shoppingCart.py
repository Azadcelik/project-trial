from .db import db,environment,SCHEMA,add_prefix_for_prod



class ShoppingCart(db.Model):
    __tablename__ = "shoppingcarts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), unique=True)
    is_completed = db.Column(db.Boolean, nullable = False)
    created_at = db.Column(db.Date, nullable = False)

    user = db.relationship('User', back_populates = "shopping_cart", uselist=False)
    
    shopping_cart_items = db.relationship('ShoppingCartItem',back_populates="shopping_cart", cascade='all,delete-orphan')



    def to_dict(self,Printer=False):

        return_dict = { 
            "id": self.id,
            "user_id": self.user_id,
            "is_completed": self.is_completed,
            "created_at": self.created_at
        }

        if Printer:
            print(return_dict)

        return return_dict