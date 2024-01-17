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
| ------- | ------- | ------ |
| `GET /api/products` | Retrieves all products |[{
    "id": INT,
    "user_id": INT,
    "image": STRING,
    "make": STRING,
    "mileage": INT,
    "model": STRING,
    "year": INT,
    "price": FLOAT,
    "type": STRING,
    "created_at": DATE
  }
]|
