"use client"

import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import Image from 'next/image'
import { ConnectedWallet, usePrivy, useWallets } from '@privy-io/react-auth'
import piggy from '../../../public/piggy.svg'
import FredokaTitle from '../Atoms/FredokaTitle'
import { useRouter } from 'next/navigation'


const Login = () => {
  const { login, authenticated, ready, user } = usePrivy();
  const router = useRouter();
  const { wallets } = useWallets();
  const [signUp, setSignUp] = useState(false);

  const onClickHandlerSignUp = () => {
    login();
  }

  const onClickHandlerLogin = () => {
    login();
  }

  const savePrivyAndWalletToDatabase = async (privyAddress: string, walletAddress: string) => {
    try {
      const response = await fetch('/api/users/save-user-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ privyAddress, email: null, walletAddress }),
      });
  
      const data = await response.json();
    } catch (error) {
      console.error('Error en la solicitud al guardar usuario:', error);
    }
  };

  const getUserDataByEmail = async (email: string) => {
    try {
      const response = await fetch(`/api/users/get-by-email?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Usuario encontrado correctamente');
      } else {
        console.error('Error al buscar usuario:', data.message);
      }
  
      return data.user;
  
    } catch (error) {
      console.error('Error en la solicitud al buscar usuario:', error);
    }
  };

  const getUserDataByAddress = async (address: string) => {
    try {
      const response = await fetch(`/api/users/get-by-address?address=${address}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Usuario encontrado correctamente');
      } else {
        console.error('Error al buscar usuario:', data.message);
      }
  
      return data.user;
  
    } catch (error) {
      console.error('Error en la solicitud al buscar usuario:', error);
    }
  };

  const savePrivyAndEmailToDatabase = async (privyAddress: string, email: string) => {
    try {
      const response = await fetch('/api/users/save-user-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ privyAddress, email, walletAddress: null }),
      });
  
      const data = await response.json();
    } catch (error) {
      console.error('Error en la solicitud al guardar usuario:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (authenticated && ready) {
        console.log("wallets", wallets);
        console.log("user", user);
  
        if (user) {
          let userMail = user?.email?.address || '';
          if (userMail !== "") {
            const userData = await getUserDataByEmail(userMail);
            if (userData) {
              router.push('/Dashboard');
            } else {
              let userAddress = user?.wallet?.address || '';
              await savePrivyAndEmailToDatabase(userAddress, userMail);
              router.push('/AddChildren');
            }
          } else if (wallets && wallets.length > 0) {
            let userAddress = user?.wallet?.address || '';
            if (userAddress !== "") {
              const userData = await getUserDataByAddress(userAddress);
              if (userData) {
                router.push('/Dashboard');
              } else {
                await savePrivyAndWalletToDatabase(userAddress, wallets[0].address);
                router.push('/AddChildren');
              }
            }
          }
        }
      }
    };
  
    fetchData();
  }, [authenticated, ready]);

  return (
    <main className="h-screen flex flex-col">
      <div className="h-[400px] bg-brand flex justify-center items-end">
        <div className='relative justify-center -bottom-16 w-full'>
          <Image className='mx-auto' src={piggy} alt="Piggy Wallet Logo" width={250} height={250} />
        </div>
      </div>
      <div className='flex flex-col px-4 py-4 grow'>
        <div className='flex flex-col gap-2 mt-20'>
          <FredokaTitle className=" font-semibold text-[52px] text-center">Welcome to Piggy Wallet</FredokaTitle>
          <p className='text-center'>Empowering kids in high-inflation economies with secure crypto savings accounts.</p>
        </div>
        <div className='items-end grow flex'>
          <div className='flex flex-col gap-y-4 items-center  justify-center w-full py-4'>
            <Button onClick={onClickHandlerSignUp}>Sign up</Button>
            <p className='text-center'>Already have an account? <em onClick={onClickHandlerLogin} className='not-italic font-semibold text-brand cursor-pointer'>Log In</em></p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login