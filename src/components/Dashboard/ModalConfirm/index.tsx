import FredokaTitle from '@/components/Atoms/FredokaTitle';
import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/Atoms/Modal';
import Button from '@/components/Button';
import React from 'react';
import { ISaving } from '../SavingAccounts';
import Image from 'next/image';

interface IModalAddWallet {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    childCreateAccount: ISaving | undefined;
   
    newWalletChild: {
        title: string;
        autosavePercentage: string;
        generateYield: boolean;
    };
}

const ModalConfirm: React.FC<IModalAddWallet> = ({ setOpen, open, childCreateAccount, newWalletChild }) => {
    const { title, autosavePercentage, generateYield } = newWalletChild;
    const {imageChild, title : name} = childCreateAccount as ISaving;
   
   

    const onClickHandler = () => {
        setOpen(false);
        // create wallet
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='bg-white max-w-[95%]'>
                    <DialogHeader>
                        <DialogTitle className='text-center'>
                            <FredokaTitle className='font-bold text-lg'>
                                Confirm Savings Account
                            </FredokaTitle>
                        </DialogTitle>
                        <DialogDescription className='space-y-4'>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="font-semibold text-lg">{title}</h2>
                                    <p className="text-sm text-gray-500">Autosave {autosavePercentage}%</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">Yield {generateYield ? 'On' : 'Off'}</span>
                                    <Image src={imageChild} alt="Icon" height={40} width={40}/>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <p className="text-sm">Setting Savings Goal to: <strong>{name}</strong></p>
                                <p className="text-sm">Autosave Percentage: <strong>{autosavePercentage}%</strong></p>
                                {generateYield && (
                                    <p className="text-sm">Yield: <strong>Uniswap v3 (APY 0.43%)</strong></p>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                By adding this new savings account, {autosavePercentage}% of all deposits will be moved from general savings to this account.
                            </p>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="space-y-2">
                        <Button onClick={onClickHandler}>
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ModalConfirm;
