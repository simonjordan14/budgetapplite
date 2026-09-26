import { ExpenseDataType } from './expenseType';

export type BudgetAppData = {
  userName: string;
  userWage: number;
  expenses: ExpenseDataType[];
};
