import React, { useState } from 'react';
import { useMemo } from 'react';
import CustomModal from '../../../components/shared/Modal';
import {
  useFetchHotelsQuery,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
  useAddHotelMutation,
} from '../../../redux/slices/adminSlices/hotelsSlice';
import GlobalDataGrid from '../../../components/shared/DataGrid';
import { GridColDef } from '@mui/x-data-grid';
import { Button, Container, Typography } from '@mui/material';
import AddHotelForm from './components/AddHotelForm';
import DeleteIcon from '@mui/icons-material/Delete';
import useSnackbar from '../../../hooks/useSnackbar';
import Divider from '@mui/material/Divider';

const AdminHotels = () => {
  const snackBar = useSnackbar();
  const [addHotel, { status, error }] = useAddHotelMutation();
  const [openAddHotelModal, setOpenAddHotelModal] = useState<boolean>(false);
  const [deleteHotel] = useDeleteHotelMutation();
  const { data, isLoading } = useFetchHotelsQuery();
  const [updateHotel] = useUpdateHotelMutation();
  const handleDeleteHotel = async (hotelId: number) => {
    try {
      await deleteHotel({ hotelId }).unwrap();
      snackBar.showSnackBar({
        message: 'Hotel Added Successfully!',
        title: 'Success',
        severity: 'success',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    } catch (error) {
      snackBar.showSnackBar({
        message: 'Error adding hotel. Please try again.',
        title: 'Error',
        severity: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  };
  const handleAddHotel = async (values: Record<string, unknown>) => {
    setOpenAddHotelModal(false);
    try {
      await addHotel({ body: values }).unwrap();
      snackBar.showSnackBar({
        message: 'Hotel Added Successfully!',
        title: 'Success',
        severity: 'success',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    } catch (error) {
      snackBar.showSnackBar({
        message: 'Error adding hotel. Please try again.',
        title: 'Error',
        severity: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  };
  const handleUpdateHotel = async ({ id, body }: { id: number; body: Record<string, unknown> }) => {
    try {
      await updateHotel({ id, body }).unwrap();
      snackBar.showSnackBar({
        message: 'Hotel Updated Successfully!',
        title: 'Success',
        severity: 'success',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    } catch (error) {
      snackBar.showSnackBar({
        message: 'Error updating hotel. Please try again.',
        title: 'Error',
        severity: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  };
  const columns: GridColDef[] = useMemo(() => {
    if (!isLoading && data && data.length > 0) {
      const keys = Object.keys(data[0]);

      const cols = keys.map(key => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: 200,
        editable: key !== 'id',
        headerClassName: 'datagrid--header',
      }));
      return [
        ...cols,
        {
          field: 'actions',
          headerName: 'Actions',
          width: 150,
          renderCell: params => (
            <Button
              color="error"
              onClick={() => handleDeleteHotel(params.row.id)}
              startIcon={<DeleteIcon />}
              variant="text">
              Delete
            </Button>
          ),
        },
      ];
    }

    return [];
  }, [data]);

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Hotels
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Button onClick={() => setOpenAddHotelModal(true)} variant="contained" color="primary">
        Add Hotel
      </Button>

      {openAddHotelModal && (
        <CustomModal
          open={openAddHotelModal}
          onClose={() => setOpenAddHotelModal(false)}
          title="Add a new Hotel">
          <AddHotelForm onSubmit={handleAddHotel} />
        </CustomModal>
      )}

      <GlobalDataGrid
        onUpdate={handleUpdateHotel}
        rows={data ? data : []}
        columns={columns}
        loading={isLoading}
        totalRowCount={!isLoading ? data?.length || 0 : 0}
      />
    </Container>
  );
};

export default AdminHotels;
