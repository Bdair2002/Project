import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import GlobalDataGrid from './DataGrid';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { GlobalDataGridProps } from './DataGrid';

export default {
  title: 'Pages/AdminPage/GlobalDataGrid',
  component: GlobalDataGrid,
  argTypes: {
    columns: { control: 'object' },
    rows: { control: 'object' },
    loading: { control: 'boolean' },
    totalRowCount: { control: 'number' },
    onUpdate: { action: 'onUpdate' },
  },
} as Meta<typeof GlobalDataGrid>;

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 110 },
];

const rows: GridValidRowModel[] = [
  { id: 1, name: 'John Doe', age: 28 },
  { id: 2, name: 'Jane Smith', age: 34 },
  { id: 3, name: 'Michael Johnson', age: 45 },
];

const loadingRows: GridValidRowModel[] = [];

export const Default: StoryObj<GlobalDataGridProps> = {
  render: args => <GlobalDataGrid {...args} />,
  args: {
    columns,
    rows,
    loading: false,
    totalRowCount: rows.length,
  },
};

export const Loading: StoryObj<GlobalDataGridProps> = {
  render: args => <GlobalDataGrid {...args} />,
  args: {
    columns,
    rows: loadingRows,
    loading: true,
    totalRowCount: 0,
  },
};
