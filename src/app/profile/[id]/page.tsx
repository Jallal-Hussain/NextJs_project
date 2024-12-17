"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";

interface UserProfileProps {
  params: Promise<{ id: string }>;
}

const UserProfile = ({ params }: UserProfileProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [id, setId] = useState<string>("");

  // Unwrap the params and set the ID
  useEffect(() => {
    const getId = async () => {
      const resolvedParams = await params; // Unwrap the params Promise
      setId(resolvedParams.id); // Set the user ID
    };

    getId();
  }, [params]);

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/api/users/${id}`);
          setUser(response.data.data); // Set user data
        } catch (err: any) {
          setError(err.response?.data?.error || "Failed to fetch user data.");
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            User Profile
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : user ? (
            <>
              <div className="mb-4">
                <p className="text-gray-600 font-medium">User ID:</p>
                <p className="text-gray-800">{user._id}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 font-medium">Username:</p>
                <p className="text-gray-800">{user.username}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 font-medium">Email:</p>
                <p className="text-gray-800">{user.email}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 font-medium">Joined:</p>
                <p className="text-gray-800">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center">No user data available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
