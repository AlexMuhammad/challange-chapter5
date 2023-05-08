# CHALLANGE 5 CAR API

This project is about implemetation of Design Pattern with Service Repository, Authentication with JWT Token and API documentation with standarized Open API which used Swagger UI.

## DIAGRAM DATABASE

![erd challange 5](/erd-car-api.png)

## Super Admin

- Email : superadmin@mail.com
- Password : superadmin123

## API Documentation

- http://{baseUrl}/api/v1/cars

## Do this before run!

1. Install node_modules

   > npm install

2. Setting .env as like as yours

   > DB_USERNAME = ""
   > DB_PASSWORD = ""
   > DB_HOST = ""
   > DB_NAME = ""
   > DB_DIALECT = ""
   > CLOUNDINARY_NAME= ""
   > API_KEY= ""
   > API_SECRET= ""

3. Create Database

   > npm run db:create

4. Migrate the model

   > npm run db:migrate

5. Use seeder

   > npm run db:seed

6. Here we goooooo
   > npm run dev
