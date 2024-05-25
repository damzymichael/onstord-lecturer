import {allUni} from './data';
import {FormDetails} from '@/types/onstord';
import {AxiosResponse} from 'axios';
import axios from 'axios';
import useToast from '@/hooks/useToast';

export const filterText = (array: string[], text: string) => {
  return array.filter(item =>
    item.toLowerCase().includes(text.trim().toLowerCase())
  );
};

export const filterTextRegX = (searchText: string, data: string[] = allUni) => {
  const regex = new RegExp(searchText, 'i');
  return data.sort().filter(item => regex.test(item));
};

// export const filterUniversities = filterText.bind(null, allUni);

export const getPdfPages = async (url: string): Promise<number | null> => {
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.blob();
  const reader = new FileReader();
  //Todo Add a promise here to listen for completed event
  reader.readAsBinaryString(data);
  const numPages: number = await new Promise(resolve => {
    reader.onloadend = function () {
      var result = reader.result as string;
      resolve(result?.match(/\/Type[\s]*\/Page[^s]/g)?.length as number);
    };
  });

  return numPages;
};

//Typing response from server
let registerUser: (deets: FormDetails) => Promise<AxiosResponse<string, any>>;
registerUser = async deets => {
  const response = await axios.post('/api/register', deets);
  return response;
};

export const checkIsNan = (letter: string) => isNaN(Number(letter));

export function useFormatCourse() {
  const {toggleToast} = useToast();

  const formatCourseCode = (code: string) => {
    if (code.trim().split('').slice(-3).some(checkIsNan)) {
      toggleToast(1200, 'warning', 'Invalid course code');
      return null;
    }
    return code
      .replace(/[^0-9](?=[0-9])/g, '$& ')
      .replace(/\s+/g, ' ')
      .trim()
      .toUpperCase();
  };

  return formatCourseCode;
}

//insert a string in another string at a particular index
export function insert(str: string, index: number, value: string | number) {
  return str.substring(0, index) + value + str.substring(index);
}
