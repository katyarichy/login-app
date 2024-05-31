import { NextResponse } from 'next/server';
import { authMock } from '@/mock/authMock';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const user = authMock.users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    return NextResponse.json({ token: user.token, role: user.role });
  } else {
    return NextResponse.json(
      { message: 'Invalid username or password' },
      { status: 401 }
    );
  }
}
