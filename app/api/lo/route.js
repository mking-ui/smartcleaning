
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectDB from '@/config/db';
import User from '@/models/User';

export async function POST(req) {
  await connectDB();
  const { role, username, password } = await req.json();

  try {
    const user = await User.findOne({ username, role });
    if (!user) {
      return NextResponse.json({ message: 'Please Login' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid Password' }, { status: 401 });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
    
    );

    // ✅ Create response with cookie
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        _id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        surname: user.surname,
        status: user.status
      }
    });

    // ✅ Attach cookie to response
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // use 'none' if frontend runs on a different domain
      path: '/',
      maxAge: 24 * 60 * 60, // 1 day
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Login failed', error: error.message }, { status: 500 });
  }
}
