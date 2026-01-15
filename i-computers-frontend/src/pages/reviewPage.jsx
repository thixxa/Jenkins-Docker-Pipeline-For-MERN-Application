import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ReviewPage() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    axios
      .get(backendUrl + "/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, [backendUrl]);

  async function loadReviews() {
    setLoading(true);
    axios
      .get(backendUrl + "/reviews")
      .then((res) => {
        setReviews(res.data || []);
      })
      .catch(() => {
        toast.error("Failed to load reviews");
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadReviews();
  }, []);

  const ratingReviews = reviews.filter(
    (r) => r.rating != null && r.rating > 0
  );
  const averageRating =
    ratingReviews.length > 0
      ? (
          ratingReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
          ratingReviews.length
        ).toFixed(1)
      : null;

  function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to submit a review");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write your review");
      return;
    }

    if (rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }

    setSubmitting(true);

    axios
      .post(
        backendUrl + "/reviews",
        {
          rating,
          comment,
          name: name.trim() || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Thank you for your feedback!");
        setComment("");
        setRating(5);
        setName("");
        loadReviews();
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Failed to submit review";
        toast.error(msg);
      })
      .finally(() => setSubmitting(false));
  }

  return (
    <div className="w-full min-h-screen bg-primary text-secondary flex flex-col">
      <main className="relative flex-1 overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/homeviewpagebg.jpg')" }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-primary/15"></div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-10 lg:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <p className="uppercase tracking-[0.25em] text-xs text-accent/80 font-semibold">
                Customer Reviews
              </p>
              <h1 className="text-3xl lg:text-4xl font-extrabold mt-2 text-primary">
                What people say about{" "}
                <span className="text-accent">i Computers</span>
              </h1>
              <p className="mt-3 text-sm lg:text-base text-primary/70 max-w-xl">
                Share your experience about our gaming laptops, custom PCs and
                accessories – your feedback helps us improve.
              </p>
            </div>

            <div className="bg-accent/10 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-md border border-white/60 min-w-[200px]">
              <p className="text-xs text-primary">Overall rating</p>
              {averageRating ? (
                <>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-accent">
                      {averageRating}
                    </span>
                    <span className="text-yellow-400 text-xl">★</span>
                  </div>
                  <p className="text-xs text-primary/70 mt-1">
                    Based on {ratingReviews.length} rating
                    {ratingReviews.length === 1 ? "" : "s"}
                  </p>
                </>
              ) : (
                <p className="text-xs text-primary/70 mt-2">
                  No ratings yet. Be the first!
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] gap-10">
            <div className="bg-accent/10 rounded-2xl shadow-lg p-6 border border-white/70">
              <h2 className="text-xl font-semibold mb-4 text-primary">Leave a review</h2>

              {!user && (
                <p className="text-sm text-primary/70 mb-4">
                  Please{" "}
                  <Link
                    to="/login"
                    className="text-accent font-semibold underline"
                  >
                    login
                  </Link>{" "}
                  to submit your review.
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-primary/70">
                    Your Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        className={
                          "w-9 h-9 rounded-full border flex items-center justify-center text-lg transition " +
                          (rating >= value
                            ? "bg-yellow-400 border-yellow-400 text-white"
                            : "bg-white border-gray-300 text-yellow-500")
                        }
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-primary/70">
                    Your Review
                  </label>
                  <textarea
                    className="w-full min-h-[140px] rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none text-primary/90 focus:ring-2 focus:ring-accent/40"
                    placeholder="Tell us about the product quality, performance or service..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent lg:bg-accent/60 text-white font-semibold py-2.5 rounded-xl text-sm lg:hover:bg-accent hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {submitting ? "Submitting..." : "Submit review"}
                </button>
              </form>
            </div>

            <div className="bg-accent/10 rounded-2xl shadow-inner border border-white/60 p-4 lg:p-5 max-h-[500px] overflow-y-auto">
              {loading && (
                <p className="text-sm text-primary/70">Loading reviews...</p>
              )}

              {!loading && reviews.length === 0 && (
                <p className="text-sm text-primary/70">
                  No reviews yet. Be the first to share your experience!
                </p>
              )}

              {!loading &&
                reviews.map((review) => (
                  <div
                    key={review.reviewId}
                    className="bg-accent/5 border border-gray-100 rounded-2xl p-4 mb-3 shadow-sm"
                  >
                    <div className="flex justify-between items-start gap-4 transition-shadow p-1 rounded-lg">
                      <div>
                        <p className="font-semibold text-sm text-accent">
                          {review.name}
                        </p>
                        <p className="text-xs text-primary/70">
                          {review.email}
                        </p>
                        <p className="text-xs text-primary/70 mt-1">
                          {review.createdAt
                            ? new Date(review.createdAt).toLocaleDateString()
                            : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400 text-sm">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>
                            {review.rating && i < review.rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="mt-3 text-sm text-primary/90 text-justify">
                        {review.comment}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
