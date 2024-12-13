"use client";

import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  // Get user details
  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    console.log("Data:", response.data);
    setData(response.data.data._id);
  };
  return (
    <>
      <Head>
        <title>Profile Page</title>
      </Head>
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen bg-gray-100">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={logout}
        >
          Logout
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={getUserDetails}
        >
          get user Id
        </button>
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            General Profile Page
          </h2>
        </div>
        <h2 className="p-4 bg-green-800 text-2xl rounded font-bold mb-6 text-center text-white">
          {data === "" ? (
            "Id not Found"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>
      </div>
    </>
  );
}
