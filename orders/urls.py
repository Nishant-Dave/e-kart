from django.urls import path
from .views import CheckoutAPIView, OrderListAPIView, OrderDetailAPIView

app_name = 'orders'

urlpatterns = [
    path('', OrderListAPIView.as_view(), name='order-list'),
    path('checkout/', CheckoutAPIView.as_view(), name='checkout'),
    path('<int:id>/', OrderDetailAPIView.as_view(), name='order-detail'),
]
