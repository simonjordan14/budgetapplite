'use client';

import { FormEvent, ReactElement, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

type ExpenseFormProps = {
  onAddExpense: (title: string, amount: number) => void;
};

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps): ReactElement {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (title === '') {
    }

    onAddExpense(title, Number(amount));

    setTitle('');
    setAmount('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: '#fff',
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: 3,
        p: 3,
        mt: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 3,
        }}
      >
        Add Expense
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '2fr 1fr 1fr auto',
          },
          gap: 2,
          alignItems: 'center',
        }}
      >
        <TextField
          label="Expense"
          placeholder="e.g. Groceries"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          fullWidth
        />

        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            },
          }}
          fullWidth
        />

        <Button
          disabled={!title}
          type="submit"
          variant="contained"
          sx={{
            height: 56,
            px: 3,
            whiteSpace: 'nowrap',
          }}
        >
          Add Expense
        </Button>
      </Box>
    </Box>
  );
}
