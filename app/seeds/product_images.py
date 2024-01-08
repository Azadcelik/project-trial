from ..models import ProductImage,User,environment,SCHEMA,db    
from datetime import date
from sqlalchemy.sql import text



def seed_product_images():
    product_image1 = ProductImage(
        product_id = 21,
        url = 'https://cars-projects.s3.us-east-2.amazonaws.com/toyota-4255751_640.jpg',
        created_at = date.today()
    )
    product_image2 = ProductImage(
        product_id = 21,
        url = 'https://cars-projects.s3.us-east-2.amazonaws.com/automobile-4828388_640.jpg',
        created_at = date.today()
    )

    db.session.add_all([product_image1,product_image2])
    db.session.commit()


def undo_product_images():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.productImages RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM productImages"))
        
        db.session.commit()