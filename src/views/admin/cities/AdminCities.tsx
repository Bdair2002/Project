import React, { useState } from 'react';

import { useMemo } from 'react';
import {
  useFetchCitiesQuery,
  useUpdateCityMutation,
  useAddCityMutation,
  useDeleteCityMutation,
} from '../../../redux/slices/adminSlices/citiesSlice';
import GlobalDataGrid from '../../../components/shared/DataGrid';
import { GridColDef } from '@mui/x-data-grid';
import { Button, Container, Divider, Typography } from '@mui/material';
import CustomModal from '../../../components/shared/Modal';
import AddCityForm from './components/AddCityForm';
import useSnackbar from '../../../hooks/useSnackbar';
import DeleteIcon from '@mui/icons-material/Delete';
const AdminCities = () => {
  const snackBar = useSnackbar();
  const [openCityModal, setOpenCityModal] = useState<boolean>(false);
  const [deleteCity] = useDeleteCityMutation();
  const { data, isLoading, refetch } = useFetchCitiesQuery();
  const [addCity] = useAddCityMutation();
  const [updateCity] = useUpdateCityMutation();
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
              onClick={() => handleDeleteCity(params.row.id)}
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

  const handleDeleteCity = async (cityId: number) => {
    try {
      await deleteCity({ cityId }).unwrap();

      snackBar.showSnackBar({
        message: 'City Deleted Successfully!',
        title: 'Success',
        severity: 'success',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    } catch (error) {
      snackBar.showSnackBar({
        message: 'Failed to delete city',
        title: 'Failed',
        severity: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  };
  const handleAddCity = async (values: Record<string, unknown>) => {
    setOpenCityModal(false);
    try {
      await addCity({ body: values }).unwrap();
      snackBar.showSnackBar({
        message: 'City Added Successfully!',
        title: 'Success',
        severity: 'success',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
      refetch();
    } catch (error) {
      snackBar.showSnackBar({
        message: 'Failed to add city',
        title: 'Failed',
        severity: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  };
  const handleUpdateCity = async ({ id, body }: { id: number; body: Record<string, unknown> }) => {
    try {
      await updateCity({ id, body }).unwrap();
      snackBar.showSnackBar({
        message: 'City Updated Successfully!',
        title: 'Success',
        severity: 'success',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    } catch (error) {
      snackBar.showSnackBar({
        message: 'Error updating city. Please try again.',
        title: 'Error',
        severity: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Cities
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Button onClick={() => setOpenCityModal(true)} variant="contained" color="primary">
        Add City
      </Button>

      {openCityModal && (
        <CustomModal
          open={openCityModal}
          onClose={() => setOpenCityModal(false)}
          title="Add a new City">
          <AddCityForm onSubmit={handleAddCity} />
        </CustomModal>
      )}

      <GlobalDataGrid
        onUpdate={handleUpdateCity}
        rows={data ? data : []}
        columns={columns}
        loading={isLoading}
        totalRowCount={!isLoading ? data?.length || 0 : 0}
      />
    </Container>
  );
};

export default AdminCities;
