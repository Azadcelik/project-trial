from .db import db,add_prefix_for_prod
import os

environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')


favorite = db.Table (
    "favorite",
    db.Model.metadata,
    db.Column("user_id",db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("product_id", db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), primary_key= True)
)

if environment == "production":
    favorite.schema = SCHEMA