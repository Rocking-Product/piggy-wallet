import React, { useState, useEffect } from 'react';
import SavingAccounts from '../SavingAccounts';
import FredokaTitle from '@/components/Atoms/FredokaTitle';
import Button from '@/components/Button';
import SavingsOverview from '../SavingsOverview';
import { mockChildSavings } from '@/app/Dashboard/page';
import ModalDeposit from '../ModalDeposit';

interface IHome {
  balance: number; // Balance en USDC
}

const Home: React.FC<IHome> = ({ balance }) => {
  const [open, setOpen] = useState(false);
  const [valuesDeposit, setValuesDeposit] = useState({
    amount: 0,
    network: '',
  });

  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [balanceInARS, setBalanceInARS] = useState<number | null>(null);

  useEffect(() => {
    // Función para obtener la tasa de cambio USD a ARS
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        const rate = data.rates.ARS;
        setExchangeRate(rate);

        // Calcular el balance en ARS
        const calculatedBalanceInARS = balance * rate;
        setBalanceInARS(calculatedBalanceInARS);
      } catch (error) {
        console.error('Error al obtener la tasa de cambio:', error);
      }
    };

    fetchExchangeRate();
  }, [balance]);

  const onClickDeposit = () => {
    console.log(valuesDeposit);
    setOpen(true);
  };
  const onClickSend = () => {
    console.log('Send');
  };

  return (
    <div className="space-y-4">
      <ModalDeposit
        values={valuesDeposit}
        setValues={setValuesDeposit}
        setOpen={setOpen}
        open={open}
      />
      <div className="text-[20px] font-semibold">Your Balance</div>
      <FredokaTitle className="text-[56px] font-bold">
        ${balance} USDC
        {balanceInARS !== null && (
          <div className="text-[28px] font-medium">
            ≈ {balanceInARS.toFixed(2)} ARS
          </div>
        )}
      </FredokaTitle>
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
  );
};

export default Home;
