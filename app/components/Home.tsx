'use client';

// react
import { useEffect, useState } from 'react';

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
  const storedData = localStorage.getItem('budgetAppData');

  if (!storedData) {
    return null;
  }

  return JSON.parse(storedData);
};

export default function HomeComponent() {
  const [userName, setUserName] = useState('');
  const [userWage, setUserWage] = useState(0);
  const [expenseData, setExpenseData] = useState<ExpenseDataType[]>([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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

  // Load saved data after the component mounts
  useEffect(() => {
    const storedData = getStoredData();

    queueMicrotask(() => {
      if (storedData) {
        setUserName(storedData.userName ?? '');
        setUserWage(storedData.userWage ?? 0);
        setExpenseData(storedData.expenses ?? []);
      } else {
        setShowWelcome(true);
      }

      setIsLoaded(true);
    });
  }, []);

  // Save whenever app data changes
  useEffect(() => {
    if (!isLoaded || !userName) {
      return;
    }

    const data: BudgetAppData = {
      userName,
      userWage,
      expenses: expenseData,
    };

    localStorage.setItem('budgetAppData', JSON.stringify(data));
  }, [userName, userWage, expenseData, isLoaded]);

  // Prevent server/client hydration mismatch
  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <WelcomeDialog open={showWelcome} onSave={handleUserSetup} />

      <NavbarComponent userName={userName} setShowWelcome={setShowWelcome} />

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
