# E-Commerce Django Backend

A scalable e-commerce backend built with Django and Django REST Framework.

## Features (Configured Structure)
- Custom User Model
- Modular Apps (`users`, `products`, `cart`, `orders`, `reviews`)
- Django REST Framework configured with `AllowAny` and `JSONRenderer`
- Environment Variables ready
- Health check API (`/api/health/`)

## Quick Start

### 1. Prerequisites
- Python 3.10+
- virtualenv

### 2. Installation Setup

Clone the repository and navigate to the project root:
```bash
# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On macOS/Linux

# Install dependencies
pip install -r requirements.txt
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following:
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
```

### 4. Database Setup
```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Running the Server
```bash
python manage.py runserver
```

Check the health API to verify it's running: `http://127.0.0.1:8000/api/health/`

### 6. Authentication API Testing

**1. Register a User**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/register/ \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "password": "securepassword123", "first_name": "Test", "last_name": "User"}'
```

**2. Login**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "password": "securepassword123"}'
```
*(This returns an `access` and `refresh` token)*

**3. Use Token in Headers**
To access protected routes like the profile endpoint, pass the `access` token in the `Authorization` header using the `Bearer` prefix:
```bash
curl -X GET http://127.0.0.1:8000/api/auth/profile/ \
     -H "Authorization: Bearer <your_access_token>"
```

### 7. Products API Testing

**1. List all Active Products**
```bash
curl -X GET http://127.0.0.1:8000/api/products/
```

**2. List all Categories**
```bash
curl -X GET http://127.0.0.1:8000/api/categories/
```

**3. Search and Filter Products**
```bash
# Search by name/description
curl -X GET "http://127.0.0.1:8000/api/products/?search=laptop"

# Filter by category
curl -X GET "http://127.0.0.1:8000/api/products/?category=1"
curl -X GET "http://127.0.0.1:8000/api/products/?category__slug=electronics"
```

### 8. Cart API Testing (Requires Context Token)

Run these endpoints securely using your `Bearer <access_token>`.

**1. Get Current Cart**
```bash
curl -X GET http://127.0.0.1:8000/api/cart/ \
     -H "Authorization: Bearer <your_access_token>"
```

**2. Add Product to Cart**
```bash
curl -X POST http://127.0.0.1:8000/api/cart/add/ \
     -H "Authorization: Bearer <your_access_token>" \
     -H "Content-Type: application/json" \
     -d '{"product_id": 1, "quantity": 2}'
```

**3. Update Cart Item Quantity**
```bash
curl -X POST http://127.0.0.1:8000/api/cart/update/ \
     -H "Authorization: Bearer <your_access_token>" \
     -H "Content-Type: application/json" \
     -d '{"product_id": 1, "quantity": 5}'
```

**4. Remove From Cart**
```bash
curl -X POST http://127.0.0.1:8000/api/cart/remove/ \
     -H "Authorization: Bearer <your_access_token>" \
     -H "Content-Type: application/json" \
     -d '{"product_id": 1}'
```

### 9. Orders & Checkout API Testing (Requires Context Token)

**1. Checkout (Convert Cart to Order)**
Creates a frozen snapshot of the current cart, logs the total price, and then empties the cart.
```bash
curl -X POST http://127.0.0.1:8000/api/orders/checkout/ \
     -H "Authorization: Bearer <your_access_token>"
```

**2. List User Orders**
```bash
curl -X GET http://127.0.0.1:8000/api/orders/ \
     -H "Authorization: Bearer <your_access_token>"
```

**3. Get Specific Order Details**
```bash
curl -X GET http://127.0.0.1:8000/api/orders/1/ \
     -H "Authorization: Bearer <your_access_token>"
```
