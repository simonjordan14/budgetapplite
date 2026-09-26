import logo from '@/public/images/logo.png';
import Image from 'next/image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

type NavbarProps = {
  userName: string;
};

export default function NavbarComponent({ userName }: NavbarProps): ReactElement {
  return (
    <nav className="flex items-center justify-between px-4 py-3 sm:px-6">
      <Image src={logo} alt="BudgetApp Lite" className="h-auto w-40 sm:w-48" priority />

      <div className="flex items-center gap-1">
        <Typography
          component="span"
          sx={{
            fontWeight: 500,
            fontSize: {
              xs: '0.875rem',
              sm: '1rem',
            },
          }}
        >
          {userName}
        </Typography>

        <AccountCircleIcon />
      </div>
    </nav>
  );
}
