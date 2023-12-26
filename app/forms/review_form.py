from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired



class ReviewForm(FlaskForm): 
    text_body = StringField('Text', validators=[DataRequired()])
    star_rating = IntegerField('Star', validators=[DataRequired()])
    