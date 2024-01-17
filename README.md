# Carsy

Welcome to Carsy! It's my take on bringing the car marketplace into the e-commerce world. Think of it as Etsy, but instead of handmade crafts, it's all about cars. I got this idea when I heard about Amazon possibly selling cars. I thought, why not make a platform where buying and selling cars is as easy as ordering a book online?

Carsy is pretty simple to use and has a clean look, much like Etsy. I've added some cool features like image carousels for the cars.It's still a work in progress, but I'm excited about where it's going.

# Live Link
https://my-carsy.onrender.com

# Tech used
    Python Flask and React for the main framework.
    Redux for state management.
    CSS3 and HTML5 to make it look nice.
    Postgres for the database stuff.
    Render for hosting.

# Index
- [Database Schema][database-schema]
- [Future List][future-list]
- [User Stories][user-stories]
- [Wireframes][wireframes]

<!-- Reference-style link definitions -->
[database-schema]: https://github.com/Azadcelik/project-trial/wiki/Database-Schema
[future-list]: https://github.com/Azadcelik/project-trial/wiki/Future-List
[user-stories]: https://github.com/Azadcelik/project-trial/wiki/User-Stories
[wireframes]: https://github.com/Azadcelik/project-trial/wiki/Wireframes


# Endpoints


## Auth

| Request | Purpose | Return Value |
| ------- | ------- | ------------ |
| `GET /api/auth/` | Checks current user session | `{'id': INT, 'username': STRING, 'email': STRING}` |
| `POST /api/auth/unauthorized` | Handles unauthorized access | `{'errors': ARRAY[STRINGS]}` |
| `POST /api/auth/signup` | Processes new user registration | `{'id': INT, 'username': STRING, 'email': STRING}` |
| `POST /api/auth/login` | Attempts to log in a user | `{'id': INT, 'username': STRING, 'email': STRING}` |
| `POST /api/auth/logout` | Logs out the current user | `{'message': STRING}` |


## Product

| Request | Purpose | Return Value |
| ------- | ------- | ------------ |
| `GET /api/products/:id` | Retrieves a specific product by ID | `{"id": INT, "user_id": INT, "image": STRING, "make": STRING, "mileage": INT, "model": STRING, "year": INT, "price": FLOAT, "type": STRING,"created_at":DATE}`|
| `POST /api/products` | Creates a new product  | `{"id": INT, "user_id": INT, "image": STRING, "make": STRING, "mileage": INT, "model": STRING, "year": INT, "price": FLOAT, "type": STRING, "created_at": DATE}` |
| `PUT /api/products/:id` | Updates a specific product by ID  | `{"id": INT, "user_id": INT, "image": STRING, "make": STRING, "mileage": INT, "model": STRING, "year": INT, "price": FLOAT, "type": STRING}` |
| `DELETE /api/products/:id` | Deletes a specific product by ID  | `{"message": "successfully deleted"}` |


## Review

| Request | Purpose | Return Value |
| ------- | ------- | ------------ |
| `GET /api/products/:id/reviews` | Retrieves all reviews for a specific product | `[{ "review": {"id": INT, "user_id": INT, "product_id": INT, "text_body": STRING, "star_rating": INT, "created_at": DATE}, "product":{Product details}, "user": {User details} }]` |
| `POST /api/products/:id/new-review` | Adds a new review to a specific product (Auth required)  | `{ "review": {"id": INT, "user_id": INT, "product_id": INT, "text_body": STRING, "star_rating": INT, "created_at": DATE}, "product": {Product details}, "user": {User details} }` |
| `DELETE /api/reviews/:id` | Deletes a specific review by ID (Auth required)  | `{"message": "Review successfully deleted"}` |


## Shopping Cart

| Request | Purpose | Return Value |
| ------- | ------- | ------------ |
| `POST /api/shopping_cart/add-to-cart/<int:id>` | Adds a product to the shopping cart (Auth required) | `{ "productDetails": {"id": INT, "name": STRING, "model": STRING, "year": INT, "price": FLOAT, "quantity": INT} }` |
| `GET /api/shopping_cart/` | Retrieves the current user's shopping cart (Auth required) | `[{ "id": INT, "product_id": INT, "image": STRING, "name": STRING, "price": FLOAT, "model": STRING, "year": INT, "quantity": INT }]`|
| `DELETE /api/shopping_cart/<int:id>` | Removes an item from the shopping cart (Auth required) | `{"message": "successfully deleted"}` |


## Favorites

| Request | Purpose | Return Value |
| ------- | ------- | ------------ |
| `POST /api/products/:id/add-favorite` | Adds a product to favorites (Auth required) | `{ "id": INT, "user_id": INT, "image": STRING, "make": STRING, "mileage": INT, "model": STRING, "year": INT, "price": FLOAT, "type": STRING, "created_at": DATE }` |
| `GET /api/products/favorites` | Retrieves the user's favorite products (Auth required) | `[{ "id": INT, "user_id": INT, "image": STRING, "make": STRING, "mileage": INT, "model": STRING, "year": INT, "price": FLOAT, "type": STRING, "created_at": DATE }]` |
| `DELETE /api/products/:id/remove-favorite` | Removes a product from favorites (Auth required) | `{"message": "product removed from your favorites"}` |


## Product Images

| Request | Purpose | Return Value |
| ------- | ------- | ------------ |
| `POST /api/product_images/<int:id>/images` | Adds multiple images to a product (Auth required) | `{ "images": [{"product_id": INT, "url": STRING, "created_at": DATE}] }` |
| `GET /api/product_images/<int:id>/images` | Retrieves all images for a specific product | `{ "images": [{"product_id": INT, "url": STRING, "created_at": DATE}] }` |
| `DELETE /api/product_images/<int:id>/images/delete` | Deletes all images of a product | `{"message": "Successfully deleted"}` |


## Order

| Request | Purpose | Return Value |
| ------- | ------- | ------------ |
| `POST /api/orders` | Creates a new order (Auth required) | `{ "order_id": INT, "total_price": FLOAT }` |
| `GET /api/orders` | Retrieves the order history of the current user (Auth required) | `[{ "order_id": INT, "order_date": DATE, "total_price": FLOAT, "country": STRING, "full_name": STRING, "street_address": STRING, "apartment": STRING, "city": STRING, "zip_code": STRING, "items": [{"id": INT, "product_id": INT, "quantity": INT, "price": FLOAT, "name": STRING, "model": STRING, "year": INT, "image": STRING}] }]` |

# Feature List
1.Advanced search options to filter cars by make, model, year, price, etc.
2.Responsive Design

# Feature Implementation Goals
1.Enhanced Search Functionality
2.Diverse Payment System Integration
3.Develop a feedback feature where users can include photos in their car reviews
