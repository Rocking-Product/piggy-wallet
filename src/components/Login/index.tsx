"use client"

import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import Image from 'next/image'
import { ConnectedWallet, usePrivy, useWallets } from '@privy-io/react-auth'
import piggy from '../../../public/piggy.svg'
import FredokaTitle from '../Atoms/FredokaTitle'
import { useRouter } from 'next/navigation'


const Login = () => {
    const { login, authenticated, ready} = usePrivy();
    const router = useRouter();
    const { wallets } = useWallets();
    const [signUp , setSignUp] = useState(false);

    const onClickHandlerSignUp = () => {
        login();
    }

    const onClickHandlerLogin = () => {
        login();
    }

    useEffect (() => {
        if(authenticated && ready){
            router.push('/AddChildren')
        }
    }, [authenticated, ready])

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