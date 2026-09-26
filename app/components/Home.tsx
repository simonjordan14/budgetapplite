'use client';

// react
import { useState, useEffect } from 'react';

// components
import NavbarComponent from './Navbar';
import HeaderComponent from './Header';
import TableComponent from './ExpenseTable';
import ExpenseFormComponent from './ExpenseForm';
import WelcomeDialog from './WelcomeDialog';

// types
import { ExpenseDataType } from '../types/expenseType';
import { BudgetAppData } from '../types/budgetAppType';

const getStoredData = (): BudgetAppData | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedData = localStorage.getItem('budgetAppData');

  if (!storedData) {
    return null;
  }

  return JSON.parse(storedData);
};

export default function HomeComponent() {
  const [storedData] = useState<BudgetAppData | null>(() => getStoredData());

  const [userName, setUserName] = useState(storedData?.userName ?? '');
  const [userWage, setUserWage] = useState(storedData?.userWage ?? 0);
  const [showWelcome, setShowWelcome] = useState(!storedData);

  const [expenseData, setExpenseData] = useState<ExpenseDataType[]>(storedData?.expenses ?? []);
  const totalExpenseAmount = expenseData.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);

  const remainingBudget = userWage - totalExpenseAmount;

  const handleAddExpense = (title: string, amount: number) => {
    const newExpense: ExpenseDataType = {
      id: Date.now(),
      title,
      amount,
    };

    setExpenseData((currentExpenses) => [...currentExpenses, newExpense]);
  };

  const handleDeleteExpense = (id: number) => {
    setExpenseData((currentExpenses) => currentExpenses.filter((expense) => expense.id !== id));
  };

  const handleUserSetup = (name: string, wage: number) => {
    setUserName(name);
    setUserWage(wage);
    setShowWelcome(false);
  };

  // Save whenever our app data changes
  useEffect(() => {
    if (!userName) {
      return;
    }

    const data: BudgetAppData = {
      userName,
      userWage,
      expenses: expenseData,
    };

    localStorage.setItem('budgetAppData', JSON.stringify(data));
  }, [userName, userWage, expenseData]);

  return (
    <>
      <WelcomeDialog open={showWelcome} onSave={handleUserSetup} />
      <NavbarComponent userName={userName} />
      <HeaderComponent
        totalExpenseAmount={totalExpenseAmount}
        userWage={userWage}
        remainingBudget={remainingBudget}
      />
      <ExpenseFormComponent onAddExpense={handleAddExpense} />
      <TableComponent expenseData={expenseData} onDeleteExpense={handleDeleteExpense} />
    </>
  );
}
