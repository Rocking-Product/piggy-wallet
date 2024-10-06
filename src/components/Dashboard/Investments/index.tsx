import React from 'react'
import InvestmentOverview from '../SavingsOverview';
import InvestmentAccounts from '../SavingAccounts';
import { IChildInvestments, IInvestment } from '@/app/Dashboard/page'

interface IInvestments {
    upperNavigation: string 
    investmentaccounts: IInvestment[]
    setOpenModalAddInvestment: React.Dispatch<React.SetStateAction<boolean>>
    investments: IChildInvestments[]
}

const Investments : React.FC<IInvestments> = ({upperNavigation, investmentaccounts, setOpenModalAddInvestment, investments}) => {


    const filterSavings = (child: string) => {
        return investmentaccounts.filter(investmentaccount => investmentaccount.title === child)
    }

  return (
    <div>
      {upperNavigation === "See All" && <InvestmentOverview
        isAll={true}
        amount={100}
        title='Investments Overview'
        childSavings={investments}
      />}
      {upperNavigation === "See All" && <InvestmentAccounts
        savings={investmentaccounts}
      />}
      {upperNavigation !== "See All" && <InvestmentOverview
        isInvestment={true}
        setOpenModal={() => setOpenModalAddInvestment(true)}
        amount={100}
        title={`${upperNavigation}'s Investments`}
        childSavings={investments}
      />}
      {upperNavigation !== "See All" &&<InvestmentAccounts
        savings={filterSavings(upperNavigation)}
      />}
    </div>
  )
}

export default Investments