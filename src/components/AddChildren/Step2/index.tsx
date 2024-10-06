import React from 'react';
import Heading from '../Heading';
import TitleQuestion from '../TitleQuestion';
import Button from '@/components/Button';
import InputWithLabel from '@/components/Atoms/InputWithLabel';
import Form from '@/components/Atoms/Form';
import { IChild } from '@/app/AddChildren/page';

interface IStep2 {
    setStep: React.Dispatch<React.SetStateAction<number>>;
    setChildren: React.Dispatch<React.SetStateAction<IChild[]>>;
    children: IChild[];
    index: number;
    step: number;
}
export const orderChild = ["First", "Second", "Third", "Fourth", "Fifth"]; 


const Step2: React.FC<IStep2> = ({ setStep, children, index, setChildren, step }) => {

    // Array of names based on index

    const onChangeSetChildren = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setChildren(children.map((child, i) => i === index ? { ...child, [name]: value } : child));
    }

    const onClickHandlerNext = () => {
        
        setStep(step + 1);
    }

    // Get the form title based on the index
    const formTitle = orderChild[index] + " child";

    return (
        <main className="h-screen flex flex-col">
            <Heading />
            <div className='flex flex-col px-4 py-4 grow'>
                <TitleQuestion
                    title="Let's set up your Piggy Wallet"
                    question="Can you tell us a bit more about your children?" />
                <Form title={formTitle}>
                    <InputWithLabel
                        label='Name'
                        placeholder='John'
                        type='text'
                        hasLabel={true}
                        onChange={onChangeSetChildren}
                        value={children[index].name}
                        name="name"
                    />
                    <InputWithLabel
                        label='Birthday'
                        placeholder='MM/DD/YYYY'
                        type='date'
                        hasLabel={true}
                        onChange={onChangeSetChildren}
                        value={children[index].birthDay}
                        name="birthDay"
                    />
                    <InputWithLabel
                        label='Email'
                        hasLabel={true}
                        placeholder='john@email.com'
                        type='email'
                        onChange={onChangeSetChildren}
                        value={children[index].email}
                        name="email"
                    />
                </Form>
                <div className='items-end grow flex'>
                    <div className='flex flex-col gap-y-4 items-center justify-center w-full py-4'>
                        <Button
                            disabled={!children[index].name || !children[index].birthDay || !children[index].email}
                            onClick={onClickHandlerNext}>Next</Button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Step2;