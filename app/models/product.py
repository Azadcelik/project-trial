from .db import db,add_prefix_for_prod
from flask import Blueprint

class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer,primary_key=True,nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')),nullable=False)
    image = db.Column(db.String,nullable=False)
    make = db.Column(db.String,nullable=False)
    model = db.Column(db.String,nullable=False)
    year = db.Column(db.Integer,nullable=False)
    price = db.Column(db.Float,nullable=False)
    type = db.Column(db.String,nullable=False)
    created_at = db.Column(db.DateTime,nullable=False)








