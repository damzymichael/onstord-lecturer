import {Lecturer} from '@prisma/client';
import {type} from 'os';
import {IconType} from 'react-icons/lib';

export interface LINK {
  path: string;
  text: string;
  icon?: IconType;
}

export interface RequestBody extends Lecturer {
  id?: string;
  image?: string;
  emailVerified?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FormDetails extends RequestBody {
  name?: string;
  firstName: string;
  lastName: string;
  title: string;
  institutions: string;
  confirmPassword: string;
}

export interface Book {
  categories: Array<string>;
  description: string;
  format: string;
  sale: boolean;
  pages?: number;
  size: number;
  title: string;
  url: string;
  _id: string;
  userId: string;
}

namespace Onstord {
  type Icon = IconType;
}

export default Onstord;
