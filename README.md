# Cafe Hopper

Cafe Hopper is a web application that allows users to explore various coffee shops, view their menus, leave reviews, and manage their accounts. This project consists of both front-end and back-end components.

## Front End

The front-end of Cafe Hopper is built using React.js and Material-UI for styling. It comprises several components responsible for different functionalities:

### Front-End Components:

1. **Home**: Displays a list of coffee shops and allows users to navigate to individual coffee shop pages.
2. **SearchPage**: Renders the home page with user-specific data.
3. **SignUp**: Allows users to sign up for a new account by providing a username, email, password, and password confirmation. It handles form submission, validation, and error handling.
4. **SuccessMessage**: Displays a success message upon successful user registration.
5. **UserProfile**: Displays user profile information including username, email, and profile image.

## Back End

The back-end of Cafe Hopper is built using Python and Flask, with SQLAlchemy for database management. It consists of several components responsible for handling API endpoints and database operations:

### Back-End Components:

1. **models.py**: Defines SQLAlchemy models for User, CoffeeShop, CoffeeMenu, and CoffeeShopReview. It includes methods for password hashing, user authentication, and validation.
2. **seed.py**: Seeds the database with initial data for users, coffee shops, and coffee shop reviews using Faker library. It inserts data into the respective tables using SQLAlchemy ORM.
3. **api.py**: Implements RESTful API endpoints for user authentication, session management, coffee shops, and coffee shop reviews. It handles user signup, login, logout, session check, and CRUD operations for coffee shops and their reviews.

---

This README provides an overview of the Cafe Hopper project, detailing both its front-end and back-end components, along with their functionalities and methods used.