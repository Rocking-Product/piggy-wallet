import FredokaTitle from '@/components/Atoms/FredokaTitle';
import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/Atoms/Modal';
import Button from '@/components/Button';
import React, { useState } from 'react';
import { ISaving } from '../SavingAccounts';
import InputWithLabel from '@/components/Atoms/InputWithLabel';

interface IModalAddWallet {
    setOpenModalAddWalletChildForm: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    setOpenModalConfirm: React.Dispatch<React.SetStateAction<boolean>>;
    childCreateAccount: ISaving | undefined;
    setNewWalletChild: React.Dispatch<React.SetStateAction<{
        title: string;
        autosavePercentage: string;
        generateYield: boolean;
    }>>;
}

const ModalAddWalletChild: React.FC<IModalAddWallet> = ({ setOpenModalAddWalletChildForm, open, childCreateAccount, setNewWalletChild, setOpenModalConfirm }) => {
    const [title, setTitle] = useState('');
    const [autosavePercentage, setAutosavePercentage] = useState('');
    const [generateYield, setGenerateYield] = useState(false);

    const onClickHandler = () => {
        setNewWalletChild({
            title,
            autosavePercentage,
            generateYield
        });
        setOpenModalConfirm(true);
        setOpenModalAddWalletChildForm(false);
    };

    const isContinueDisabled = !title || !autosavePercentage;

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpenModalAddWalletChildForm}>
                <DialogContent className='bg-white max-w-[95%]'>
                    <DialogHeader>
                        <DialogTitle className='text-center'>
                            <FredokaTitle className='font-bold text-lg'>
                                Set up {childCreateAccount?.title}&apos;s new savings account
                            </FredokaTitle>
                        </DialogTitle>
                        <DialogDescription className='space-y-4'>
                            <InputWithLabel
                                label='Add a title'
                                placeholder="Clean your bedroom"
                                hasLabel={true}
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <InputWithLabel
                                label='Insert autosave percentage'
                                placeholder="12.34%"
                                hasLabel={true}
                                type="text"
                                name="autosavePercentage"
                                value={autosavePercentage}
                                onChange={(e) => setAutosavePercentage(e.target.value)}
                            />
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Generate Yield?</label>
                                <div className="flex space-x-4 mt-2">
                                    <div 
                                      className='grow'
                                      onClick={() => setGenerateYield(false)}>
                                        <Button
                                            onClick={() => {{}}}
                                            disabled={generateYield}>
                                            No
                                        </Button>
                                    </div>
                                    <div onClick={() => setGenerateYield(true)} className='grow'>
                                        <Button
                                            onClick={() => {{}}}
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

export default ModalAddWalletChild;