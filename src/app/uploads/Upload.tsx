'use client';
import React, {FormEvent, useState, ChangeEvent} from 'react';
import {IoIosArrowDown} from 'react-icons/io';
import {LoadingButton} from '@/components/Loading';
import {SearchInputv2} from '@/components/Inputs';
import {useUploadMaterial, useCourses} from '@/hooks/useRequests';
import AddCourse from './AddCourse';
import {categories} from '@/lib/data';
import {useFormatCourse} from '@/lib/utils';
interface UploadProps {
  institutions: string[];
  id: string;
}
export default function Upload({id, institutions}: UploadProps) {
  const {data: courses} = useCourses(id);
  const formRef = React.useRef<HTMLFormElement>(null);
  const {mutate, isPending} = useUploadMaterial(id);
  const formatCourse = useFormatCourse();
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [height, setButtonHeight] = useState<number>(0);
  const [searchData, setSearchData] = useState<string[]>([]);
  const [institution, setInstitution] = useState('');
  const [materialType, setMaterialType] = useState<string>('');
  const [info, setInfo] = useState({course: '', institution: ''});
  const [openModal, toggleModal] = React.useReducer(state => !state, false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleInstChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const courseSearchData = courses
      ?.filter(course => course.institution === e.target.value)
      .map(course => course.code);
    setSearchData(courseSearchData as string[]);
    setInstitution(e.target.value);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('fileType', materialType);
    let course = formatCourse(formData.get('course') as string);
    if (!course) return;
    if (!searchData.includes(course)) {
      setInfo({
        course,
        institution: formData.get('institution') as string
      });
      toggleModal();
      return;
    }
    const course_ =  courses && courses.find(__ => __.code === course);
   
    formData.append('courseId', course_?._id as string);
    mutate(formData, {onSuccess: () => formRef.current?.reset()});
  };

  React.useEffect(() => {
    function closeDropdown() {
      if (dropdown) setDropdown(false);
      document.removeEventListener('click', closeDropdown);
    }
    if (dropdown) {
      document.addEventListener('click', closeDropdown);
    }
    setButtonHeight(buttonRef.current?.offsetHeight as number);

    const courseSearchData = courses
      ?.filter(course => course.institution === institution)
      .map(course => course.code);
    setSearchData(courseSearchData as string[]);
  }, [courses, dropdown, openModal, institution]);

  return (
    <div className='bg-white p-3 mx-auto'>
      <h1 className='text-2xl font-semibold mb-2'>Add New Material</h1>
      {openModal && <AddCourse info={info} onClose={toggleModal} />}

      {/* DROPDOWN START  */}
      <div className='relative'>
        <button
          ref={buttonRef}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex gap-2 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3'
          onClick={() => setDropdown(!dropdown)}
        >
          <span>{!materialType ? 'Choose material type' : materialType}</span>
          <IoIosArrowDown />
        </button>
        {dropdown && (
          <div
            className={`z-10 absolute top-[${height}px] divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700`}
          >
            <ul className='py-2 text-sm text-gray-700 dark:text-gray-200'>
              {['Book', 'Audio', 'Draft', 'Video'].map((type, i) => {
                return type !== 'Draft' ? (
                  <li
                    className='block px-4 py-2 cursor-pointer'
                    key={i}
                    onClick={() => {
                      setMaterialType(type);
                      setDropdown(!dropdown);
                    }}
                  >
                    {type}
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        )}
      </div>
      {/* DROPDOWN END  */}

      <form onSubmit={handleSubmit} autoComplete='off' ref={formRef}>
        <div className='mb-4'>
          <label className='mb-1 text-base font-semibold text-gray-500'>
            {materialType} Title
          </label>
          <br />
          <input
            className='border rounded outline-blue-300 border-gray-300 py-2 px-4 w-full'
            name='title'
            placeholder='Importance of Education'
            disabled={!materialType}
            required
          />
        </div>

        <div className='mb-4'>
          <label className='mb-1 text-base font-semibold text-gray-500'>
            Select {materialType} file
          </label>
          <br />
          <input
            type='file'
            name='onstord-file'
            disabled={!materialType}
            className='border rounded outline-blue-300 border-gray-300 py-2 px-4 w-full'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='text-base font-semibold text-gray-600'>
            Institution
          </label>
          <br />
          <select
            name='institution'
            className='border rounded outline-blue-300 border-gray-300 py-2 px-4 w-full'
            disabled={!materialType}
            required
            defaultValue=''
            onChange={handleInstChange}
          >
            <option value='' hidden>
              Select institution
            </option>
            {institutions.map((institution, i) => (
              <option key={i}>{institution}</option>
            ))}
          </select>
        </div>

        <SearchInputv2
          label='Course'
          name='course'
          placeholder={courses ? courses[0]?.code : 'CSS 001'}
          filterData={searchData}
          required
          disabled={!materialType}
        />

        <div className='mb-4'>
          <div className='flex items-center justify-between'>
            <label className='mb-1 text-base font-semibold text-gray-500 inline-block'>
              {materialType} Description
            </label>
            <br />
          </div>
          <textarea
            name='description'
            className='border rounded outline-blue-300 border-gray-300 h-32 py-2 px-4 w-full'
            placeholder='Enter your detailed text description here...'
            disabled={!materialType}
          />
        </div>

        <div className='mb-4'>
          <label className='text-base font-semibold text-gray-600'>
            {materialType} Category
          </label>
          <br />
          <select
            name='category'
            className='border rounded outline-blue-300 border-gray-300 py-2 px-4 w-full'
            disabled={!materialType}
            required
          >
            {categories.map((category, i) => (
              <option key={i}>{category}</option>
            ))}
          </select>
        </div>
        <LoadingButton
          isPending={isPending}
          disabled={isPending || !materialType}
          fullWidth={false}
        />
      </form>
    </div>
  );
}
