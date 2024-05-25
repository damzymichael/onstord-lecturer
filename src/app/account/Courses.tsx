'use client';
import {useState, useEffect} from 'react';
import {FaAngleDown, FaAngleUp} from 'react-icons/fa';
import {IoMdClose} from 'react-icons/io';
import {LoadingIcon} from '@/components/Loading';
import {Lecturer} from '@prisma/client';
import {useCourses, useProfileQuery} from '@/hooks/useRequests';
import {MotionContainer} from '@/components/Motion';

const Courses = ({user}: {user: Lecturer}) => {
  const {data: queryData} = useProfileQuery(user);

  const {data: courses, isLoading, isError} = useCourses(user.id);

  const cache = queryData?.institutions?.values.map((data, i) => {
    return {text: data, display: i === 0 ? true : false};
  });

  const [data, setData] = useState(cache);

  useEffect(() => {
    setData(cache);
  }, [queryData, cache]);

  const handleClick = (institution: {text: string; display: boolean}) => {
    setData(
      data?.map(ins => {
        if (ins.text === institution.text) ins.display = !ins.display;
        else ins.display = false;
        return ins;
      })
    );
  };
  return (
    <MotionContainer>
      {data?.map((ins, i) => (
        <div className='mb-4' key={i}>
          <h2>
            <button
              onClick={() => handleClick(ins)}
              className={`flex items-center justify-between w-full p-3 font-medium text-gray-500 border ${
                ins.display ? 'rounded-b-none' : ''
              } border-gray-200 rounded-xl hover:bg-gray-100 gap-3`}
            >
              <span className='truncate'>{ins.text}</span>
              {ins.display ? <FaAngleUp /> : <FaAngleDown />}
            </button>
          </h2>
          <div
            className={`${
              ins.display ? '' : 'hidden'
            } p-5 border rounded-b-xl border-t-0 border-gray-200 flex items-center flex-wrap justify-start gap-2 shadow-md`}
          >
            {isLoading && <LoadingIcon size={40} className='mx-auto' />}

            {isError && <p>Error Loading courses</p>}

            {courses &&
              (!courses.length ||
                !courses?.filter(course => course.institution === ins.text)
                  .length) && <p>No courses available</p>}

            {courses &&
              courses?.length > 0 &&
              courses
                .filter(course => course.institution === ins.text)
                .map((course, i) => (
                  <span
                    className='bg-red-300 text-white rounded px-2 py-1 text-sm font-bold inline-flex items-center gap-3'
                    key={i}
                  >
                    <p>{course.code}</p>
                    <button className='hover:cursor-pointer'>
                      <IoMdClose />
                    </button>
                  </span>
                ))}
          </div>
        </div>
      ))}
    </MotionContainer>
  );
};

export default Courses;
