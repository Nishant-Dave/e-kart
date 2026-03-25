from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem
from products.models import Product
from .serializers import CartSerializer

class CartAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_cart(self, user):
        cart, _ = Cart.objects.get_or_create(user=user)
        return cart

    def get(self, request):
        cart = self.get_cart(request.user)
        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data)

class AddToCartAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        if not product_id:
            return Response({"error": "product_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        product = get_object_or_404(Product, id=product_id, is_active=True)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product, defaults={'quantity': quantity})
        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class RemoveFromCartAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')

        if not product_id:
            return Response({"error": "product_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        cart_item = CartItem.objects.filter(cart=cart, product_id=product_id).first()
        if cart_item:
            cart_item.delete()

        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateCartItemAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity')

        if not product_id or quantity is None:
            return Response({"error": "product_id and quantity are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            quantity = int(quantity)
            if quantity < 1:
                return Response({"error": "quantity must be at least 1"}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({"error": "quantity must be an integer"}, status=status.HTTP_400_BAD_REQUEST)

        cart_item = CartItem.objects.filter(cart=cart, product_id=product_id).first()
        if cart_item:
            cart_item.quantity = quantity
            cart_item.save()
            serializer = CartSerializer(cart, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Item not found in cart"}, status=status.HTTP_404_NOT_FOUND)
