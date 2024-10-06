import React from 'react'
import Heading from '../Heading'
import TitleQuestion from '../TitleQuestion'
import Button from '@/components/Button'
import Card from '../Card'
import { IChild } from '@/app/AddChildren/page'

interface IStep3 {
    setStep: React.Dispatch<React.SetStateAction<number>>
    step: number
    children: IChild[]
}

const Step3: React.FC<IStep3> = ({ setStep, step, children }) => {

    const onClickHandlerNext = () => {
        setStep(step + 1)
    }

    return (
        <main className="h-screen flex flex-col">
            <Heading />
            <div className='flex flex-col px-4 py-4 grow'>
                <TitleQuestion
                    title="Let's set up your Piggy Wallet"
                    question="Please confirm your children’s information" />
                <div className='space-y-2'>
                    {children.map((child, index) => (
                        <Card
                            key={index}
                            index={index}
                            child={child}
                        />
                    ))}
                </div>
                <div className='items-end grow flex'>
                    <div className='flex flex-col gap-y-4 items-center justify-center w-full py-4'>
                        <Button
                            onClick={onClickHandlerNext}>Confirm</Button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Step3