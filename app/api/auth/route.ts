import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (
    (username === 'admin' && password === '1234') ||
    (username === 'user' && password === '5678')
  ) {
    const role = username === 'admin' ? 'Administrator' : 'User';
    return NextResponse.json({ token: 'fake-jwt-token', role });
  } else {
    return NextResponse.json(
      { message: 'Invalid username or password' },
      { status: 401 }
    );
  }
}
