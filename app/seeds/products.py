from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from ..models import Product
from datetime import date

def seed_product():
    product_1 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/f5c7e63c4eaf4a15971fea5b03153d9a.jpg",
        make = "Toyota",
        model = "Prius",
        year = "2008",
        price = 10000,
        type = "Hybrid",
        created_at = date.today()
    )
    db.session.add(product_1)
    db.session.commit()


def undo_product():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()