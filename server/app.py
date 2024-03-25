# Remote library imports
from flask import request, make_response, session, jsonify
from flask_restful import Resource
from werkzeug.exceptions import Unauthorized
import re

# Local imports
from config import app, db, api

# Add your model imports
from models import *

class Signup(Resource):
    def post(self):
        data = request.get_json()

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        password_confirmation = data.get("password_confirmation")

        # Check if all required data are present
        if not (username and email and password and password_confirmation):
            return {"error": "All data are required"}, 400

        # Check if password and confirmation match
        if password != password_confirmation:
            return {"error": "Password and confirmation do not match"}, 400

        new_user = User(username=username, email=email)

        new_user.password_hash = password

        db.session.add(new_user)
        db.session.commit()

        session["user_id"] = new_user.id

        return new_user.to_dict()

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        # Check if username and password are present
        if not (username and password):
            return {"error": "Username and password are required"}, 400

        user = User.query.filter(User.username == username).first()

        # Check if user exists
        if user:
            # Check if the password is correct
            if user.authenticate(password):
                session["user_id"] = user.id
                print(f"Debug: User ID set in session: {session['user_id']}")
                return user.to_dict(rules=("_password_hash",))
            else:
                return {"error": "Invalid username or password"}, 401
        else:
            return {"error": "User not found"}, 401

class CheckSession(Resource):
    def get(self):
        user_id = session.get("user_id")
        print(f"Debug: User ID from session: {user_id}")

        if not user_id:
            print("Debug: No user in session")
            return {"message": "No user in session"}, 401

        user = User.query.get(user_id)

        if user:
            print(f"Debug: User found in the database - {user}")
            return user.to_dict(rules=("_password_hash",))
        else:
            print("Debug: User not found in the database")
            return {"message": "User not found in the database"}, 401

class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        return {"message": "200: No Content"}, 200

class CoffeeShopsResource(Resource):
    def get(self):
        coffee_shops = CoffeeShop.query.all()
        coffee_shops_list = []

        for shop in coffee_shops:
            coffee_shop_data = {
                'id': shop.id,
                'name': shop.name,
                'location': shop.location,
                'logo': shop.logo,
                'menus': [menu.menu for menu in shop.menus],
                'reviews': [{'id': review.id, 'rating': review.rating, 'comment': review.comment} for review in shop.reviews]
            }
            coffee_shops_list.append(coffee_shop_data)

        return jsonify({'coffee_shops': coffee_shops_list})

    def post(self):
        # Check if the user is authenticated
        if 'user_id' not in session:
            raise Unauthorized('User not logged in')

        data = request.get_json()

        name = data.get("name")
        location = data.get("location")
        logo = data.get("logo")
        menus = data.get("menus")  # Assume menus is an array of menu names

        if not (name and location and logo and menus):
            return make_response({"error": "Name, location, logo, and menus are required"}, 400)

        new_coffee_shop = CoffeeShop(name=name, location=location, logo=logo)

        # Create CoffeeMenu objects and associate them with the new_coffee_shop
        for menu_name in menus:
            coffee_menu = CoffeeMenu(menu=menu_name)
            new_coffee_shop.menus.append(coffee_menu)

        db.session.add(new_coffee_shop)
        db.session.commit()

        return make_response({'message': 'Coffee shop added successfully!'}, 201)
    
class CoffeeShopReviewsResource(Resource):
    def post(self, coffee_shop_id):
        data = request.get_json()

        coffee_shop = CoffeeShop.query.get(coffee_shop_id)

        if not coffee_shop:
            return make_response({"error": "Coffee shop not found"}, 404)

        rating = data.get("rating")
        comment = data.get("comment")

        new_review = CoffeeShopReview(rating=rating, comment=comment, coffee_shop_id=coffee_shop_id)
        
        db.session.add(new_review)
        db.session.commit()

        return make_response({'message': 'Coffee shop review added successfully!'}, 201)

    def delete(self, coffee_shop_id, review_id):
        # Retrieve the review
        review = CoffeeShopReview.query.filter_by(id=review_id, coffee_shop_id=coffee_shop_id).first()

        if not review:
            return make_response({"error": "Review not found"}, 404)

        db.session.delete(review)
        db.session.commit()

        return make_response({'message': 'Coffee shop review deleted successfully!'}, 200)
        
# Add routes to the API
api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(CheckSession, "/check_session")
api.add_resource(Logout, "/logout")
api.add_resource(CoffeeShopsResource, '/coffee-shops', '/coffee-shops/<int:coffee_shop_id>')
api.add_resource(CoffeeShopReviewsResource, '/coffee-shop-reviews/<int:coffee_shop_id>', '/coffee-shop-reviews/<int:coffee_shop_id>/<int:review_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
