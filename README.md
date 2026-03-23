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
