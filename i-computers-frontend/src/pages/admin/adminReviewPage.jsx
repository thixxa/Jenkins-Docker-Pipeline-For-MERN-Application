// src/pages/adminreviewpage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminReviewPage() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

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
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, [backendUrl]);

  function loadReviews() {
    setLoading(true);
    axios
      .get(backendUrl + "/reviews")
      .then((res) => setReviews(res.data || []))
      .catch(() => toast.error("Failed to load reviews"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function handleDelete(reviewId) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login as admin first");
      return;
    }

    // const ok = window.confirm("Are you sure you want to delete this review?");
    // if (!ok) return;

    setDeletingId(reviewId);

    axios
      .delete(backendUrl + `/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Review deleted");
        setReviews((prev) => prev.filter((r) => r.reviewId !== reviewId));
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Failed to delete review";
        toast.error(msg);
      })
      .finally(() => setDeletingId(null));
  }

  const isAdmin = user && user.role === "admin";

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

  return (
    <div className="w-full min-h-screen bg-primary text-secondary flex flex-col">
      <div className="w-full max-w-6xl mx-auto px-4 py-10 lg:py-14">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl lg:text-4xl font-extrabold">
            Manage customer reviews
          </h1>
        </div>

        {!user && (
          <div className="mb-4 text-sm text-red-500">
            You are not logged in. Please login as an admin user.
          </div>
        )}

        {user && !isAdmin && (
          <div className="mb-4 text-sm text-red-500">
            You are logged in as <b>{user.firstName}</b>, but this account is
            not an admin. Only admins can delete reviews.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/90 rounded-2xl shadow-md border border-white/70 px-4 py-3 hover:shadow-lg transition-shadow duration-300">
            <p className="text-xs text-secondary/60">Overall rating</p>
            {averageRating ? (
              <>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-accent">
                    {averageRating}
                  </span>
                  <span className="text-yellow-400 text-xl">★</span>
                </div>
                <p className="text-xs text-secondary/60 mt-1">
                  From {ratingReviews.length} rating
                  {ratingReviews.length === 1 ? "" : "s"}
                </p>
              </>
            ) : (
              <p className="text-xs text-secondary/60 mt-2">
                No ratings yet.
              </p>
            )}
          </div>

          <div className="bg-white/90 rounded-2xl shadow-md border border-white/70 px-4 py-3 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center">
            <p className="text-xs text-secondary/60">Total reviews</p>
            <p className="text-3xl font-extrabold mt-1">{reviews.length}</p>

          </div>

        </div>

        <div className="bg-white/80 rounded-2xl shadow-lg border border-white/60 p-4 lg:p-6">
          {loading ? (
            <p className="text-sm text-secondary/70">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-sm text-secondary/70">
              No reviews found yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-secondary text-primary">
                  <tr className="border-b border-gray-200 ">
                    <th className="text-left py-2 px-3">ID</th>
                    <th className="text-left py-2 px-3">Name</th>
                    <th className="text-left py-2 px-3">Email</th>
                    <th className="text-left py-2 px-3">Rating</th>
                    <th className="text-left py-2 px-3">Date</th>
                    <th className="text-left py-2 px-3">Comment</th>
                    <th className="text-center py-2 px-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr
                      key={review.reviewId}
                      className="border-b border-gray-100 hover:bg-gray-50/80"
                    >
                      <td className="py-2 px-3 align-top font-mono text-xs">
                        {review.reviewId}
                      </td>
                      <td className="py-2 px-3 align-top">
                        <div className="font-semibold">
                          {review.name || "-"}
                        </div>
                      </td>
                      <td className="py-2 px-3 align-top text-xs text-secondary/70">
                        {review.email || "-"}
                      </td>
                      <td className="py-2 px-3 align-top">
                        <div className="flex items-center gap-1 text-yellow-400 text-xs">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i}>
                              {review.rating && i < review.rating
                                ? "★"
                                : "☆"}
                            </span>
                          ))}
                          {review.rating ? (
                            <span className="ml-1 text-secondary/70">
                              ({review.rating})
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="py-2 px-3 align-top text-xs text-secondary/70 whitespace-nowrap">
                        {review.createdAt
                          ? new Date(review.createdAt).toLocaleString()
                          : "-"}
                      </td>
                      <td className="py-2 px-3 align-top max-w-[260px]">
                        <p className="line-clamp-3 text-xs text-secondary/80">
                          {review.comment || "-"}
                        </p>
                      </td>
                      <td className="py-2 px-3 align-top text-right">
                        <button
                          disabled={!isAdmin || deletingId === review.reviewId}
                          onClick={() => handleDelete(review.reviewId)}
                          className="px-3 py-1.5 rounded-full text-xs border border-red-500 bg-primary text-red-500 hover:bg-red-600 hover:text-primary"> 
                            Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="mt-4 text-xs text-secondary/60">
                Total reviews: {reviews.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
