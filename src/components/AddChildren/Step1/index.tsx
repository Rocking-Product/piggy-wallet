import React from 'react'
import Heading from '../Heading'
import TitleQuestion from '../TitleQuestion'
import Button from '@/components/Button'
import InputWithLabel from '@/components/Atoms/InputWithLabel'
import Form from '@/components/Atoms/Form'
import { IChild } from '@/app/AddChildren/page'


interface IStep1 {
    setStep: React.Dispatch<React.SetStateAction<number>>
    amountOfChildren: number
    setAmountOfChildren: React.Dispatch<React.SetStateAction<number>>
    setChildren: React.Dispatch<React.SetStateAction<IChild[]>>
}

const Step1 : React.FC<IStep1> = ({ setStep, amountOfChildren, setAmountOfChildren, setChildren}) => {

    console.log(amountOfChildren)

    const onClickHandlerNext = () => {
        // Initialize a new array of children based on amountOfChildren
        const newChildren = Array.from({ length: amountOfChildren }, () => ({ name: '', birthDay: '', email: '' }));
        setChildren(newChildren); // Set the new array
        setStep(2); // Move to the next step
    }

 
  return (
        <main className="h-screen flex flex-col">
        <Heading/>
        <div className='flex flex-col px-4 py-4 grow'>
            <TitleQuestion
                title="Let s set up your Piggy Wallet"
                question="How many children do you have?"/>
            <Form>
                <InputWithLabel
                    label='Number of children'
                    placeholder='0'
                    type='number'
                    value = {amountOfChildren}
                    name = 'amountOfChildren'
                    onChange={(e) => setAmountOfChildren(parseInt(e.target.value))}
                />
            </Form>
            <div className='items-end grow flex'>
                <div className='flex flex-col gap-y-4 items-center justify-center w-full py-4'>
                    <Button 
                        disabled={!amountOfChildren} 
                        onClick={onClickHandlerNext}>Continue</Button>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Step1