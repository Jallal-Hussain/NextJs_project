import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";

connect(); // Ensures connection to DB

export async function GET(request: NextRequest) {
  try {
    // Get the user ID from the token
    const userId = await getDataFromToken(request);

    // Check if the user ID was successfully extracted
    if (!userId) {
      return NextResponse.json({
        error: "Unauthorized: No user ID found in token",
        status: 401,
      });
    }

    // Fetch the user data from the database
    const user = await User.findOne({ _id: userId }).select("-password");

    // If user not found, return 404
    if (!user) {
      return NextResponse.json({
        error: "User not found",
        status: 404,
      });
    }

    // Return the user data
    return NextResponse.json({
      message: "User data fetched successfully",
      data: user,
    });
  } catch (error: any) {
    // Handle errors and log them
    console.error("Error fetching user data:", error.message);
    return NextResponse.json({
      error: error.message || "Internal Server Error",
      status: 500,
    });
  }
}
