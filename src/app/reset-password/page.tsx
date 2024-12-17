"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Extract token from the URL
    const urlToken = window.location.search.split("=")[1];
    if (urlToken) {
      setToken(urlToken || "");
    } else {
      setError("Invalid or missing token");
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/users/reset-password", {
        token,
        newPassword: password,
      });
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 3000); // Redirect after 3 seconds
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        {error && (
          <div className="text-red-600 text-center bg-red-100 p-2 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 text-center bg-green-100 p-2 rounded">
            Password reset successfully! Redirecting to login page...
          </div>
        )}
        {!success && (
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your new password"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Re-enter your new password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
