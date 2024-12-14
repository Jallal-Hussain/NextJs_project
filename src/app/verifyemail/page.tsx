"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log("Verification failed:", error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Verify Email
        </h1>
        <h2 className="text-sm text-gray-600 text-center mb-4">
          {token ? `Token: ${token}` : "No token provided."}
        </h2>

        {verified && (
          <div className="text-center">
            <h2 className="text-lg font-semibold text-green-600 mb-4">
              Your email has been verified successfully!
            </h2>
            <Link href="/login">Go to Login Page</Link>
          </div>
        )}

        {error && (
          <div className="text-center">
            <h2 className="text-lg font-semibold text-red-600 mb-4">
              Verification failed. Please try again.
            </h2>
            <p className="text-gray-600 text-sm">
              If the issue persists, request a new verification email.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
