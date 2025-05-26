'use client';
import {ChangeEvent, FormEvent, useEffect} from 'react';
import {useState, Fragment} from 'react';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {FormDetails} from '@/types/onstord';
import {initFormDetails, allUni} from '@/lib/data';
import {useRegister} from '@/hooks/useRequests';
import {RequestBody} from '@/types/onstord';
import useToast from '@/hooks/useToast';
import {Input, PasswordInput, SearchInputv2} from '@/components/Inputs';
import {SelectInput} from '@/components/Inputs';
import {Loading} from '@/components/Loading';

const passwordTest =
  /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

const RegisterForm = () => {
  const {toggleToast} = useToast();
  const [formDetails, setFormDetails] = useState<FormDetails>(initFormDetails);
  const [error, setError] = useState(false);
  const [institution, setInstitution] = useState('');

  //?handle form changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === 'institutions') {
      setFormDetails({...formDetails, institutions: institution});
    } else {
      setFormDetails({...formDetails, [e.target.name]: e.target.value});
    }
  };

  //?Validate password match onChange
  const validatePassword = () => {
    const {password, confirmPassword} = formDetails;
    return password && confirmPassword && password !== confirmPassword
      ? setError(true)
      : setError(false);
  };
  const {isPending, mutate} = useRegister();

  //?Submit form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {phoneNumber} = formDetails;
    if (phoneNumber && (isNaN(Number(phoneNumber)) || phoneNumber.length < 11))
      return toggleToast(2000, 'warning', 'Invalid number');

    //?If Universiy matches one in list
    const universityMatch = allUni.some(
      institution => institution === institution
    );
    if (!universityMatch)
      return toggleToast(2000, 'warning', 'Invalid Institution');

    console.log(formDetails)
    //?Check for non matching pasword
    if (error) return toggleToast(2000, 'warning', 'Passwords do not match');
    //?Check for password length
    if (!formDetails.confirmPassword.match(passwordTest))
      return toggleToast(2000, 'warning', 'Password too short');

    //?Re-structure data
    const {title, firstName, lastName} = formDetails;
    const newUser: RequestBody = {
      name: `${title} ${firstName.trim()} ${lastName.trim()}`,
      email: formDetails.email,
      phoneNumber,
      institutions: {values: [institution]},
      password: formDetails.confirmPassword
    };
    mutate(newUser);
  };

  return (
    <form
      className='grid grid-cols-1 gap-6 my-4 md:grid-cols-2'
      onSubmit={handleSubmit}
      autoComplete='off'
    >
      <Input
        name='firstName'
        placeholder='John'
        label='First Name'
        handleChange={handleChange}
        disabled={isPending}
      />

      <Input
        label='Last Name'
        name='lastName'
        placeholder='Snow'
        handleChange={handleChange}
        disabled={isPending}
      />

      <SelectInput
        label='Title'
        name='title'
        handleChange={handleChange}
        disabled={isPending}
        options={['Mr', 'Mrs', 'Dr', 'Prof']}
      />

      <Input
        label='Email Address'
        name='email'
        type='email'
        placeholder='johnsnow@example.com'
        handleChange={handleChange}
        disabled={isPending}
      />

      <Input
        label='Phone Number'
        name='phoneNumber'
        placeholder='XXX-XX-XXXX-XXX'
        handleChange={handleChange}
        disabled={isPending}
      />

      <SearchInputv2
        name='institutions'
        label='Current Institution'
        placeholder='Federal University of Technology'
        handleChange={handleChange}
        filterData={allUni}
        disabled={isPending}
        setValue={setInstitution}
        required
      />

      <PasswordInput
        label='Password'
        name='password'
        handleChange={handleChange}
        validatePassword={validatePassword}
        disabled={isPending}
      />

      <PasswordInput
        label='Confirm Password'
        name='confirmPassword'
        handleChange={handleChange}
        validatePassword={validatePassword}
        disabled={isPending}
      />

      <div className='self-end'>
        {error && (
          <div className='text-orange-700 text-sm'>Passwords do not match</div>
        )}

        <button
          disabled={isPending}
          className='flex items-center  mt-2 uppercase justify-between w-full px-6 py-3 text-sm tracking-wide text-white transition-colors duration-300 transform bg-[#404EED] rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
        >
          {isPending ? (
            <Loading />
          ) : (
            <Fragment>
              <span>Sign Up </span>
              <MdKeyboardArrowRight size={15} />
            </Fragment>
          )}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
