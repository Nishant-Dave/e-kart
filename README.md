# 🛒 E-Commerce Full Stack Web Application

A modern full-stack e-commerce web application built using **Django, Django REST Framework, and React (Vite)**.
This project demonstrates real-world architecture, clean API design, and modern UI practices.

---

## 🚀 Features

### 🔐 Authentication

* Email-based login system
* JWT authentication (login, register, profile)
* Protected routes on frontend

---

### 🛍️ Product Management

* Product listing with categories
* Search, filtering, and sorting
* Product detail page
* Product images support

---

### 🛒 Cart System

* Add to cart
* Update quantity
* Remove items
* Real-time cart updates (global state)

---

### 💳 Orders & Checkout

* Checkout from cart
* Order creation
* Order history page
* Order status tracking

---

### ⭐ Reviews & Ratings

* Users can rate products (1–5)
* Add/update reviews
* Display product reviews

---

### 👤 User Profile

* View and update profile
* Change password
* Additional fields (phone, city)

---

### 🎨 UI/UX

* Built with Tailwind CSS
* Responsive desktop-first design
* Clean and modern layout
* Sidebar filters and navigation

---

## 🏗️ Tech Stack

### Backend

* Python
* Django
* Django REST Framework (DRF)
* SimpleJWT

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Database

* SQLite (development)
* PostgreSQL (recommended for production)

---

## 📂 Project Structure

### Backend (`ecommerce_backend`)

* users/
* products/
* cart/
* orders/
* reviews/

### Frontend (`ecommerce_frontend`)

* components/
* pages/
* services/
* context/
* layouts/

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

```bash
cd ecommerce_backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

python manage.py runserver
```

---

### 🔹 Frontend Setup

```bash
cd ecommerce_frontend
npm install
npm run dev
```

---

## 🌐 API Base URL

```
http://127.0.0.1:8000/api/
```

---

## 🔑 Environment Variables (Recommended)

Create a `.env` file in backend:

```
SECRET_KEY=your_secret_key
DEBUG=True
```

---

## 📸 Screenshots

*Add screenshots of your UI here (Product Page, Cart, etc.)*

---

## 🚀 Future Improvements

* Payment integration (Stripe/Razorpay)
* Guest cart support
* Email notifications
* Advanced analytics dashboard
* Deployment with Docker

---

## 📦 Deployment Plan

* Backend: Render / Railway
* Frontend: Vercel
* Database: PostgreSQL (Neon)

---

## 🧠 Learnings

This project helped in understanding:

* Full-stack architecture
* REST API design
* State management in React
* Authentication flows (JWT)
* Real-world e-commerce logic

---

## 🤝 Contributing

Feel free to fork this repository and contribute!

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Nishant Dave**

---
