from flask_wtf import FlaskForm
from wtforms import StringField,FileField,IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS



class ProductImageForm(FlaskForm):

    url = FileField('Url File', validators=[FileRequired(),FileAllowed(list(ALLOWED_EXTENSIONS))])

