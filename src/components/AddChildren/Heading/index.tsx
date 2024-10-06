import Image from 'next/image'
import piggy from '../../../../public/piggy.png'

import React from 'react'

const Heading = () => {
  return (
    <div className="h-[290px] bg-brand flex justify-center items-end">
    <div className='relative justify-center -bottom-12 w-full'>
        <Image className='mx-auto' src={piggy} alt="Piggy Wallet Logo" width={180} height={180} />
    </div>
</div>
  )
}

export default Heading