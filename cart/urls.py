from django.urls import path
from .views import CartAPIView, AddToCartAPIView, RemoveFromCartAPIView, UpdateCartItemAPIView

app_name = 'cart'

urlpatterns = [
    path('', CartAPIView.as_view(), name='cart-detail'),
    path('add/', AddToCartAPIView.as_view(), name='cart-add'),
    path('remove/', RemoveFromCartAPIView.as_view(), name='cart-remove'),
    path('update/', UpdateCartItemAPIView.as_view(), name='cart-update'),
]
