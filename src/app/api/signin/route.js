import { NextResponse } from "next/server";
export async function POST(request) {
  const { email, password } = await request.json();
  if (email !== "gauravteli134@gmail.com" || password !== "gaurav134") {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 201 }
    );
  }
  return NextResponse.json({
    username: "Gaurav Teli",
    email: "gauravteli134@gmail.com"
  });
}
