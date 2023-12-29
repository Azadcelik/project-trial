"""empty message

Revision ID: 316ad974f03d
Revises: 599bb9aabed7
Create Date: 2023-12-27 12:37:09.242911

"""
from alembic import op
import sqlalchemy as sa

import os

environment = os.getenv(("FLASK_ENV"))
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '316ad974f03d'
down_revision = '599bb9aabed7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('shoppingcarts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('is_completed', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('shoppingcartitems',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('shopping_cart_id', sa.Integer(), nullable=False),
    sa.Column('is_visible_in_cart', sa.Boolean(), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.ForeignKeyConstraint(['shopping_cart_id'], ['shoppingcarts.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE shoppingcarts SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE shoppingcartitems SET SCHEMA {SCHEMA};")




def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('shoppingcartitems')
    op.drop_table('shoppingcarts')
    # ### end Alembic commands ###