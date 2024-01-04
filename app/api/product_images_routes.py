
from flask import Blueprint, request,jsonify
from flask_login import login_required
from ..forms import ProductImageForm
from .aws_helpers import get_unique_filename, upload_file_to_s3,remove_file_from_s3
from ..models import ProductImage, Product,db
from datetime import date

product_images_routes = Blueprint('product_images',__name__)


@product_images_routes.route('/<int:id>/images', methods=["POST"])
@login_required
def add_product_images(id):
    product = Product.query.get(id)
    if not product:
        return {"error": "Product not found"}, 404

    form = ProductImageForm()
    
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        uploaded_images = []
        for field in [form.image1, form.image2, form.image3, form.image4, form.image5]:
            if field.data:
                image_file = field.data
                image_file.filename = get_unique_filename(image_file.filename)
                upload = upload_file_to_s3(image_file)

                if 'url' not in upload:
                    return {"error": "Upload failed"}, 400

                new_image = ProductImage(
                    product_id=product.id,
                    url=upload['url'],
                    created_at=date.today()
                )

                db.session.add(new_image)
                uploaded_images.append(new_image)

        db.session.commit()
        return {"images": [image.to_dict() for image in uploaded_images]}
    else:
        return {"errors": form.errors}, 400
    


@product_images_routes.route('/<int:id>/images')
def get_product_images(id):
    product = Product.query.get(id)
    if not product:
        return {"error": "Product not found"}, 404

    images = ProductImage.query.filter_by(product_id=product.id).all()

    return {"images": [image.to_dict() for image in images]}


@product_images_routes.route('/<int:id>/images/delete', methods=["DELETE"])
def delete_product_images(id):
    try:
        # Check if product exists
        product = Product.query.get(id)
        if not product:
            return jsonify({"error": "Product not found"}), 404

        # Attempt to delete images
        images = ProductImage.query.filter_by(product_id=product.id).all()
        for image in images:
            try:
                remove_file_from_s3(image.url)
            except Exception as e:
                # Rollback if S3 deletion fails
                db.session.rollback()
                return jsonify({"error": "Failed to delete image from S3: " + str(e)}), 500

            db.session.delete(image)

        # Commit changes if all deletions are successful
        db.session.commit()
        return jsonify({"message": "Successfully deleted"}), 200

    except SQLAlchemyError as e:
        # Handle any other database errors
        db.session.rollback()
        return jsonify({"error": "Database error: " + str(e)}), 500