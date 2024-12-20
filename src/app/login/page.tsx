"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import {
  showSuccessToast,
  showErrorToast,
  showLoadingToast,
  dismissToast,
} from "@/helpers/toast";

function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (buttonDisabled) return;

    setError(null); // Reset error state on new attempt
    const toastId = showLoadingToast("Logging in..."); // Show loading toast
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      showSuccessToast("Login successful!");
      router.push("/profile"); // Navigate to the profile page
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      showErrorToast(errorMessage);
    } finally {
      dismissToast(toastId); // Dismiss the loading toast
    }
  };

  useEffect(() => {
    const { email, password } = user;
    if (email.trim() && password.trim()) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 font-medium mb-2 pl-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-600 font-medium mb-2 pl-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={buttonDisabled}
              className={`w-full py-2 px-4 rounded-lg text-white transition duration-300 ${
                buttonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Login
            </button>
          </form>
          <div className="mb-4 text-sm font-sans ">
            <p className="mt-4 text-gray-600">
              <Link
                href="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot-password? &nbsp;
              </Link>
            </p>
            <p className="mt-4 text-center text-gray-600">
              Not registered yet?{" "}
              <Link href="/signup" className="text-blue-500 hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
