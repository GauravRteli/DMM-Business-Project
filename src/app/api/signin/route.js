import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'
export async function POST(request) {
  const { email, password } = await request.json();
  if (email !== "gauravteli134@gmail.com" || password !== "gaurav134") {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 201 }
    );
  }

  var token = jwt.sign({email: email}, 'aapbohotachehoaapsejyadacaringmerikoinahikarsakta');

  const response = NextResponse.json({
    username: "Gaurav Teli"
  });

  response.cookies.set({
		name: 'authToken',
		value: token,
		httpOnly: true
	})
  return response;
}
