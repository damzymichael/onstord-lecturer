import {cache} from 'react';
import {getServerSession} from 'next-auth';
import {authConfig} from '@/lib/auth';
import {redirect} from 'next/navigation';
import prisma from '@/lib/prisma';
import {Lecturer} from '@prisma/client';

export const getUser: () => Promise<Lecturer> = cache(async () => {
  const session = await getServerSession(authConfig);
  if (!session) return redirect('/auth/login');
  const user = await prisma.lecturer.findUnique({
    where: {id: session.user.id}
  });
  if (!user) throw Error('User not found');
  return user;
});
