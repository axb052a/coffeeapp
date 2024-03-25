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
            {"name": "MoonGoat Coffee", "location": " 1985 Placentia Ave, Costa Mesa, CA 92627", "logo": "https://s3.amazonaws.com/cremaco-assets-p/sellers/logo_images/000/000/196/show_large/moongoat_logo.png?1610387943", "menus": ["Latte: $6.75", "Budget Bru: $5.00", "Churro Latte: $6.25", "Mocha: $6.25", "Chagaccino: $6.25"]},
            {"name": "in-sit Coffee", "location": "6930 Beach Blvd STE L301, Buena Park, CA 90621", "logo": "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/restaurant/cover/InsitCoffee6930BuenaParkCA.png", "menus": ["Strawberry Latte: $6.75", "Banana Latte: $5.50", "Matcha Latte: $6.00", "Maple Chai Latte: $6.00", "Hojicha Latte: $6.25"]},
            {"name": "Phin Smith", "location": "12921 Main St, Garden Grove, CA 92840", "logo": "https://media.licdn.com/dms/image/C560BAQHuKZucn6qaYg/company-logo_200_200/0/1630669131861?e=2147483647&v=beta&t=XkoXoIzz3lfoqY7BwBi6xzX8L3jy9baKmLeBqDLcKm0", "menus": ["Lavender Latte: $6.75", "Banana Coffee: $5.50", "Peanut Butter Coffee: $6.00", "Rose Latte: $5.75", "Vanilla Cold Brew: $6.25"]},
            {"name": "Thank You Coffee", "location": " 255 N Anaheim Blvd Unit D, Anaheim, CA 92805", "logo": "https://scontent-lax3-1.xx.fbcdn.net/v/t39.30808-6/292572333_532081511844828_4235685575538035811_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=JlbADUrx6ZYAX94NqZ7&_nc_ht=scontent-lax3-1.xx&oh=00_AfC0GeORn4OpRPw6WXfi4wav4idLStOz8xvrQRQ6EdBtmQ&oe=66076E56", "menus": ["Hojicha Latte: $6.00", "You're Welcome Latte: $6.00", "Five Spices Latte: $6.00", "Boring Latte: $6.00", "Pandan Blue Milk: $6.00"]},
            {"name": "Sojeata", "location": "115 E Commonwealth Ave Unit A, Fullerton, CA 92832", "logo": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1200,h=630,fit=crop,f=jpeg/A1ao121DVEhnzPL5/_sojeata-ig-marketing-posts-29-Yg2LvR4xGziQbjEZ.png", "menus": ["Thai Tea: $6.00", "Matcha Latte: $5.50", "Strawberry Matcha: $6.00", "Hojicha Latte: $5.75", "Chai Milk Latte: $6.25"]},
            {"name": "The Coffee Movement", "location": "1030 Washington St, San Francisco, CA 94108", "logo": "https://square-web-production-f.squarecdn.com/files/75d71ea135f28924d5ce4d9289470f48ff000b69/original.jpeg", "menus": ["Orange Cream Latte: $6.75", "Vanilla Rosemary Latte: $6.50", "Vanilla Lavender Latte: $6.00", "Ginger Spice Latte: $6.75", "Expresso Mule: $6.25"]},
            {"name": "Golden Goat Coffee", "location": "599 3rd St #100, San Francisco, CA 94107", "logo": "https://images.squarespace-cdn.com/content/v1/5bfb64a3e17ba3b14602e882/1580634224090-ZL2TBAS35WDQBRM51FO6/Goat+-+Only+-+Ring.png", "menus": ["Pandan Banana Matcha: $6.75", "Dirty Chai Tea Latte: $6.50", "Cortado: $5.00", "Vanilla Latte: $5.75", "Dulce de Leche Latte: $6.25"]},
            {"name": "Ikon Coffee", "location": "1302 22nd St, San Francisco, CA 94107", "logo": "https://toast-local-nyc3-production.nyc3.cdn.digitaloceanspaces.com/restaurants/4f1676eb-2a68-4893-8c78-04b958d9f03b/ikon-coffee-main-80920529-970.webp", "menus": ["Vanilla Latte: $8.00", "Mocha Shooter: $6.50", "Sproda: $6.50", "Ginger & Turmeric Latte: $6.00", "Double Oat 7: $6.50"]},
            {"name": "Telescope Coffee", "location": "345 6th St, San Francisco, CA 94103", "logo": "https://138234353.cdn6.editmysite.com/uploads/1/3/8/2/138234353/s672470702933373834_p51_i2_w1190.png?width=2400&optimize=medium", "menus": ["Honeycomb Latte (Hot Only): $7.75", "Matcha Latte: $6.50", "Matcha Rose Latte: $7.25", "Telescope Chai Latte: $7.50", "Maple Latte: $7.25"]},            
            {"name": "Saint Frank Coffee", "location": "2340 Polk St, San Francisco, CA 94109", "logo": "https://i.pinimg.com/originals/e1/ff/0a/e1ff0a0bb1f375e977c96ac1dc5187d0.png", "menus": ["Almond & Macadamia Nut Latte: $6.75", "Orange Cream Latte: $5.50", "Pumpkin Spice Latte: $6.00", "Cappuccino: $5.50", "Latte: $6.25"]},
            {"name": "Baci Coffee", "location": "2815 Camino del Rio S, San Diego, CA 92108", "logo": "https://bacicoffeehouse.com/wp-content/uploads/2024/01/cropped-imageedit_1_3773626506.png", "menus": ["Honey Creamy Latte: $6.75", "Matcha Latte: $5.50", "Pistachio Latte: $6.50", "Baci Crema: $7.75", "Latte: $6.25"]},
            {"name": "Good Omen Coffee", "location": "4590 Park Blvd, San Diego, CA 92116", "logo": "https://goodomencoffeeco.com/wp-content/uploads/2024/02/GoodOmenLogo-3.png", "menus": ["Mocha: $6.50", "Latte: $5.25", "Expresso: $3.50", "Matcha Latte: $6.00", "Drip Coffee: $4.00"]},
            {"name": "Holsem Coffee", "location": "2911 University Ave, San Diego, CA 92104", "logo": "https://024f40360c20d34f881f.cdn6.editmysite.com/uploads/b/024f40360c20d34f881f4061e8e7052c653169778a3896ba3b06392856fb2e22/Holsem_Wordmark-Positive_1665859383.png?width=2400&optimize=medium", "menus": ["Sea Salt Caramel Cappucchino: $6.25", "Rose Dusted Vanilla Latte: $6.50", "The Woods Latte: $6.50", "Strawberry Malt Latte: $6.50", "Banana Bread Cold Brew: $6.75"]},
            {"name": "Communal", "location": "602 S Tremont St Suite 100, Oceanside, CA 92054", "logo": "https://images.squarespace-cdn.com/content/v1/611d48cb414d845c2c5e28f1/4273e509-dbd5-4609-bb7f-ab9120a42512/Communal_FullLogo_2023+%281%29.png", "menus": ["Ube Matcha Latte: $6.50", "Blueberry Earl Grey Latte: $6.50", "Coconut Matcha: $6.50", "Lemon Almond Latte: $6.50", "Coconut Cream Cold Brew: $6.50"]},
            {"name": "Better Buzz Coffee", "location": "801 University Ave, San Diego, CA 92103", "logo": "https://customers.seomanager.com/knowledgegraph/logo/better-buzz-coffee_myshopify_com_logo.png", "menus": ["Horchata Iced Latte: $6.75", "Mint Infused Iced Coffee: $5.50", "Moroccan Spice Iced Coffee: $6.00", "Hazelnut Divinty: $7.75", "Killer Bee: $6.25"]}
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
            {"coffee_shop_id": 6, "rating": 3, "comment": "Nice ambiance, but the drinks could be better."},
            {"coffee_shop_id": 6, "rating": 5, "comment": "Excellent service and delicious pastries!"},            
            {"coffee_shop_id": 7, "rating": 4, "comment": "Cozy spot with a good selection of beverages."},
            {"coffee_shop_id": 7, "rating": 4, "comment": "I love their seasonal drinks!"},            
            {"coffee_shop_id": 8, "rating": 5, "comment": "The Vietnamese coffee here is amazing!"},
            {"coffee_shop_id": 8, "rating": 3, "comment": "Decent coffee, but the wait time is too long."},
            {"coffee_shop_id": 9, "rating": 5, "comment": "Best espresso in town!"},
            {"coffee_shop_id": 9, "rating": 4, "comment": "Great place to work with fast Wi-Fi."},            
            {"coffee_shop_id": 10, "rating": 4, "comment": "The ambiance here is relaxing."},
            {"coffee_shop_id": 10, "rating": 5, "comment": "Fantastic coffee and friendly staff!"},           
            {"coffee_shop_id": 11, "rating": 4, "comment": "Great place to grab a cup of joe before work!"},
            {"coffee_shop_id": 11, "rating": 5, "comment": "Love their specialty lattes!"},            
            {"coffee_shop_id": 12, "rating": 5, "comment": "Amazing coffee with a cozy atmosphere."},
            {"coffee_shop_id": 12, "rating": 4, "comment": "I enjoy their outdoor seating area."},            
            {"coffee_shop_id": 13, "rating": 3, "comment": "Good coffee, but the space feels cramped."},
            {"coffee_shop_id": 13, "rating": 5, "comment": "Friendly staff and delicious pastries!"},           
            {"coffee_shop_id": 14, "rating": 5, "comment": "My favorite coffee spot in town!"},
            {"coffee_shop_id": 14, "rating": 4, "comment": "Great place to study or catch up with friends."},           
            {"coffee_shop_id": 15, "rating": 4, "comment": "Consistently good coffee and excellent service."},
            {"coffee_shop_id": 15, "rating": 5, "comment": "Their cold brew is to die for!"},            
            {"coffee_shop_id": 16, "rating": 5, "comment": "Love their cozy atmosphere and delicious pastries."},
            {"coffee_shop_id": 16, "rating": 4, "comment": "Great spot for a morning coffee."},           
            {"coffee_shop_id": 17, "rating": 4, "comment": "Solid coffee selection and friendly staff."},
            {"coffee_shop_id": 17, "rating": 5, "comment": "The vibe here is always chill and inviting."},           
            {"coffee_shop_id": 18, "rating": 5, "comment": "Their cold brew is incredibly smooth."},
            {"coffee_shop_id": 18, "rating": 4, "comment": "Great place to work with free Wi-Fi."},           
            {"coffee_shop_id": 19, "rating": 4, "comment": "Cozy atmosphere and friendly staff."},
            {"coffee_shop_id": 19, "rating": 5, "comment": "Their pastries are divine!"},            
            {"coffee_shop_id": 20, "rating": 5, "comment": "Love their coffee and positive vibes!"},
            {"coffee_shop_id": 20, "rating": 4, "comment": "The staff here is always super friendly."},     
    ]

        for review_data in coffee_shop_reviews_list:
            coffee_shop_review = CoffeeShopReview(**review_data)
            db.session.add(coffee_shop_review)

        db.session.commit()
        print("Coffee Shop Reviews seeded successfully.")

      
