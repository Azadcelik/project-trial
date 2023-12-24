from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from ..models import Product
from datetime import date

def seed_product():
    product_1 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/f5c7e63c4eaf4a15971fea5b03153d9a.jpg",
        make = "Toyota",
        mileage = 112.23,
        model = "Prius",
        year = "2008",
        price = 10000,
        type = "Hybrid",
        created_at = date.today()
    )
    product_2 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/f5c7e63c4eaf4a15971fea5b03153d9a.jpg",
        make = "Toyota",
        mileage = 112.23,
        model = "Prius",
        year = "2008",
        price = 10000,
        type = "Hybrid",
        created_at = date.today()
    )  
    product_3 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/f5c7e63c4eaf4a15971fea5b03153d9a.jpg",
        make = "Toyota",
        mileage = 112.23,
        model = "Prius",
        year = "2008",
        price = 10000,
        type = "Hybrid",
        created_at = date.today()
    )  
    product_4 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/f5c7e63c4eaf4a15971fea5b03153d9a.jpg",
        make = "Toyota",
        mileage = 112.23,
        model = "Prius",
        year = "2008",
        price = 10000,
        type = "Hybrid",
        created_at = date.today()
    )  
    product_5 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/f5c7e63c4eaf4a15971fea5b03153d9a.jpg",
        make = "Toyota",
        mileage = 112.23,
        model = "Prius",
        year = "2008",
        price = 10000,
        type = "Hybrid",
        created_at = date.today()
    )
    db.session.add_all([product_1,product_2,product_3,product_4,product_5])
    db.session.commit()


def undo_product():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()