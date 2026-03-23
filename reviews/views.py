from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Review
from products.models import Product
from .serializers import ReviewSerializer

class CreateOrUpdateReviewAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        product_id = request.data.get('product')
        rating = request.data.get('rating')
        comment = request.data.get('comment', '')

        if not product_id or rating is None:
            return Response({"error": "product and rating are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            rating = int(rating)
            if rating < 1 or rating > 5:
                return Response({"error": "rating must be between 1 and 5"}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({"error": "rating must be an integer"}, status=status.HTTP_400_BAD_REQUEST)

        product = get_object_or_404(Product, id=product_id)

        review, created = Review.objects.update_or_create(
            user=user, 
            product=product, 
            defaults={'rating': rating, 'comment': comment}
        )

        serializer = ReviewSerializer(review)
        status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        return Response(serializer.data, status=status_code)

class ProductReviewListAPIView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ReviewSerializer

    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        return Review.objects.filter(product_id=product_id).order_by('-created_at')
