import {useState} from 'react';
import {useSession} from 'next-auth/react';
import {useAddCourse} from '@/hooks/useRequests';
import {LoadingButton} from '@/components/Loading';
import useToast from '@/hooks/useToast';

interface AddCourseProps {
  onClose?: () => void;
  info: {course: string; institution: string};
}

const AddCourse = ({onClose, info}: AddCourseProps) => {
  const {data} = useSession();
  const {mutate, isPending} = useAddCourse(data?.user.id as string, onClose);
  const {toggleToast} = useToast();
  const [title, setTitle] = useState('');
  const {course, institution} = info;
  const SubmitCourse = () => {
    if (!title.trim()) return toggleToast(2000, 'warning', 'No input');
    mutate({code: course, title, institution});
  };
  return (
    <div
      onClick={onClose}
      className='w-full z-30 min-h-screen top-0 cursor-pointer left-0 fixed bg-[#00000080]'
    >
      <div
        onClick={e => e.stopPropagation()}
        className='max-w-[350px] sm:max-w-[500px] w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-default bg-white p-4 rounded-lg'
      >
        <p className='text-center text-gray-500'>
          {course} is not on the course list for {institution}. Enter course
          title and add or close this window to change choice
        </p>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Course Title'
          disabled={isPending}
          className='border rounded outline-blue-300 border-gray-300 py-2 px-4 w-full bg'
        />
        <div className='mt-3 flex justify-center gap-2'>
          <LoadingButton
            disabled={isPending}
            isPending={isPending}
            text='Add course'
            fullWidth={false}
            onClick={SubmitCourse}
          />
          <button
            className='bg-red-600 px-3 py-2 rounded-lg text-sm text-white'
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
