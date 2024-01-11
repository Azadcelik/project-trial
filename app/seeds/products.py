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
        mileage = 149521,
        model = "Accord",
        year = "2008",
        price = 8672,
        type = "Gasoline",
        created_at = date.today()
    )  
    product_3 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/hondahrv1-pichard-6894420.jpg",
        make = "Honda",
        mileage = 12536,
        model = "CR-V",
        year = "2022",
        price = 22976,
        type = "Electric",
        created_at = date.today()
    )  
    product_4 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/fortmustang1-pexels-avinash-patel-544542.jpg",
        make = "Ford",
        mileage = 12214,
        model = "Mustang",
        year = "2023",
        price = 42999,
        type = "Electric",
        created_at = date.today()
    )  
    product_5 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/ford1-pexels-jeremy-li-18990118.jpg",
        make = "Ford",
        mileage = 11223,
        model = "F-150",
        year = "2020",
        price = 39999,
        type = "Gasoline",
        created_at = date.today()
    )
    product_6 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/fordexplorer1-pexels-erik-mclean-4062472.jpg",
        make = "Ford",
        mileage = 11223,
        model = "Explorer",
        year = "2017",
        price = 29628,
        type = "Hybrid",
        created_at = date.today()
    )
    product_7 = Product(
        user_id = 1,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/prius1-pexels-feli-art-7639015.jpg",
        make = "Toyota",
        mileage = 257965,
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
        mileage = 11223,
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
    product_10 = Product(
        user_id = 2,  
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/mercedes1-pexels-mike-bird-112452.jpg",  
        make = "Mercedes",
        mileage = 20140,
        model = "EQS", 
        year = "2021",
        price = 100000,  
        type = "Electric",
        created_at = date.today()
    )
    product_11 = Product(
        user_id = 2,  
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/mercedesc350-pexels-mike-bird-205740.jpg",  
        make = "Mercedes",
        mileage = 15260,  
        model = "C350e",  
        year = "2019",
        price = 50000, 
        type = "Hybrid",
        created_at = date.today()
    )
    product_12 = Product(
        user_id = 2,  
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/mercedescEclass-pexels-esmihel-muhammad-18369292.jpg",  
        make = "Mercedes",
        mileage = 32333,  
        model = "E-Class", 
        year = "2018",
        price = 40000,  
        type = "Gasoline",
        created_at = date.today()
    )
   


    product_13 = Product(
        user_id = 2,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/mustangg-pexels-vitali-adutskevich-17791011.jpg",
        make = "Ford",
        mileage = 25000,
        model = "Mustang",
        year = "2017",
        price = 35000,
        type = "Gasoline",
        created_at = date.today()
    )

    product_14 = Product(
        user_id = 2,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/mustang-pexels-jacob-moore-10905512.jpg",
        make = "Ford",
        mileage = 30000,
        model = "Mustang",
        year = "2016",
        price = 30000,
        type = "Gasoline",
        created_at = date.today()
    )

    product_15 = Product(
        user_id = 2,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/camry-pexels-dmitry-alexandrovich-8332625.jpg",
        make = "Toyota",
        mileage = 15000,
        model = "Camry",
        year = "2018",
        price = 20000,
        type = "Hybrid",
        created_at = date.today()
    )

    product_16 = Product(
        user_id = 2,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/F-150-pexels-matt-weissinger-14438397.jpg",
        make = "Ford",
        mileage = 20000,
        model = "F-150",
        year = "2019",
        price = 45000,
        type = "Gasoline",
        created_at = date.today()
    )

    product_17 = Product(
        user_id = 2,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/accord-pexels-luke-miller-19316768.jpg",
        make = "Honda",
        mileage = 18000,
        model = "Accord",
        year = "2017",
        price = 22000,
        type = "Hybrid",
        created_at = date.today()
    )

    product_18 = Product(
        user_id = 2,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/civic-pexels-rasheeque-ahnaf-(piash)-16378489.jpg",
        make = "Honda",
        mileage = 12000,
        model = "Civic",
        year = "2019",
        price = 19000,
        type = "Gasoline",
        created_at = date.today()
    )

    product_19 = Product(
        user_id = 2,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/eqs-pexels-mike-bird-193999.jpg",
        make = "Mercedes",
        mileage = 10000,
        model = "EQS",
        year = "2020",
        price = 70000,
        type = "Electric",
        created_at = date.today()
    )

    product_20 = Product(
        user_id = 2,
        image = "https://cars-projects.s3.us-east-2.amazonaws.com/e-class-pexels-paashuu-16000366.jpg",
        make = "Mercedes",
        mileage = 25000,
        model = "E-Class",
        year = "2018",
        price = 40000,
        type = "Gasoline",
        created_at = date.today()
    )


    

    db.session.add_all([product_1,product_2,product_3,product_4,product_5,product_6,product_7,product_8,product_9,
                        product_10,product_11,product_12,product_13,product_14,product_15,product_16,product_17,product_18,product_19,product_20])
    db.session.commit()



def undo_product():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()