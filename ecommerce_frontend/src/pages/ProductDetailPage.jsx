import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '../services/products';
import { getReviews, createOrUpdateReview } from '../services/reviews';
import { useCart } from '../context/CartContext';
import { addToCart } from '../services/cart';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { updateCartState } = useCart();
  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);

  // Review Form States
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const isAuthenticated = !!localStorage.getItem('access_token');

  const fetchProductAndReviews = async () => {
    try {
      const productData = await getProductBySlug(slug);
      setProduct(productData);

      if (productData && productData.id) {
        const reviewsData = await getReviews(productData.id);
        setReviews(reviewsData.results ? reviewsData.results : reviewsData);
      }
    } catch (err) {
      console.error('Failed to fetch product data:', err);
      setError('Failed to load product details.');
    }
  };

  useEffect(() => {
    const initFetch = async () => {
      setLoading(true);
      await fetchProductAndReviews();
      setLoading(false);
    };
    if (slug) initFetch();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAdding(true);
    try {
      await addToCart(product.id, 1);
      updateCartState();
      alert('Product added to cart successfully!');
    } catch (err) {
      alert('Failed to add product to cart.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!product) return;
    
    setIsSubmittingReview(true);
    try {
      await createOrUpdateReview({
        product: product.id,
        rating,
        comment
      });
      
      // Refresh reviews list directly from backend
      const reviewsData = await getReviews(product.id);
      setReviews(reviewsData.results ? reviewsData.results : reviewsData);
      
      // Clear form
      setRating(5);
      setComment('');
      
    } catch (err) {
      console.error('Failed to submit review:', err);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-lg ${i <= rating ? 'text-yellow-400' : 'text-gray-200'}`}>
          ★
        </span>
      );
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 font-medium">Loading Product Details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 font-medium">{error || 'Product not found.'}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <p className="text-[11px] text-gray-500 uppercase tracking-widest font-semibold flex gap-2">
          <Link to="/" className="hover:text-black transition-colors">Home</Link> <span className="opacity-50">/</span>
          <Link to="/products" className="hover:text-black transition-colors">Shop</Link> <span className="opacity-50">/</span>
          <span className="text-black">{product.name}</span>
        </p>
      </div>

      {/* Main Product Layout */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <div className="w-full aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
            <img 
              src={product.image || `https://via.placeholder.com/600x600/f8fafc/0f172a?text=${encodeURIComponent(product.name)}`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <span className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-3">
            {product.category_name || product.category || 'Collection'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-slate-800 mb-8">
            ${Number(product.price).toFixed(2)}
          </p>
          
          <div className="prose text-slate-600 mb-10 text-lg leading-relaxed">
            <p>{product.description || 'No description available for this exquisite product.'}</p>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full max-w-sm bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-[0_4px_14px_0_rgba(15,23,42,0.39)] hover:shadow-[0_6px_20px_rgba(15,23,42,0.23)] ${isAdding ? 'opacity-70 cursor-not-allowed transform-none' : 'hover:-translate-y-0.5'}`}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-slate-100 pt-16 mt-16 max-w-4xl">
        <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Customer Reviews</h2>
        
        {/* Review Form Component */}
        <div className="mb-12 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Write a Review</h3>
          {!isAuthenticated ? (
            <div className="bg-slate-50 py-6 px-4 rounded-xl border border-slate-200 text-center">
              <p className="text-slate-600 mb-4 font-medium">Please sign in to share your thoughts.</p>
              <Link to="/login" className="inline-block bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors">
                Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Rating</label>
                <select 
                  value={rating} 
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full sm:w-48 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block p-3 outline-none"
                  required
                >
                  <option value="5">5 ★ - Excellent</option>
                  <option value="4">4 ★ - Very Good</option>
                  <option value="3">3 ★ - Good</option>
                  <option value="2">2 ★ - Fair</option>
                  <option value="1">1 ★ - Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Review Comment (Optional)</label>
                <textarea 
                  rows="4" 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What did you like or dislike?"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-slate-500 focus:border-slate-500 block p-4 outline-none resize-y"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmittingReview}
                className={`w-full sm:w-auto self-start bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors ${isSubmittingReview ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}
        </div>

        {reviews.length === 0 ? (
          <div className="bg-slate-50 rounded-2xl p-8 text-center text-slate-500 border border-slate-100">
            <p className="font-medium">No reviews yet for this product. Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">
                    {review.user_name || review.user?.first_name || review.user?.username || 'Anonymous User'}
                  </span>
                  {renderStars(review.rating)}
                </div>
                {review.comment && (
                  <p className="text-slate-600 leading-relaxed mt-1">"{review.comment}"</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
