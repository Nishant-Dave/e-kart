from django.urls import path
from .views import CreateOrUpdateReviewAPIView, ProductReviewListAPIView

app_name = 'reviews'

urlpatterns = [
    path('', CreateOrUpdateReviewAPIView.as_view(), name='create-update-review'),
    path('<int:product_id>/', ProductReviewListAPIView.as_view(), name='product-reviews'),
]
