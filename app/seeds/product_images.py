from ..models import ProductImage,User,environment,SCHEMA,db    
from datetime import date
from sqlalchemy.sql import text



def seed_product_images():
    product_image1 = ProductImage(
        product_id = 9,
        url = 'https://cars-projects.s3.us-east-2.amazonaws.com/toyota-4255751_640.jpg',
        created_at = date.today()
    )
    product_image2 = ProductImage(
        product_id = 9,
        url = 'https://cars-projects.s3.us-east-2.amazonaws.com/automobile-4828388_640.jpg',
        created_at = date.today()
    )
    product_image3 = ProductImage(
         product_id = 1,
         url = 'https://cars-projects.s3.us-east-2.amazonaws.com/hondacivic2-pexels-jakub-pabis-16475133.jpg',
         created_at = date.today()
    )
    product_image4 = ProductImage(
         product_id = 1,
         url = 'https://cars-projects.s3.us-east-2.amazonaws.com/hondacivic3-pexels-jakub-pabis-16475136.jpg',
         created_at = date.today()
    )
    product_image5 = ProductImage(
         product_id = 2,
         url = 'https://cars-projects.s3.us-east-2.amazonaws.com/hondacord2-pexels-nathan-tran-16387775.jpg',
         created_at = date.today()
    )  
    product_image6 = ProductImage(
         product_id = 2,
         url = 'https://cars-projects.s3.us-east-2.amazonaws.com/hondacord3-pexels-alex-akulov-18501544.jpg',
         created_at = date.today()
    )  
    product_image7 = ProductImage(
         product_id = 3,
         url = 'https://cars-projects.s3.us-east-2.amazonaws.com/hondahrv2-pexels-sebastian-pichard-6894421.jpg',
         created_at = date.today()
    )  
    product_image8 = ProductImage(
         product_id = 3,
         url = 'https://cars-projects.s3.us-east-2.amazonaws.com/hondahrv3-pexels-sebastian-pichard-9503685.jpg',
         created_at = date.today()
    )
    product_image9 = ProductImage(
         product_id = 4,
         url = 'https://cars-projects.s3.us-east-2.amazonaws.com/fortmustang2-pexels-david-gari-9403690.jpg',
         created_at = date.today()
    )
    product_image10 = ProductImage(
         product_id = 4,
         url = 'https://cars-projects.s3.us-east-2.amazonaws.com/fortmustang3-pexels-vraj-shah-638479.jpg',
         created_at = date.today()
    )   
    product_image11 = ProductImage(
         product_id = 5,
         url = 'https://cars-projects.s3.us-east-2.amazonaws.com/ford2-pexels-matt-weissinger-10306505.jpg',
         created_at = date.today()
    )   
    product_image12 = ProductImage(
         product_id = 5,
         url = 'https://cars-projects.s3.us-east-2.amazonaws.com/ford3-pexels-roberto-nickson-2791685.jpg',
         created_at = date.today()
    )   
    product_image13 = ProductImage(
         product_id = 6,
         url = 'https://cars-projects.s3.us-east-2.amazonaws.com/fordexplorer2-pexels-caleb-oquendo-7738877.jpg',
         created_at = date.today()
    )   
    product_image14 = ProductImage(
         product_id = 6,
         url = 'https://cars-projects.s3.us-east-2.amazonaws.com/fordexplorer3-pexels-matt-weissinger-10345648.jpg',
         created_at = date.today()
    )
    product_image15 = ProductImage(
         product_id = 7,
         url = 'https://cars-projects.s3.us-east-2.amazonaws.com/prius2-pexels-sindre-fs-1073030.jpg',
         created_at = date.today()
    ) 
    product_image16 = ProductImage(
         product_id = 7,
         url = 'https://cars-projects.s3.us-east-2.amazonaws.com/prius3-pexels-feli-art-7639013.jpg',
         created_at = date.today()
    )
    product_image17 = ProductImage(
         product_id = 8,
         url = 'https://cars-projects.s3.us-east-2.amazonaws.com/corolla2-pexels-syed-abdul-rehman-19510580.jpg',
         created_at = date.today()
    ) 
    product_image18 = ProductImage(
         product_id = 8,
         url = 'https://cars-projects.s3.us-east-2.amazonaws.com/corolla3-pexels-arshid-yousaf-18114787.jpg',
         created_at = date.today()
    )

    db.session.add_all([product_image1,product_image2,product_image3,product_image4,product_image5,product_image6,product_image7,product_image8,
                        product_image9,product_image10,product_image11,product_image12,product_image13,product_image14,product_image15,product_image16,
                        product_image17,product_image18])
    db.session.commit()


def undo_product_images():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.productImages RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM productImages"))
        
        db.session.commit()