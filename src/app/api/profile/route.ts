import {NextRequest} from 'next/server';
import prisma from '@/lib/prisma';

//!handle no id scenario
export const GET = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get('id') as string;
  try {
    const user = await prisma.lecturer.findUnique({
      where: {id}
    });
    return new Response(JSON.stringify(user), {status: 200});
  } catch (error: any) {
    return new Response(JSON.stringify('User not available'), {status: 401});
  }
};

export const PATCH = async (request: NextRequest) => {
  const {institution} = await request.json();
  const id = request.nextUrl.searchParams.get('id') as string;
  try {
    const user = await prisma.lecturer.findUnique({
      where: {id}
    });

    if (!user)
      return new Response(JSON.stringify('Could not find user'), {status: 403});

    if (
      user.institutions?.values.length &&
      user.institutions.values.includes(institution)
    ) {
      return new Response(JSON.stringify('Already exists'), {status: 400});
    }

    await prisma.lecturer.update({
      where: {id},
      data: {
        institutions: {
          values: user.institutions?.values.length
            ? [...user.institutions.values, institution]
            : [institution]
        }
      }
    });
    return new Response(JSON.stringify('Added successfully'), {status: 200});
  } catch (error: any) {
    return new Response(JSON.stringify('Unable to add'), {status: 500});
  }
};

//* ==> DELETE INSTITUTION
export const DELETE = async (request: NextRequest) => {};
