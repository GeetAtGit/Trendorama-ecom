# Trendorama

A modern MERN-stack e-commerce prototype featuring user/admin authentication, product browsing, cart management, and role-based dashboards.

---

## 🚀 Features

- **Authentication & Authorization**  
  - JWT-based login & registration  
  - Role toggles for **User** vs **Admin**  
  - Protected routes & redirect to `/dashboard` or `/admin/dashboard`  

- **Product Catalog**  
  - Grid / List view toggle  
  - Search by product name  
  - Product images sourced dynamically from Unsplash  

- **Shopping Cart**  
  - Add, update quantity, remove items  
  - Persists per user in MongoDB  
  - “Proceed to Checkout” placeholder  

- **Global Header**  
  - Always visible (except on `/auth`)  
  - Links: Home, Shop, Cart (with item count), Dashboard / Login  

- **Responsive, Glass-morphic UI**  
  - TailwindCSS for utility-first styling  
  - Reusable components: `ProductCard`, `PrivateRoute`, `Header`  

---

## 🛠 Tech Stack

- **Frontend**  
  - React (Vite)  
  - React Router v6  
  - TailwindCSS  
  - Axios  

- **Backend**  
  - Node.js & Express  
  - MongoDB / Mongoose  
  - JSON Web Tokens  
  - CORS  

---

## ⚙️ Environment Variables

- MONGO_URI — MongoDB connection URI

- JWT_SECRET — Secret key for signing JWTs

- PORT — Backend port (default: 5050)

