
"use client";
import React from 'react'
import {usePrivy} from '@privy-io/react-auth'
import Login from '../Login';

interface  IAuthenticationChecker{
    children: React.ReactNode
}

const AuthenticationChecker : React.FC<IAuthenticationChecker> = ({children}) => {
  const {ready, authenticated} = usePrivy();

    if (!ready) {
        return <div className='h-screen w-screen flex justify-center items-center'>Loading...</div>;
    }
    if (!authenticated) {
        return <div><Login/></div>;
    }

  return (
    <div>{children}</div>
  )
}
export default AuthenticationChecker