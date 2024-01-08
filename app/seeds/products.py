from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from ..models import Product
from datetime import date
from .users import User

def seed_product():
    product_1= Product(
    user_id = 1,
    image = "https://cars-projects.s3.us-east-2.amazonaws.com/hondacivic1-pexels-jakub-pabis-16475137.jpg",
    make = "Honda",
    mileage = 30000,
    model = "Civic",
    year = "2019",
    price = 18000,
    type = "Hybrid",
    created_at = date.today()
    )

    product_2 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/hondacord1-pexels-nathan-tran-16387777.jpg",
        make = "Honda",
        mileage = 149.521,
        model = "Accord",
        year = "2008",
        price = 8.672,
        type = "Gasoline",
        created_at = date.today()
    )  
    product_3 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/hondahrv1-pichard-6894420.jpg",
        make = "Honda",
        mileage = 12.536,
        model = "CR-V",
        year = "2022",
        price = 22.976,
        type = "Electric",
        created_at = date.today()
    )  
    product_4 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/fortmustang1-pexels-avinash-patel-544542.jpg",
        make = "Ford",
        mileage = 12.214,
        model = "Mustang",
        year = "2023",
        price = 42.999,
        type = "Electric",
        created_at = date.today()
    )  
    product_5 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/ford1-pexels-jeremy-li-18990118.jpg",
        make = "Ford",
        mileage = 112.23,
        model = "F-150",
        year = "2020",
        price = 39.999,
        type = "Gasoline",
        created_at = date.today()
    )
    product_6 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/fordexplorer1-pexels-erik-mclean-4062472.jpg",
        make = "Ford",
        mileage = 112.23,
        model = "Explorer",
        year = "2017",
        price = 29.628,
        type = "Hybrid",
        created_at = date.today()
    )
    product_7 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/prius1-pexels-feli-art-7639015.jpg",
        make = "Toyota",
        mileage = 257.965,
        model = "Prius",
        year = "2008",
        price = 4.500,
        type = "Hybrid",
        created_at = date.today()
    )
    product_8 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/corolla1-pexels-chikinbun-14463430.jpg",
        make = "Toyota",
        mileage = 112.23,
        model = "Corolla",
        year = "2018",
        price = 10000,
        type = "Hybrid",
        created_at = date.today()
    )
   
    product_9 = Product(
    user_id = 2,
    image = "https://cars-projects.s3.us-east-2.amazonaws.com/toyota-347288_640.jpg",
    make = "Toyota",
    mileage = 85000,
    model = "Camry",
    year = "2015",
    price = 15000,
    type = "Gasoline",
    created_at = date.today()
)

    db.session.add_all([product_1,product_2,product_3,product_4,product_5,product_6,product_7,product_8,product_9])
    db.session.commit()

    user = User.query.all()

    db.session.add(user[0])
    db.session.add(user[1])
    db.session.commit()

    user[0].fav_products.append(product_1)
    user[1].fav_products.append(product_2)
    user[1].fav_products.append(product_3)

    db.session.commit()

def undo_product():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()