import FredokaTitle from '@/components/Atoms/FredokaTitle'
import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle  } from '@/components/Atoms/Modal'
import Button from '@/components/Button'
import React from 'react'
import { ISaving } from '../SavingAccounts'
import Image, { StaticImageData } from 'next/image'

interface IModalAddWallet {
    setOpenModalAddWallet : React.Dispatch<React.SetStateAction<boolean>>
    children : ISaving[]
    setChildCreateAccount : React.Dispatch<React.SetStateAction<ISaving | undefined>>
    open : boolean
    childCreateAccount : ISaving | undefined
    setOpenModalAddWalletChildForm : React.Dispatch<React.SetStateAction<boolean>>

}

interface IModalCard {
    pic : StaticImageData
    balance : number
    name : string
    setChildCreateAccount : React.Dispatch<React.SetStateAction<ISaving | undefined>>
}


const ModalCard : React.FC<IModalCard> = ({pic, balance, name, setChildCreateAccount}) => {

    const onCheckBoxChange = () => {
     
        setChildCreateAccount({
            title: name,
            amount: balance,
            imageChild: pic,
            imageSavingGoal: pic,
            yieldOn: true,
            description: 'Matt saving goal',
            autoSave: 10,
        })
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
                    <p>{name}</p>
                    <p>${balance}</p>
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




const ModalAddWallet : React.FC <IModalAddWallet> = ({setOpenModalAddWallet, children, setChildCreateAccount, open, childCreateAccount, setOpenModalAddWalletChildForm}) => {

    const onClickHandler = () => {
        setOpenModalAddWalletChildForm(true)
        setOpenModalAddWallet(false)
    }


  return (
    <div className=''>
        <Dialog open={open} onOpenChange={setOpenModalAddWallet}>
        <DialogContent className='bg-white max-w-[95%]'>
            <DialogHeader>
            <DialogTitle className='text-center'>
                <FredokaTitle className='font-bold text-lg'>
                    Select one of your children to set a new savings account
                </FredokaTitle>
            </DialogTitle>
            <DialogDescription>
                    {children.map((child, index) => (
                        <ModalCard
                            key={index}
                            name={child.title}
                            pic={child.imageChild}
                            balance={child.amount}
                            setChildCreateAccount={setChildCreateAccount}/>
                    ))}
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                     <Button disabled={!childCreateAccount} onClick={onClickHandler}>Continue</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    </div>
  )
}

export default ModalAddWallet