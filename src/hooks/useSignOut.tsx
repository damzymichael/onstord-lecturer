import {signOut} from 'next-auth/react';
import {QueryCache} from '@tanstack/react-query';

const useSignOut = () => {
  const queryCache = new QueryCache();
  const SignOut = () => {
    queryCache.clear();
    signOut({callbackUrl: '/'});
  };
  return SignOut;
};

export default useSignOut;
