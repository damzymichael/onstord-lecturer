import {getUser} from '../action';
import type {Metadata} from 'next';
import Wallet from './Wallet';

export const metadata: Metadata = {
  title: 'Wallet',
  description: 'Manage your wallet'
};

const Page = async () => {
  const user = await getUser();
  return <Wallet />;
};

export default Page;
