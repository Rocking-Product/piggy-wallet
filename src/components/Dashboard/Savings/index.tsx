import React from 'react'
import SavingsOverview from '../SavingsOverview'
import SavingAccounts, { ISaving } from '../SavingAccounts'
import { IChildSavings } from '@/app/Dashboard/page'

interface ISavings {
  upperNavigation: string
  setOpenModalAddWallet: (open: boolean) => void
  childSavings: IChildSavings[]
  savingAccounts: ISaving[]
}

const Savings: React.FC<ISavings> = ({ upperNavigation, setOpenModalAddWallet, childSavings, savingAccounts }) => {
const filterSavings = (child: string) => {
    return savingAccounts.filter(saving => saving.title === child)
}
  return (
    <div>
      {upperNavigation === "See All" && <SavingsOverview
        isAll={true}
        amount={100}
        title='Savings Overview'
        childSavings={childSavings}
      />}
      {upperNavigation === "See All" && <SavingAccounts
        savings={savingAccounts}
      />}
      {upperNavigation !== "See All" && <SavingsOverview
        isSaving={true}
        setOpenModal={() => setOpenModalAddWallet(true)}
        amount={100}
        title={`${upperNavigation}'s Savings`}
        childSavings={childSavings}
      />}
      {upperNavigation !== "See All" &&<SavingAccounts
        savings={filterSavings(upperNavigation)}
      />}
    </div>
  )
}

export default Savings