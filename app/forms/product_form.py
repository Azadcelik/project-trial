from flask_wtf import FlaskForm
from wtforms import SubmitField,StringField,IntegerField,DateField,FloatField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class ProductForm(FlaskForm):
    
    make = StringField('Make', validators=[DataRequired()])
    mileage=FloatField('Mileage',validators=[DataRequired()])
    model = StringField('Model', validators=[DataRequired()])
    year = IntegerField('Year',validators=[DataRequired()])
    price = FloatField('Price',validators=[DataRequired()])
    type = StringField('Type', validators=[DataRequired()])
    image = FileField('Image File', validators=[FileRequired(),FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Submit')