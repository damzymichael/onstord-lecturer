'use client';
import React, {ChangeEvent, useReducer, forwardRef, useState} from 'react';
import {MdVisibility, MdVisibilityOff} from 'react-icons/md';
import {filterText} from '@/lib/utils';

//? => BASE INPUT AND PROPS
export interface InputProps<T = HTMLInputElement> {
  name: string;
  disabled: boolean;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  handleChange?: (e: ChangeEvent<T>) => void;
}

export const Input = (props: InputProps) => {
  const {placeholder, disabled, handleChange} = props;
  return (
    <div>
      <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
        {props.label}
      </label>
      <input
        name={props.name}
        type={props.type ?? 'text'}
        placeholder={placeholder}
        required
        disabled={disabled}
        defaultValue={props.defaultValue}
        className='block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
        onChange={handleChange}
      />
    </div>
  );
};

//? => PASSWORD INPUT
interface PasswordInputProps extends InputProps {
  name: 'password' | 'confirmPassword';
  validatePassword: () => void;
}

export function PasswordInput({
  handleChange,
  name,
  disabled,
  label,
  validatePassword
}: PasswordInputProps) {
  const [showPassword, toggleShowPassword] = useReducer(state => !state, false);
  return (
    <div>
      <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
        {label}
      </label>
      <div className='relative'>
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          onChange={handleChange}
          onKeyUp={validatePassword}
          disabled={disabled}
          required
          placeholder='Enter your Password'
          className='block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
        />
        <div
          className='absolute right-3 inset-y-0 flex items-center cursor-pointer'
          onClick={toggleShowPassword}
        >
          {showPassword ? (
            <MdVisibilityOff color='#404EED' />
          ) : (
            <MdVisibility color='#404EED' />
          )}
        </div>
      </div>
    </div>
  );
}

//? => SELECT INPUT
interface SelectInputProps extends InputProps<HTMLSelectElement> {
  options: Array<string>;
}

export const SelectInput: React.FC<SelectInputProps> = props => {
  const {handleChange, disabled} = props;
  const [defaultValue, ...otherValues] = props.options;
  return (
    <div>
      <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
        {props.label}
      </label>
      <select
        name={props.name}
        onChange={handleChange}
        disabled={disabled}
        className='block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
      >
        <option defaultValue={defaultValue}>{defaultValue}</option>
        {otherValues.map((value, i) => (
          <option value={value} key={i}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

//? => AUTOCOMPLETE SEARCH RESULT
export interface SearchResult<T> {
  searchResults?: Array<T>;
  onSelect: (data: T) => void;
  data?: T;
}

export const SearchResult = ({data, onSelect}: SearchResult<string>) => {
  return (
    <li
      className='block px-4 py-2 cursor-pointer hover:bg-slate-400'
      onClick={() => onSelect(data as string)}
    >
      {data}
    </li>
  );
};

//? => AUTOCOMPLETE SEARCH INPUT
interface SearchInputProps extends InputProps, SearchResult<string> {}

//* Ref would be created in parent component and passed to the component
// export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
//   (props, ref) => {
//     const {placeholder, handleChange, searchResults, onSelect} = props;
//     return (
//       <React.Fragment>
//         <div>
//           <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
//             {props.label}
//           </label>
//           <input
//             name={props.name}
//             placeholder={placeholder}
//             required
//             disabled={props.disabled}
//             ref={ref}
//             className='block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
//             onChange={handleChange}
//           />
//         </div>
//         {searchResults && searchResults.length > 0 && (
//           <ul className='py-2 text-sm bg-gray-200 z-20 text-gray-700 absolute border left-0 w-full rounded max-h-48 overflow-auto uni-drop'>
//             {searchResults.map((data, i) => (
//               <SearchResult
//                 data={data}
//                 onSelect={() => onSelect(data)}
//                 key={i}
//               />
//             ))}
//           </ul>
//         )}
//       </React.Fragment>
//     );
//   }
// );

//? => AUTOCOMPLETE SEARCH INPUT V2
interface SearchInputv2Props extends InputProps {
  filterData: string[];
  required?: boolean;
  setValue?: (value: string) => void;
}

export const SearchInputv2 = ({
  filterData,
  name,
  label,
  placeholder,
  required,
  disabled,
  setValue
}: SearchInputv2Props) => {
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    searchTimeout && clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterText(filterData, e.target.value);
        setSearchResult(searchResult);
      }, 600)
    );
  };

  React.useEffect(() => {
    function resetSearch() {
      setSearchResult([]);
      document.removeEventListener('click', resetSearch);
    }

    if (searchResult.length) {
      document.addEventListener('click', resetSearch);
    }
  }, [searchResult]);

  return (
    <div className='relative mb-4' onClick={e => e.stopPropagation()}>
      <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
        {label}
      </label>
      <input
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        ref={searchInputRef}
        className='block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
        onChange={handleChange}
      />
      {searchResult.length > 0 && (
        <ul className='py-2 text-sm bg-gray-200 z-20 text-gray-700 absolute border left-0 w-full rounded max-h-48 overflow-auto uni-drop'>
          {searchResult.map((data, i) => (
            <li
              key={i}
              className='block px-4 py-2 cursor-pointer hover:bg-slate-400'
              onClick={() => {
                if (searchInputRef.current) searchInputRef.current.value = data;
                if (setValue) setValue(data);
                setSearchResult([]);
              }}
            >
              {data}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
