import FredokaTitle from '@/components/Atoms/FredokaTitle';
import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/Atoms/Modal';
import Button from '@/components/Button';
import React from 'react';
import { ISaving } from '../SavingAccounts';
import Image from 'next/image';
import Swapper from '@/components/Swapper';

interface IModalAddWallet {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    setValues: React.Dispatch<React.SetStateAction<{
        network: string;
        amount: number;
    }>>;
    values : {
        network: string;
        amount: number;
    }
}

const ModalDeposit: React.FC<IModalAddWallet> = ({ setOpen, open, setValues, values }) => {
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='bg-white max-w-[95%]'>
                    <DialogHeader>
                        <DialogTitle className='text-center'>
                            <FredokaTitle className='font-bold text-lg'>
                                Deposit
                            </FredokaTitle>
                        </DialogTitle>
                        <DialogDescription className='space-y-4'>
                            <Swapper
                                values={values}
                                setOpen={setOpen}
                                setValues={setValues}
                            />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ModalDeposit;