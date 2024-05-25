'use client';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useCompleteAccount} from '@/hooks/useRequests';
import {initFormDetails, allUni} from '@/lib/data';
import useToast from '@/hooks/useToast';
import {Input, SearchInputv2, SelectInput} from '@/components/Inputs';
import {LoadingButton} from '@/components/Loading';
import {RequestBody} from '@/types/onstord';

type User = {name: string; id: string};

type FieldsOmitted = 'password' | 'email';

interface AccountUpdate extends Omit<RequestBody, FieldsOmitted> {}

const AccountComplete = ({user}: {user: User}) => {
  const {toggleToast} = useToast();
  const [firstName, lastName] = user.name.split(' ');
  const newFormDetails = {...initFormDetails, firstName, lastName};
  const [formDetails, setFormDetails] = useState(newFormDetails);

  const {isPending, mutate} = useCompleteAccount(user.id);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormDetails({...formDetails, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {phoneNumber} = formDetails;
    if (isNaN(Number(phoneNumber)) || phoneNumber.length < 11)
      return toggleToast(2000, 'warning', 'Invalid number');

    const formData = new FormData(e.currentTarget);

    const insInputValue = formData.get('institutions') as string;

    //?If Universiy matches one in list
    const universityMatch = allUni.some(
      institution => institution === insInputValue
    );
    if (!universityMatch)
      return toggleToast(2000, 'warning', 'Invalid Institution');

    //?Re-structure data
    const {title, firstName, lastName} = formDetails;
    const userInfo: AccountUpdate = {
      name: `${title} ${firstName} ${lastName}`,
      phoneNumber,
      institutions: {values: [insInputValue]}
    };

    mutate(userInfo);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <Input
        name='firstName'
        handleChange={handleChange}
        placeholder='John'
        label='First Name'
        disabled={isPending}
        defaultValue={firstName}
      />
      <Input
        name='lastName'
        handleChange={handleChange}
        placeholder='Snow'
        label='Last Name'
        disabled={isPending}
        defaultValue={lastName}
      />
      <SelectInput
        name='title'
        label='Title'
        handleChange={handleChange}
        disabled={isPending}
        options={['Mr', 'Mrs', 'Dr', 'Prof']}
      />
      <Input
        name='phoneNumber'
        handleChange={handleChange}
        placeholder='XXX-XX-XXXX-XXX'
        label='Phone Number'
        disabled={isPending}
      />

      <SearchInputv2
        name='institutions'
        label='Institution'
        placeholder='Federal University of Technology'
        filterData={allUni}
        disabled={isPending}
      />
      <LoadingButton isPending={isPending} />
    </form>
  );
};

export default AccountComplete;
