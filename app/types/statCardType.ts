import { SvgIconComponent } from '@mui/icons-material';

export type StatCardType = {
  title: string;
  amount: number;
  icon: SvgIconComponent;
  variant: 'currency' | 'progress';
};
