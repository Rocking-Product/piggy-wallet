import { Fredoka } from 'next/font/google'
import React from 'react'



interface IForm {
    children: React.ReactNode
    title? : string
}

const Form  : React.FC<IForm> = ({children, title}) => {
  return (
    <div className='flex flex-col gap-y-2 mt-4'>
        {title && <h2 className='font-semibold'>{title}</h2>}
        {children}
    </div>
  )
}

export default Form