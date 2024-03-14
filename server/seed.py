#!/usr/bin/env python3
import bcrypt
from models import User, CoffeeShop, CoffeeMenu
# Standard library imports
from random import choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import *

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
    
        db.drop_all()
        db.create_all()
        
        # Seed for Users
        user_list = [
            {"username": "Anthony", "email": "anthony@example.com", "password": "password1"},
            {"username": "Jessica", "email": "jessica@example.com", "password": "password2"},
            {"username": "Kevin", "email": "kevin@example.com", "password": "password3"},
            {"username": "Ashley", "email": "ashley@example.com", "password": "password4"},
            {"username": "Charlie", "email": "charlie@example.com", "password": "password5"},
            {"username": "Donna", "email": "donna@example.com", "password": "password6"},
            {"username": "Michael", "email": "michael@example.com", "password": "password7"},
        ]

        for user_data in user_list:
            user = User(username=user_data["username"], email=user_data["email"])

            password = user_data["password"].encode("utf-8")
            password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

            user._password_hash = password_hash
            db.session.add(user)
        db.session.commit()
        print("Users seeded successfully.")

        # Seed for Coffee Shops
        coffee_shop_list = [
            {"name": "Maru Coffee", "location": "1019 S Santa Fe Ave, Los Angeles, CA 90021", "logo": "https://images.prismic.io/cenitzstudio/330dcd24-fab6-41bd-9977-345975d01147_Ligne+7.jpg?auto=compress,format&rect=0,0,1379,1420&w=640&h=659", "menus": ["Cream Top: $5.50", "Iced Matcha Latte: $6.75", "Expresso Tonic: $5.50", "Iced Vanilla Latte: $5.75", "Bon Bon: $5.25", "Seiun Matcha Tea: $6.00", "Drip Coffee: $4.50"]},
            {"name": "Laveta", "location": "318 Glendale Blvd, Los Angeles, CA 90026", "logo": "https://fastly.4sqi.net/img/general/600x600/557943196_aIzcb1884jMegjUwqaGRZmEpioUIkdiUKdOb2NmK6h8.jpg", "menus": ["Ube Latte: $5.75", "Matcha Misto: $6.25", "Barista Horchata: $6.75", "Berry Mojito Fiz: $6.50", "Chagachino: $5.00"]},
            {"name": "Damo", "location": "3510 W 8th St, Los Angeles, CA 90005", "logo": "https://i0.wp.com/visitkoreatown.org/wp-content/uploads/2023/02/damo_cafe_tea_ktown_la.jpg?fit=720%2C380&ssl=1", "menus": ["Iced Matcha Latte: $6.50", "Hojicha Cream Top: $5.75", "Hojicha Einspanner: $4.75", "Matcha Cream Matcha: $6.25", "Matcha Einspanner: $5.50"]},
            {"name": "Community Goods", "location": "710 N Edinburgh Ave, Los Angeles, CA 90046", "logo": "https://thecommunitygoods.com/cdn/shop/files/CG-LOGO-MAIN_adfdddd7-3655-4d40-8ea0-674e94847eb0.png?v=1702833259&width=600", "menus": ["Iced Matcha Latte: $6.25", "Hojicha Latte: $5.50", "Cafe con Leche: $6.25", "Vanilla Latte: $5.75", "Match Spanner: $6.00"]},
            {"name": "Yeems Coffee", "location": "3033 W 6th St #107, Los Angeles, CA 90020", "logo": "https://koreatownladirectory.com/wp-content/uploads/2022/05/yeems-coffee-la-ktown.jpg", "menus": ["Buttercream Latte: $6.75", "Matcha Latt: $5.50", "Strawberry Matcha: $6.00", "Vienna Cream: $7.75", "Dulce de Leche Latte: $6.25"]},
        ]

        for coffee_shop_data in coffee_shop_list:
            coffee_shop = CoffeeShop(name=coffee_shop_data["name"], location=coffee_shop_data["location"], logo=coffee_shop_data["logo"])

            # Create and associate menus for each coffee shop
            for menu_item in coffee_shop_data["menus"]:
                coffee_menu_data = {"menu": menu_item, "coffee_shop": coffee_shop}
                coffee_menu = CoffeeMenu(**coffee_menu_data)
                db.session.add(coffee_menu)

            db.session.add(coffee_shop)

        db.session.commit()
        print("Coffee Menus and Shops seeded successfully.")
        
        # Seed for Coffee Shop Reviews
        coffee_shop_reviews_list = [
            {"coffee_shop_id": 1, "rating": 4, "comment": "Great coffee and cozy atmosphere!"},
            {"coffee_shop_id": 1, "rating": 5, "comment": "Love the variety of drinks."},
            {"coffee_shop_id": 2, "rating": 3, "comment": "Nice place, but the drinks are a bit pricey."},
            {"coffee_shop_id": 2, "rating": 4, "comment": "Unique flavors and friendly staff."},
            {"coffee_shop_id": 3, "rating": 5, "comment": "Hojicha Einspanner is a must-try!"},
            {"coffee_shop_id": 3, "rating": 4, "comment": "Relaxing ambiance and good service."},
            {"coffee_shop_id": 4, "rating": 3, "comment": "Decent coffee, but not the best in the area."},
            {"coffee_shop_id": 4, "rating": 5, "comment": "Vanilla Latte is heavenly!"},
            {"coffee_shop_id": 5, "rating": 4, "comment": "Strawberry Matcha is refreshing."},
            {"coffee_shop_id": 5, "rating": 5, "comment": "Friendly staff and great coffee selections."},
        ]

        for review_data in coffee_shop_reviews_list:
            coffee_shop_review = CoffeeShopReview(**review_data)
            db.session.add(coffee_shop_review)

        db.session.commit()
        print("Coffee Shop Reviews seeded successfully.")

      
