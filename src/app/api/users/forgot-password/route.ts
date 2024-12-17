import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User with this email does not exist" },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = await bcryptjs.hash(user._id.toString(), 10);

    // Save the reset token and its expiry in the user's record
    user.forgotPasswordToken = resetToken;
    user.forgotPasswordTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes expiry
    await user.save();

    // Send reset email
    await sendEmail({
      email: user.email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json({
      message: "Password reset link has been sent to your email.",
      success: true,
    });
  } catch (error: any) {
    console.error("Forgot Password Error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
