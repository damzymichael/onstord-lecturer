'use client';
import {useProfileQuery} from '@/hooks/useRequests';
import {Lecturer} from '@prisma/client';
import {IoMdClose} from 'react-icons/io';
import {motion} from 'framer-motion';
import {MotionContainer, item} from '@/components/Motion';

const Institutions = ({user}: {user: Lecturer}) => {
  const {data} = useProfileQuery(user);
  return (
    <MotionContainer>
      {data?.institutions?.values.map((institution, i) => (
        <motion.span
          className='item bg-green-100 text-green-800 font-medium me-2 px-2.5 py-0.5 rounded-lg inline-flex items-center gap-2 mb-3'
          key={i}
          variants={item}
        >
          <p>{institution}</p>
          <button className='inline-flex items-center p-1 text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900'>
            <IoMdClose />
          </button>
        </motion.span>
      ))}
    </MotionContainer>
  );
};

export default Institutions;
