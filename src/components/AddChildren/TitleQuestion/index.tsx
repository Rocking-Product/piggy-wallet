import FredokaTitle from '@/components/Atoms/FredokaTitle'
import React from 'react'

interface ITitleQuestion {
    title: string
    question: string
}

const TitleQuestion : React.FC <ITitleQuestion> = ({title, question}) => {
  return (
    <div className='flex flex-col gap-4 mt-16'>
        <FredokaTitle className='text-[28px] font-semibold'>
            {title}
        </FredokaTitle>
        <p className='font-medium'>{question}</p>
    </div>
  )
}

export default TitleQuestion