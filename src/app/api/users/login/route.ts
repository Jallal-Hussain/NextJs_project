import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // check if password is correct
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User logged in successfully.",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
