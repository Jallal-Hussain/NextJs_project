"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
// import toast from "react-hot-toast"

export default function ForgetPasswordPage() {
  const [user, setUser] = useState({ email: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await axios.post("/api/users/forgot-password", user);
      console.log("Success", response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Forgot Password
        </h1>
        <p className="text-sm text-center mb-4">
          You are not alone. We’ve all been here at some point
        </p>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email address below and we’ll send you a link to reset your
          password.
        </p>

        {success ? (
          <div className="text-center">
            <h2 className="text-green-600 text-center" aria-live="polite">
              A password reset link has been sent to your email!
            </h2>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={user.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm mb-4" aria-live="polite">
                {error}
              </p>
            )}
            <div>
              <button
                type="submit"
                className={`w-full py-2 px-4 rounded text-white ${
                  loading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 transition duration-300"
                }`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        )}

        <div className="text-center mt-6">
          <Link href="/login" className="text-blue-500 hover:underline text-sm">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
