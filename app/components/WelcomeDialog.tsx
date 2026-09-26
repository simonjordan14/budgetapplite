'use client';

import { ReactElement, useState } from 'react';

// mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

type WelcomeDialogProps = {
  open: boolean;
  onSave: (name: string, wage: number) => void;
};

export default function WelcomeDialog({ open, onSave }: WelcomeDialogProps): ReactElement {
  const [name, setName] = useState('');
  const [wage, setWage] = useState('');

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const parsedWage = Number(wage);

    if (!trimmedName || parsedWage <= 0) {
      return;
    }

    onSave(trimmedName, parsedWage);
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: 700,
          pb: 1,
        }}
      >
        Welcome to BudgetApp Lite
      </DialogTitle>

      <DialogContent>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 3,
          }}
        >
          Lets get a couple of details before we get started.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="What should we call you?"
            placeholder="e.g. Simon"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoFocus
            fullWidth
          />

          <TextField
            label="Monthly income"
            type="number"
            value={wage}
            onChange={(event) => setWage(event.target.value)}
            fullWidth
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">€</InputAdornment>,
              },
            }}
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={!name.trim() || Number(wage) <= 0}
          >
            Get Started
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
