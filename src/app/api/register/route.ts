import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import {NextRequest} from 'next/server';
import {RequestBody} from '@/types/onstord';

export const POST = async (request: NextRequest) => {
  try {
    const requestUser: RequestBody = await request.json();
    const hashedPassword = await bcrypt.hash(requestUser.password as string, 10);
    await prisma.lecturer.create({
      data: {...requestUser, password: hashedPassword}
    });
    return new Response(JSON.stringify('Sign up successful'), {status: 201});
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify('Signup unsuccessful☹'), {status: 500});
  }
};

export const PATCH = async (request: NextRequest) => {
  try {
    const {name, phoneNumber, institutions} = await request.json();
    const id = request.nextUrl.searchParams.get('id') as string;
    await prisma.lecturer.update({
      where: {id},
      data: {name, phoneNumber, institutions}
    });
    return new Response(JSON.stringify('Profile update successful'), {
      status: 202
    });
  } catch (error: any) {
    return new Response(JSON.stringify('Could not update data'), {status: 500});
  }
};
