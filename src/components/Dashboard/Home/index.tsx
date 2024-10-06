import React from 'react'
import SavingAccounts from '../SavingAccounts'
import FredokaTitle from '@/components/Atoms/FredokaTitle'
import Button from '@/components/Button'
import SavingsOverview from '../SavingsOverview'
import { mockChildSavings } from '@/app/Dashboard/page'
import { useState } from 'react'
import ModalDeposit from '../ModalDeposit'


interface IHome {
    balance: number
}

const Home : React.FC<IHome> = ({balance}) => {
    const [open, setOpen] = useState(false)
    const [valuesDeposit, setValuesDeposit] = useState({
        amount: 0,
        network: '',
    })
    const onClickDeposit = () => {
        console.log(valuesDeposit)
        setOpen(true)
    }
    const onClickSend = () => { 
        console.log('Send')
    }

  return (
    <div className="space-y-4">
        <ModalDeposit values={valuesDeposit} setValues={setValuesDeposit} setOpen={setOpen} open={open} />
        <div className='text-[20px] font-semibold'>Your Balance</div>
        <FredokaTitle className="text-[56px] font-bold">${balance}</FredokaTitle>
        <div className="flex gap-2">
            <Button onClick={onClickDeposit}>Deposit</Button>
            <Button onClick={onClickSend}>Send</Button>
        </div>
        <div>
            <SavingsOverview    
                amount={1000} 
                title="Savings & Investments Overview"
                childSavings={mockChildSavings}
                isHome={true}
                />
        </div>
    </div>
  )
}

export default Home