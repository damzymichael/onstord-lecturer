import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import {NextRequest} from 'next/server';
import {RequestBody} from '@/types/onstord';

export const POST = async (request: NextRequest) => {
  try {
    const requestUser: RequestBody = await request.json();
    const hashedPassword = await bcrypt.hash(
      requestUser.password as string,
      10
    );
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
      status: 200
    });
  } catch (error: any) {
    return new Response(JSON.stringify('Could not update data'), {status: 500});
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const password = await bcrypt.hash('oluwafred', 10);
    await prisma.lecturer.update({
      where: {id: '6569fb9d37b2bdbb5731facd'},
      data: {password}
    });
    return new Response(JSON.stringify('Password update successful'), {
      status: 200
    });
  } catch (error: any) {
    return new Response(JSON.stringify('Could not update data'), {status: 500});
  }
};
