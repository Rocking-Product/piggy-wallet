import FredokaTitle from '@/components/Atoms/FredokaTitle';
import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/Atoms/Modal';
import Button from '@/components/Button';
import React, { useState } from 'react';
import { ISaving } from '../SavingAccounts';
import InputWithLabel from '@/components/Atoms/InputWithLabel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Atoms/Select';
import { IInvestmentChild } from '@/app/Dashboard/page';

interface IModalAddWallet {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    setOpenInvestmentConfirm: React.Dispatch<React.SetStateAction<boolean>>;
    childCreateAccount: ISaving | undefined;
    setNewInvestmentChild: React.Dispatch<React.SetStateAction<IInvestmentChild>>;
}

const ModalAddInvestmentChildCrypto: React.FC<IModalAddWallet> = ({ setOpen, open, childCreateAccount, setNewInvestmentChild, setOpenInvestmentConfirm }) => {
    const [autosavePercentage, setAutosavePercentage] = useState('');
    const [generateYield, setGenerateYield] = useState(false);
    const [frequency, setFrequency] = useState<'Daily' | 'Weekly'>('Daily');
    const [investmentDuration, setInvestmentDuration] = useState<number>();
    const [cryptoAsset, setCryptoAsset] = useState('');

    const onClickHandler = () => {
        setNewInvestmentChild({
            cryptoAsset,
            autosavePercentage,
            generateYield,
            duration : investmentDuration as number,
        });
        setOpenInvestmentConfirm(true);
        setOpen(false);
    };

    const onChangeHandler = (e: string) => {
        setCryptoAsset(e);
    }

    const isContinueDisabled = !cryptoAsset || !autosavePercentage || !investmentDuration ;

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='bg-white max-w-[95%] rounded-lg p-6'>
                    <DialogHeader>
                        <DialogTitle className='text-center'>
                            <FredokaTitle className='font-bold text-lg'>
                                Set up {childCreateAccount?.title}&apos;s new investment
                            </FredokaTitle>
                        </DialogTitle>
                        <DialogDescription className='space-y-4'>
                            <Select onValueChange={onChangeHandler}>
                                <SelectTrigger>
                                    <SelectValue>{cryptoAsset}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Bitcoin">Bitcoin</SelectItem>
                                    <SelectItem value="Ethereum">Ethereum</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputWithLabel
                                label='Amount to invest'
                                placeholder="$12.34"
                                hasLabel={true}
                                type="text"
                                name="autosavePercentage"
                                value={autosavePercentage}
                                onChange={(e) => setAutosavePercentage(e.target.value)}
                            />
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Frequency</label>
                                <div className="flex space-x-4 mt-2">
                                    <div
                                        className='grow'
                                        onClick={() => setFrequency('Daily')}>
                                        <Button
                                            onClick={() => { { } }}
                                            disabled={frequency === 'Weekly'}>
                                            Daily
                                        </Button>
                                    </div>
                                    <div onClick={() => setFrequency('Weekly')}
                                        className='grow'>
                                        <Button
                                            onClick={() => { { } }}
                                            disabled={frequency === 'Daily'}>
                                            Weekly
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <InputWithLabel
                                label='Investment duration'
                                placeholder="2 days"
                                hasLabel={true}
                                type="number"
                                name="investmentDuration"
                                value={investmentDuration}
                                onChange={(e) => setInvestmentDuration(e.target.value as unknown as number)}
                            />
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Generate Yield?</label>
                                <div className="flex space-x-4 mt-2">
                                    <div
                                        className='grow'
                                        onClick={() => setGenerateYield(false)}>
                                        <Button
                                            onClick={() => { { } }}
                                            disabled={generateYield}>
                                            No
                                        </Button>
                                    </div>
                                    <div onClick={() => setGenerateYield(true)} className='grow'>
                                        <Button
                                            onClick={() => { { } }}
                                            disabled={!generateYield}
                                        >
                                            Yes
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button disabled={isContinueDisabled} onClick={onClickHandler}>
                            Continue
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ModalAddInvestmentChildCrypto;
