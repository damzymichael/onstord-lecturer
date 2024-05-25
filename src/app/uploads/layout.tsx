import Sidebar from './Sidebar';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Uploads',
  description: 'Upload your files and manage your uploaded files'
};

export default function UploadLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='py-20 flex flex-col lg:flex-row'>
      <Sidebar />
      <div className='flex-grow'>{children}</div>
    </div>
  );
}
