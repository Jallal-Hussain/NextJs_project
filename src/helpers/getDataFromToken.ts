import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY!);
    return decoded.id;
  } catch (error: any) {
    throw new Error("Error while getting data from token", error.message);
  }
};
