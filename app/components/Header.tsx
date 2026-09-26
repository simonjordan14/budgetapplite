'use client';

//react
import { ReactElement } from 'react';

//components
import StatCardComponent from './StatCard';

//icons
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';

//type
import { StatCardType } from '../types/statCardType';

type HeaderComponentProps = {
  totalExpenseAmount: number;
  userWage: number;
  remainingBudget: number;
};

export default function HeaderComponent({
  totalExpenseAmount,
  userWage,
  remainingBudget,
}: HeaderComponentProps): ReactElement {
  const progressAmount = userWage > 0 ? Math.min((totalExpenseAmount / userWage) * 100, 100) : 0;

  const cardData: StatCardType[] = [
    {
      title: 'Monthly Income',
      amount: userWage,
      icon: AccountBalanceWalletOutlinedIcon,
      variant: 'currency',
    },
    {
      title: 'Total Expenses',
      amount: totalExpenseAmount,
      icon: ReceiptLongOutlinedIcon,
      variant: 'currency',
    },
    {
      title: 'Remaining Balance',
      amount: remainingBudget,
      icon: SavingsOutlinedIcon,
      variant: 'currency',
    },
    {
      title: 'Progress',
      amount: progressAmount,
      icon: PercentOutlinedIcon,
      variant: 'progress',
    },
  ];

  return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cardData.map((card) => (
        <StatCardComponent
          key={card.title}
          title={card.title}
          amount={card.amount}
          icon={card.icon}
          variant={card.variant}
        />
      ))}
    </div>
  );
}
