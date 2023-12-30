from flask_wtf import FlaskForm
from wtforms import StringField,FileField,IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS



class ProductImageForm(FlaskForm):
    image1 = FileField('Image1', validators=[FileAllowed(ALLOWED_EXTENSIONS)])
    image2 = FileField('Image2', validators=[FileAllowed(ALLOWED_EXTENSIONS)])
    image3 = FileField('Image3', validators=[FileAllowed(ALLOWED_EXTENSIONS)])
    image4 = FileField('Image4', validators=[FileAllowed(ALLOWED_EXTENSIONS)])
    image5 = FileField('Image5', validators=[FileAllowed(ALLOWED_EXTENSIONS)])