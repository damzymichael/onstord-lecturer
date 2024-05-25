import {getServerSession} from 'next-auth';
import {authConfig} from '@/lib/auth';
import {IoDiamond} from 'react-icons/io5';
import HomeButton from '@/app/HomePageButton';
import TopBooks from '@/app/TopBooks';

export default async function Page() {
  const user = await getServerSession(authConfig);
  return (
    <div>
      <section className='min-h-screen bg-landing text-white flex items-center justify-center '>
        <div className='h-full w-[90%] sm:w-[70%]'>
          <h4 className='mt-16 sm:mt-20 text-3xl sm:text-5xl font-mono font-bold text-center'>
            We Make Education Faster And Easier <br />
            For Teachers And Students
          </h4>
          <p className='text-center text-base sm:text-lg font-normal mt-6'>
            Welcome to Onstord!
            <br />
            A platform designed specifically for lecturers to share
            educational resources with students. With Onstord, you have the
            opportunity to create, upload, and manage a wide range of academic
            materials, including lecture notes, video tutorials, assignments,
            and more.
            <br />
            Our goal is to provide you with an intuitive and efficient space to
            distribute your knowledge and support student learning.
          </p>
          <HomeButton user={user} />
        </div>
      </section>
      <section className='bg-gray-300 min-h-screen px-6 pt-4'>
        <h1 className='flex gap-2 items-center text-lg font-semibold mb-4'>
          <IoDiamond /> <span>Top Books of the week</span>
        </h1>
        <TopBooks />
        <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4 content-start'>
          {/* Categories  */}
        </div>
      </section>
    </div>
  );
}
