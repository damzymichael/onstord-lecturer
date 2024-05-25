'use client';
import React, {useReducer, FormEvent} from 'react';
import {useProfileQuery} from '@/hooks/useRequests';
import {SelectInput, Input, SearchInputv2} from '@/components/Inputs';
import {LoadingButton} from '@/components/Loading';
import {useAddInstitution, useAddCourse} from '@/hooks/useRequests';
import {Lecturer} from '@prisma/client';
import {allUni} from '@/lib/data';
import {useFormatCourse} from '@/lib/utils';

interface AddDataProps {
  toggleDisplay: React.DispatchWithoutAction;
  user: Lecturer;
}

const AddInstitution = ({user, toggleDisplay}: AddDataProps) => {
  const {mutate, isPending} = useAddInstitution(user.id, toggleDisplay);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(new FormData(e.currentTarget).get('institution'));
  };
  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <h1 className='font-semibold text-lg text-gray-600'>
        Add new Institution
      </h1>
      <SearchInputv2
        name='institution'
        label=''
        placeholder='Federal University of Technology'
        filterData={allUni}
        required
        disabled={isPending}
      />
      <LoadingButton text='Add' isPending={isPending} fullWidth={false} />
    </form>
  );
};

const AddCourse = ({toggleDisplay, user}: AddDataProps) => {
  const {mutate, isPending} = useAddCourse(user.id, toggleDisplay);
  const {data} = useProfileQuery(user);
  const formatCourse = useFormatCourse();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let courseCode = formData.get('code') as string;
    if (!formatCourse(courseCode)) return;
    const courseDetails = {
      code: formatCourse(courseCode),
      title: formData.get('title'),
      institution: formData.get('institution')
    };

    mutate(courseDetails);
  };
  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
      <h1 className='font-semibold text-lg text-gray-600'>Add new course</h1>
      <Input
        name='code'
        placeholder='Course Code'
        label=''
        disabled={false}
        handleChange={() => {}}
      />
      <Input
        name='title'
        placeholder='Course Title'
        label=''
        disabled={false}
        handleChange={() => {}}
      />

      {data && (
        <SelectInput
          name='institution'
          disabled={false}
          handleChange={() => {}}
          options={data?.institutions?.values as string[]}
          label=''
        />
      )}
      <LoadingButton text='Add' isPending={isPending} fullWidth={false} />
    </form>
  );
};

const AddData = ({user}: {user: Lecturer}) => {
  const [institution, toggleInstitution] = useReducer(state => !state, false);
  const [course, toggleCourse] = useReducer(state => !state, false);

  function showHideInstitution() {
    if (course) toggleCourse();
    toggleInstitution();
  }
  function showHideCourse() {
    if (institution) toggleInstitution();
    toggleCourse();
  }

  return (
    <div className='w-full'>
      <button
        onClick={showHideInstitution}
        className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-3 py-1.5 text-center mb-4 mr-2'
      >
        {institution ? 'Close' : 'Add institution'}
      </button>

      <button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-3 py-1.5 text-center mb-4'
        onClick={showHideCourse}
      >
        {course ? 'Close' : 'Add course'}
      </button>

      {institution && (
        <AddInstitution user={user} toggleDisplay={toggleInstitution} />
      )}

      {course && <AddCourse toggleDisplay={toggleCourse} user={user} />}
    </div>
  );
};

export default AddData;
