'use client';

import { ReactElement } from 'react';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { ExpenseDataType } from '../types/expenseType';

type ExpenseTableProps = {
  expenseData: ExpenseDataType[];
  onDeleteExpense: (id: number) => void;
};

export default function ExpenseTable({
  expenseData,
  onDeleteExpense,
}: ExpenseTableProps): ReactElement {
  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Expense',
      flex: 1,
      minWidth: 180,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 140,
      valueFormatter: (value: number) => `€${value.toFixed(2)}`,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 160,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: ({ id }) => [
        <GridActionsCellItem key="edit" icon={<EditOutlinedIcon />} label="Edit" />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteOutlineOutlinedIcon />}
          label="Delete"
          onClick={() => onDeleteExpense(Number(id))}
        />,
      ],
    },
  ];
  return (
    <DataGrid
      rows={expenseData}
      columns={columns}
      disableRowSelectionOnClick
      sx={{
        backgroundColor: '#fff',
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: 3,

        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: 'grey.50',
        },

        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 600,
        },
      }}
    />
  );
}
