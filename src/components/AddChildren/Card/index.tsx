import { IChild } from '@/app/AddChildren/page'
import React from 'react'
import { orderChild } from '../Step2'
import Image from 'next/image'
import edit from '../../../../public/edit.svg'


interface ICard {
    child: IChild
    index: number
}

const calculateAge = (birthDay: string) => {
    const birthDate = new Date(birthDay)
    const ageDifMs = Date.now() - birthDate.getTime()
    const ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
}

const Card: React.FC<ICard> = ({ child, index }) => {
    const age = calculateAge(child.birthDay)
    const formattedDate = formatDate(child.birthDay)
    return (
        <div className='bg-neutral-100 p-4 border flex flex-col gap-y-1 border-neutral-400 rounded-md relative'>
            <div className='w-10 h-10 absolute top-2 right-2'>
                <Image
                    src={edit}
                    alt='edit'
                    height={40}
                    width={40}
                />
            </div>
            <h2 className='text-lg font-bold'>{`${orderChild[index]} child`}</h2>
            <div className='flex'>
                <p className='text-neutral-700 font-bold w-40'>Name</p>
                <p className='text-neutral-900 font-medium'>{child.name}</p>
            </div>
            <div className='flex'>
                <p className='text-neutral-700 font-bold w-40'>Birthday</p>
                <p className='text-neutral-900 font-medium'>{formattedDate}</p>
            </div>
            <div className='flex'>
                <p className='text-neutral-700 font-bold w-40'>Age</p>
                <p className='text-neutral-900 font-medium'>{`${age} years old`}</p>
            </div>
            <div className='flex'>
                <p className='text-neutral-700 font-bold w-40'>Email</p>
                <p className='text-neutral-900 font-medium'>{child.email}</p>
            </div>
        </div>
    )
}

export default Card