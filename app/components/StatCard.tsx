import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { SvgIconComponent } from '@mui/icons-material';

//types
import { StatCardType } from '../types/statCardType';

export default function StatCardComponent({
  title,
  amount,
  icon: Icon,
  variant,
}: StatCardType): React.ReactElement {
  const color = amount < 70 ? '#22c55e' : '#c52238';

  return (
    <Box
      onClick={(title) => {
        console.log(title);
      }}
      sx={{
        backgroundColor: '#ffffff',
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: 3,
        padding: 3,
        minHeight: 140,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          marginBottom: 2,
        }}
      >
        <Icon />

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>
      </Box>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
        }}
      >
        {variant === 'progress' ? `${amount.toFixed(0)}%` : `€${amount.toFixed(2)}`}
      </Typography>

      {variant === 'progress' && (
        <LinearProgress
          variant="determinate"
          value={amount}
          sx={{
            mt: 2,
            height: 8,
            borderRadius: 5,
            '& .MuiLinearProgress-bar': {
              backgroundColor: color,
            },
          }}
        />
      )}
    </Box>
  );
}
