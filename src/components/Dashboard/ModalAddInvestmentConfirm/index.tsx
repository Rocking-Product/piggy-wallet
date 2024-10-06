import FredokaTitle from '@/components/Atoms/FredokaTitle';
import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/Atoms/Modal';
import Button from '@/components/Button';
import React from 'react';
import { ISaving } from '../SavingAccounts';
import Image from 'next/image';

interface IModalConfirmInvestment {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    childCreateAccount: ISaving | undefined;
    newInvestmentChild: {
        cryptoAsset: string;
        autosavePercentage: string;
        generateYield: boolean;
        duration: number;
    };
}

const ModalAddInvestmentConfirm: React.FC<IModalConfirmInvestment> = ({ setOpen, open, childCreateAccount, newInvestmentChild }) => {
    const { cryptoAsset, autosavePercentage, generateYield, duration } = newInvestmentChild;
    const { imageChild, title: name } = childCreateAccount as ISaving;

    const onClickHandler = () => {
        setOpen(false);
        // Proceed with the investment confirmation
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='bg-white max-w-[95%] rounded-lg p-6'>
                    <DialogHeader>
                        <DialogTitle className='text-center'>
                            <FredokaTitle className='font-bold text-lg'>
                                Confirm Investment
                            </FredokaTitle>
                        </DialogTitle>
                        <DialogDescription className='space-y-4'>
                            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                                <div>
                                    <h2 className="font-semibold text-lg">{cryptoAsset}</h2>
                                    <p className="text-sm text-gray-500">Amount accrued: $0</p>
                                </div>
                                <div className="flex items-center">
                                    <span className={`mr-2 text-sm ${generateYield ? 'text-green-500' : 'text-gray-500'}`}>
                                        Yield {generateYield ? 'On' : 'Off'}
                                    </span>
                                    <Image src={imageChild} alt="Icon" height={40} width={40} className="rounded-full" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4 p-2">
                                <div>
                                    <p className="text-sm text-gray-500">Setting Savings Goal to:</p>
                                    <p className="font-semibold">{name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Asset to receive:</p>
                                    <div className="flex items-center justify-end">
                                        <Image src={imageChild} alt="BTC Icon" height={24} width={24} />
                                        <span className="ml-2 font-semibold">{cryptoAsset}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Frequency:</p>
                                    <p className="font-semibold">Daily</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Duration:</p>
                                    <p className="font-semibold">{duration} days</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">You will pay per day:</p>
                                    <p className="font-semibold">${autosavePercentage}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Total:</p>
                                    <p className="font-semibold">${(Number(autosavePercentage) * duration).toFixed(2)}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-500">Yield:</p>
                                    <p className="font-semibold">Aave v3 (APY 3.85%)</p>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col space-y-2">
                        <Button onClick={onClickHandler}>
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ModalAddInvestmentConfirm;
