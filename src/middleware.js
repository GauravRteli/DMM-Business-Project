import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const jose = require("jose");
// import { Jwt } from "jsonwebtoken";
// This function can be marked `async` if using `await` inside

async function verifyToken(token, secretKey) {
  try {
    // Decode and verify the JWT token
    const decodedToken = jwt.decode(token, secretKey);
    if(decodedToken.email === 'gauravteli134@gmail.com') return true;
    return false;
  } catch (error) {
    // Token verification failed
    console.error("Token verification failed:", error);
    throw error; // Optionally rethrow the error for higher-level error handling
  }
}

export async function middleware(request) {
  const nextpath = request.nextUrl.pathname;
  console.log(nextpath);
  const isPublicPath =
    nextpath === "/aboutus" || nextpath === "/home" || nextpath === "/";
  const authToken = cookies().get("authToken")?.value || "";
  console.log(authToken, request.url);
  if (!isPublicPath && !authToken) {
    return NextResponse.redirect(new URL("/signin", request.url));
  } else if (!isPublicPath && authToken) {
    try {
      const isAuthenticated = await verifyToken(authToken, process.env.JWT_TOKEN);
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/signin"), request.url);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/addstokes",
    "/additems",
    "/addreceipt",
    "/showitems",
    "/showreceipts",
    "/api/items"
  ],
};
