'use client';
import {createContext, useReducer, useContext} from 'react';

export type VariantType = 'success' | 'warning' | 'error';

interface TOASTCONTEXT {
  display: boolean;
  defaults: {message: string; variants: VariantType};
  toggleToast: (time: number, severity: VariantType, message: string) => void;
}

const ToastContext = createContext<TOASTCONTEXT | null>(null);

const toastReducer = (
  state: any,
  params: {message: string; variants: VariantType}
) => params;

export const ToastContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [defaults, dispatch] = useReducer(toastReducer, {
    message: '',
    variants: 'success'
  });

  const [display, toggleDisplay] = useReducer(state => !state, false);

  const toggleToast = (
    time: number,
    severity: VariantType,
    message: string
  ) => {
    const state = {variants: severity, message};
    dispatch(state);
    toggleDisplay();
    setTimeout(toggleDisplay, time);
    setTimeout(() => dispatch({...state, message: ''}), time + 200);
  };

  return (
    <ToastContext.Provider value={{defaults, display, toggleToast}}>
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context)
    throw Error("Context should be used inside it's context provider");

  return context;
};

export default useToast;
