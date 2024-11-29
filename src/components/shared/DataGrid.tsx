import React from 'react';
import {
  DataGrid as DG,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { Box } from '@mui/material';
import {
  GridValidRowModel,
  GridColDef,
  GridCellEditStopParams,
  GridCellEditStopReasons,
  MuiEvent,
} from '@mui/x-data-grid';

type UpdateParams = {
  id: number;
  body: Record<string, unknown>;
};

export type GlobalDataGridProps = {
  columns: GridColDef[];
  rows: GridValidRowModel[];
  loading: boolean;
  pageSize?: number;
  totalRowCount: number;
  onUpdate: (params: UpdateParams) => void;
};
function CustomToolbar() {
  return (
    <GridToolbarContainer
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
      <GridToolbarExport />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}
const GlobalDataGrid = ({
  columns,
  rows,
  loading,
  totalRowCount,
  onUpdate,
}: GlobalDataGridProps) => {
  return (
    <Box
      sx={{
        height: 600,
        width: '100%',
        '& .datagrid--header': {
          fontWeight: 'bold',
        },
      }}>
      <DG
        onCellEditStop={(params: GridCellEditStopParams) => {
          if (params.reason === GridCellEditStopReasons.enterKeyDown) {
            const bodyParams = Object.entries(params.row).filter(entry => {
              if (entry[0] === 'id') {
                return;
              }
              return { [entry[0]]: entry[1] };
            });
            onUpdate({ id: params.id as number, body: Object.fromEntries(bodyParams) });
          }
        }}
        rows={rows}
        getRowId={row => (row.roomId ? row.roomId : row.id)}
        disableColumnSelector
        columns={columns}
        autoPageSize
        loading={loading}
        pagination
        paginationMode="server"
        slots={{
          toolbar: CustomToolbar,
        }}
        slotProps={{
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton',
          },
          toolbar: { showQuickFilter: true },
        }}
        rowCount={totalRowCount}
        sx={{
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
      />
    </Box>
  );
};

export default GlobalDataGrid;
