"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (buttonDisabled) return;

    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      toast.success("Signup successful! Redirecting to login...");
      router.push("/login");
    } catch (error: any) {
      console.error("Signup Failed", error.message);
      toast.error(error.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { email, password, username } = user;
    if (email.trim() && password.trim() && username.trim()) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Signup Page</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            {loading ? "Please wait..." : "Signup"}
          </h2>
          <form onSubmit={onSignUp}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-600 font-medium mb-2 pl-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your username"
                required
              />
            </div>
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
              className={`w-full py-2 px-4 rounded-lg text-white transition duration-300 ${
                buttonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={buttonDisabled}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
