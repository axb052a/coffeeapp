# models.py
from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property  
from config import db, bcrypt

class CoffeeShop(db.Model, SerializerMixin):
    __tablename__ = 'coffee_shops'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    logo = db.Column(db.String(255))  # Add a column for the coffee shop logo filename or URL

    # Relationships
    menus = db.relationship('CoffeeMenu', back_populates='coffee_shop')
    reviews = db.relationship('CoffeeShopReview', back_populates='coffee_shop')

class CoffeeMenu(db.Model, SerializerMixin):
    __tablename__ = 'coffee_menus'

    id = db.Column(db.Integer, primary_key=True)
    menu = db.Column(db.String(200), nullable=False)

    coffee_shop_id = db.Column(db.Integer, db.ForeignKey('coffee_shops.id'), nullable=False)
    coffee_shop = db.relationship('CoffeeShop', back_populates='menus')

class CoffeeShopReview(db.Model, SerializerMixin):
    __tablename__ = 'coffee_shop_reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String(500))
    coffee_shop_id = db.Column(db.Integer, db.ForeignKey('coffee_shops.id'), nullable=False)
    coffee_shop = db.relationship('CoffeeShop', back_populates='reviews')

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String(120), unique=True, nullable=False)

    # Serialization
    serialize_rules = ('-password_hash', '-user')

    @hybrid_property
    def password_hash(self):
        raise ValueError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    @validates('username', 'email')
    def validate_signup(self, key, value):
        if not (len(value) >= 3):
            raise ValueError("User or Email must provide at least three characters to sign up.")

        # Check if the username or email already exists
        existing_user = User.query.filter(db.or_(User.username == value, User.email == value)).first()
        if existing_user:
            raise ValueError(" User already exists.")

        return value

    def __repr__(self):
        return f"User {self.username}, ID {self.id}"
