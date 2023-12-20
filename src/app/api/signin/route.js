import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function POST(request) {
  const { email, password } = await request.json();
  if (email !== "gauravteli134@gmail.com" || password !== "gaurav") {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 201 }
    );
  }
  
  var token = jwt.sign(
    { email: email },
    process.env.JWT_TOKEN
  );
  console.log(process.env.JWT_TOKEN);
  const response = NextResponse.json({
    username: "Gaurav Teli",
  });
  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set({
    name: "authToken",
    value: token,
    httpOnly: true,
    expires: Date.now() + oneDay,
  });
  return response;
}
