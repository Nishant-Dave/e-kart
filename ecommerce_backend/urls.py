from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import health_check
from django.http import HttpResponse


def home(request):
    return HttpResponse("Backend is running 🚀")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', health_check, name='health_check'),
    path('', home),

    # App-level routing
    path('api/auth/', include('users.urls', namespace='users')),
    path('api/', include('products.urls', namespace='products')),
    path('api/cart/', include('cart.urls', namespace='cart')),
    path('api/orders/', include('orders.urls', namespace='orders')),
    path('api/reviews/', include('reviews.urls', namespace='reviews')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
