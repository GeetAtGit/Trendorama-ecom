# 🎨 **Trendorama**

A modern **MERN-stack e-commerce platform** with secure JWT- based authentication, Razorpay integration, address management, orders, and a **playful yet minimal UI**. 

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)
![Razorpay](https://img.shields.io/badge/Payments-Razorpay-purple?logo=razorpay)
![Netlify](https://img.shields.io/badge/Deployed%20On-Netlify-blue?logo=netlify)
![Render](https://img.shields.io/badge/Backend%20On-Render-orange?logo=render)

---
## 🌐 **Live Demo**
🔗 [Website](https://trendorama-ecom.netlify.app/)  


## 📸 **Screenshots**
![Homepage](./screenshots/homepage.png)
![Shop](./screenshots/shop.png)
![Cart](./screenshots/cart.png)
![Checkout](./screenshots/checkout.png)

---

## 🚀 **Features**

### 🔐 **Authentication & Authorization**
- 🔑 JWT-based login & registration  
- 👥 Role toggles for **User** vs **Admin**  
- 🔒 Protected routes with role-based redirects  

### 🛍 **Product Catalog**
- 🗂️ Grid / List view toggle  
- 🔍 Search & filter by product name  
- 🖼️ Dynamic product images  

### 🛒 **Shopping Cart**
- ➕ Add, 🔄 update quantity, ❌ remove items  
- 🧹 Auto-remove items when quantity hits **0**  
- 📦 Persists per user in MongoDB  
- 💳 **Razorpay checkout integration** with secure payment flow  

### 🏠 **Address Management**
- 🏷️ Add, ✏️ edit, 🗑️ delete shipping addresses  
- 💾 LocalStorage persistence for quick checkout  
- 🌐 Future-ready backend integration  

### 💳 **Payment Gateway**
- 🔗 **Razorpay integration**  
- 🔐 Creates secure order IDs via backend  
- 📝 Pre-fills user details for smooth checkout  
- ✅ Handles payment success callback  

### 📦 **Orders**
- 🛒 Place orders linked with user & payment ID  
- 📜 Fetch past orders from backend  
- 📂 Simple order history page  

### 👤 **Profile Management**
- 🖊️ View and edit profile (Name, Email, Role)  
- 🔒 Protected API routes  
- 🗄️ Updates persist in database  

### 🎨 **UI/UX**
- ✨ **Playful & minimal design**  
- 🌈 Radial gradients for hero sections  
- 🎞️ Animated icons for features & CTAs  
- 📱 Responsive header with hamburger + sidebar  
- 💳 Address cards with icons & hover animations  
- 🪟 Glass-morphic authentication screens  

---

## 🛠 **Tech Stack**

### 🖥️ **Frontend**
- ⚛️ React (Vite)  
- 🛣️ React Router v6  
- 🎨 TailwindCSS  
- 🌐 Axios  

### ⚙️ **Backend**
- 🟢 Node.js & Express  
- 🍃 MongoDB / Mongoose  
- 🔑 JSON Web Tokens  
- 💳 Razorpay SDK  
- 🔗 CORS

---
## 📂 **Project Directory Structure**

```bash
Trendorama/
│
├── 📁 backend/                # Node.js + Express server
│   ├── 📁 config/             # DB & Razorpay config
│   ├── 📁 controllers/        # Auth, product, cart, order controllers
│   ├── 📁 models/             # Mongoose schemas (User, Product, Cart, Order)
│   ├── 📁 routes/             # API routes for auth, products, cart, orders
│   ├── 📁 utils/              # JWT utils, middlewares
│   ├── server.js              # Express app entry point
│   └── .env                   # Environment variables
│
├── 📁 frontend/               # React (Vite) app
│   ├── 📁 src/
│   │   ├── 📁 components/     # Reusable UI components
│   │   ├── 📁 pages/          # Auth, Dashboard, Cart, Orders pages
│   │   ├─- 📁 context/        # Auth & Cart Contexts
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── tailwind.config.js
│   └── vite.config.js
├── README.md
└── package.json
```

---

## 💳 **Razorpay Integration**
- 🔒 Secure backend-created orders  
- 🔑 Uses `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`  
- 💼 Fully integrated checkout with address & user data  
- ✅ Handles payment success callback  

---

## 🌐 **APIs & Deployment**
- 🔗 **Worked extensively with REST APIs** for authentication, products, cart, orders, and Razorpay payment flow  
- 🚀 **Deployed backend** on Render (Node + Express + MongoDB)  
- 🌍 **Deployed frontend** on Netlify (React + Vite)  
- 💳 Integrated Razorpay Payment Gateway with **secure server-side order creation** and **client-side checkout**  

---

## **🚀 Deployment**
-🖥️ Backend: Render (Node + Express + MongoDB)

-🌐 Frontend: Netlify (React Vite)

---
