import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    return NextResponse.json({
      message: "User has been created successfully.",
      success: true,
      savedUser,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
