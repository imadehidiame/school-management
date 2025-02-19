import { getToken } from "next-auth/jwt";
import { prisma } from "@/prisma";

export async function GET(req: Request) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  console.log('Token from api request ',token);

  if (!token) {
    return new Response(JSON.stringify({ data: 'Access denied' }), { status: 403 });
  }

  const user = await prisma.user.findFirst({
    where: {
      email: token.email,
    },
  });

  if (!user) {
    return new Response(JSON.stringify({ data: 'User not found' }), { status: 404 });
  }

  return new Response(JSON.stringify({ user }), { status: 200 });
}