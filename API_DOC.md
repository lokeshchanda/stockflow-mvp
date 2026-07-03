# STOCKFLOW API DOCUMENTATION

BASE URL
http://localhost:5000/api

AUTH APIs

POST /auth/register

{
  "name": "John",
  "email": "john@gmail.com",
  "password": "123456"
}

POST /auth/login

{
  "email": "john@gmail.com",
  "password": "123456"
}

RESPONSE

{
  "token": "JWT_TOKEN"
}

DASHBOARD API

GET /dashboard

HEADERS
Authorization: Bearer TOKEN

RESPONSE

{
  "totalProducts": 10,
  "totalQuantity": 120,
  "inventoryValue": 500000,
  "lowStockProducts": 3
}

PRODUCTS API

GET /products
POST /products
PUT /products/:id
DELETE /products/:id

POST BODY

{
  "product_name": "Laptop",
  "sku": "LP001",
  "quantity_in_hand": 10,
  "cost_price": 50000,
  "selling_price": 55000
}

NOTES
- JWT token required for protected routes
- Send token in Authorization header

FRONTEND URL
https://stockflow-mvp-rose.vercel.app/

TECH STACK
React, Node.js, Express, MySQL, JWT
