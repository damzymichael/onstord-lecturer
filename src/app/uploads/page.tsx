import {getUser} from '@/app/action';
import {redirect} from 'next/navigation';
import Upload from './Upload';

export default async function Page() {
  const user = await getUser();
  if (!user.institutions?.values || !user.phoneNumber)
    redirect('/account-complete');
  return <Upload institutions={user.institutions.values} id={user.id} />;
}
