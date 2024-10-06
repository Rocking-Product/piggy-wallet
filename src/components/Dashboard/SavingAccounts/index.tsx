import { IInvestment } from '@/app/Dashboard/page'
import FredokaTitle from '@/components/Atoms/FredokaTitle'
import Image, { StaticImageData } from 'next/image'
import React from 'react'

export interface ISaving {
    title: string
    amount: number
    imageChild: StaticImageData
    imageSavingGoal: StaticImageData
    yieldOn: boolean
    description: string
    autoSave: number
}

const SavingsCard: React.FC<ISaving> = ({ title, amount, imageChild, imageSavingGoal, yieldOn, description, autoSave }) => {
    return (
        <div className='flex justify-between border rounded-md'>
            <div className='flex'>
            <div className='flex items-center justify-center w-20 bg-[#F5F3FF]'>
                <Image
                    width={50}
                    height={50}
                    src={imageSavingGoal}
                    alt="saving goal"
                    className='object-cover'
                />
            </div>
            <div className='flex flex-col p-2'>
                <p className='text-neutral-700'>{description}</p>
                <FredokaTitle className='font-bold text-[28px]'>${amount}</FredokaTitle>
                <p className='text-neutral-800'>Autosave {autoSave}%</p>
            </div>
            </div>
            <div className='flex flex-col items-center justify-center p-2'>
                    <Image
                        width={50}
                        height={50}
                        src={imageChild}
                        alt="child"
                    />
                <div>{yieldOn ? 'Yield On' : 'Yield Off'}</div>
            </div>
        </div>
    );
}

interface ISavingAccounts {
    savings: ISaving[] | IInvestment[]
}

const SavingAccounts: React.FC<ISavingAccounts> = ({ savings }) => {
    const isInvestment = Array.isArray(savings) && savings.every(item => 'daysLeft' in item);
    return (
        <div className='space-y-2'>
            <div className='font-bold text-lg mt-8'>{
                isInvestment ? 'Investment Accounts' : 'Saving Accounts'
                }</div>
            <div className='space-y-2 max-h-[350px] overflow-y-scroll'>
                {savings.map((saving, index) => (
                    <SavingsCard
                        key={index}
                        title={saving.title}
                        amount={saving.amount}
                        imageChild={saving.imageChild}
                        imageSavingGoal={saving.imageSavingGoal}
                        yieldOn={saving.yieldOn}
                        description={saving.description}
                        autoSave={saving.autoSave}
                    />
                ))}
                <div className="h-20"/>
            </div>
        </div>
    )
}

export default SavingAccounts