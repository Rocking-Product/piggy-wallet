import FredokaTitle from '@/components/Atoms/FredokaTitle'
import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle  } from '@/components/Atoms/Modal'
import Button from '@/components/Button'
import React from 'react'
import { ISaving } from '../SavingAccounts'
import Image, { StaticImageData } from 'next/image'
import crypto from '../../../../public/crypto.svg'
import stock from '../../../../public/stocks.png'

interface IModalAddWallet {
    setOpen : React.Dispatch<React.SetStateAction<boolean>>
    open : boolean
    setModalAddInvestmentChild : React.Dispatch<React.SetStateAction<boolean>>
    setStockOrCrypto : React.Dispatch<React.SetStateAction<String>>
    stockOrCrypto : String
}

interface IModalCard {
    pic : StaticImageData
    balance : string
    name : string
    setStockOrCrypto : React.Dispatch<React.SetStateAction<String>>
}

const mockDataCryptoOrStock = [
    {
        title: 'Crypto',
        image: crypto,
        description : "High Volatility"
    },
    {
        title: 'Stock',
        image: stock,
        description : "Moderate Volatility"
    },
]


const ModalCard : React.FC<IModalCard> = ({pic, balance, name, setStockOrCrypto}) => {

    const onCheckBoxChange = () => {
        setStockOrCrypto(balance)
    }
    
    return (
        <div className='flex justify-between'>
            <div className="flex gap-4">
                <div className="w-10">
                    <Image 
                        src={pic} 
                        alt= {name}
                        width={50}
                        height={50}
                    />
                </div>
                <div>
                    <p>{balance}</p>
                    <p>{name}</p>
                   
                </div>
            </div>
            <div>
                <input 
                    type="checkbox"
                    onChange={onCheckBoxChange}
                />
            </div>
        </div>
    )
}

const ModalAddInvestmentChooseType : React.FC <IModalAddWallet> = ({setOpen, open, setModalAddInvestmentChild, setStockOrCrypto, stockOrCrypto}) => {

    const onClickHandler = () => {
        setModalAddInvestmentChild(true)
        setOpen(false)
    }

  return (
    <div className=''>
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='bg-white max-w-[95%]'>
            <DialogHeader>
            <DialogTitle className='text-center'>
                <FredokaTitle className='font-bold text-lg'>
                    Select a type of investment
                </FredokaTitle>
            </DialogTitle>
            <DialogDescription className='space-y-2'>
                    {mockDataCryptoOrStock.map((stockOrCrypto, index) => (
                        <ModalCard
                            key={index}
                            name={stockOrCrypto.description}
                            pic={stockOrCrypto.image}
                            balance={stockOrCrypto.title}
                            setStockOrCrypto={setStockOrCrypto}/>
                    ))}
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                     <Button disabled={!stockOrCrypto} onClick={onClickHandler}>Continue</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    </div>
  )
}

export default ModalAddInvestmentChooseType