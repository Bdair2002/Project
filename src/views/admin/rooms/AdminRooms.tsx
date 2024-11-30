import React, { useState, useMemo } from 'react';
import {
  useFetchRoomsQuery,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useAddRoomMutation,
} from '../../../redux/slices/adminSlices/roomsSlice';
import { useFetchHotelsQuery } from '../../../redux/slices/adminSlices/hotelsSlice';
import { GridColDef } from '@mui/x-data-grid';
import {
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
} from '@mui/material';
import AddRoomForm from './components/AddRoomForm';
import CustomModal from '../../../components/shared/Modal';
import GlobalDataGrid from '../../../components/shared/DataGrid';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import useSnackbar from '../../../hooks/useSnackbar';
const AdminRooms = () => {
  const snackBar = useSnackbar();
  const [openAddRoomModal, setOpenAddRoomModal] = useState<boolean>(false);
  const [selectedHotelId, setSelectedHotelId] = useState<number>(0);
  const { data: hotels, isLoading: isHotelsLoading } = useFetchHotelsQuery();
  const { data: rooms, isLoading: isRoomsLoading } = useFetchRoomsQuery(Number(selectedHotelId), {
    skip: !selectedHotelId,
  });

  const [addRoom] = useAddRoomMutation();
  const [updateRoom] = useUpdateRoomMutation();
  const [deleteRoom] = useDeleteRoomMutation();

  const columns: GridColDef[] = useMemo(() => {
    let generatedColumns: GridColDef[] = [];
    if (!isRoomsLoading && rooms && rooms.length > 0) {
      const keys = Object.keys(rooms[0]);

      generatedColumns = keys.map(key => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: 200,
        editable: key !== 'id',
        headerClassName: 'cool-header',

        ...(key === 'available' && {
          renderCell: params =>
            params.value ? <CheckIcon color="success" /> : <ClearIcon color="error" />,
        }),

        ...(key === 'amenities' && {
          renderCell: params =>
            params.value
              ? params.value.map((amenity: { name: string }) => amenity.name).join(', ')
              : 'No amenities',
        }),
      }));
    }
    return [
      ...generatedColumns,
      {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: params => (
          <Button
            color="error"
            onClick={() => handleDeleteRoom(params.row.roomId)}
            startIcon={<DeleteIcon />}
            variant="text">
            Delete
          </Button>
        ),
      },
    ];
  }, [rooms, isRoomsLoading]);

  const handleAddRoom = async (values: Record<string, unknown>) => {
    setOpenAddRoomModal(false);
    try {
      await addRoom({ hotelId: selectedHotelId, body: values }).unwrap();
      snackBar.showSnackBar({
        message: 'Room Added Successfully!',
        title: 'Success',
        severity: 'success',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    } catch (error) {
      snackBar.showSnackBar({
        message: 'Failed to add room',
        title: 'Failed',
        severity: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  };

  const handleDeleteRoom = async (roomId: number) => {
    try {
      await deleteRoom({ roomId }).unwrap();
      snackBar.showSnackBar({
        message: 'Room Deleted Successfully!',
        title: 'Success',
        severity: 'success',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    } catch (error) {
      snackBar.showSnackBar({
        message: 'Failed to delete room',
        title: 'Failed',
        severity: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  };

  const handleUpdateRoom = async ({ id, body }: { id: number; body: Record<string, unknown> }) => {
    try {
      await updateRoom({ id, body }).unwrap();
      snackBar.showSnackBar({
        message: 'Room Updated Successfully!',
        title: 'Success',
        severity: 'success',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    } catch (error) {
      snackBar.showSnackBar({
        message: 'Failed to update room',
        title: 'Failed',
        severity: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  };
  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Rooms
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ width: '100%' }}>
          <Button onClick={() => setOpenAddRoomModal(true)} variant="contained" color="primary">
            Add Room
          </Button>
        </Box>
        <FormControl fullWidth margin="normal">
          <InputLabel>Hotel</InputLabel>
          <Select
            value={selectedHotelId}
            onChange={e => setSelectedHotelId(Number(e.target.value))}
            label="Hotel">
            {!isHotelsLoading && hotels
              ? hotels.map(hotel => (
                  <MenuItem key={hotel.id} value={hotel.id}>
                    {hotel.name}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
      </Box>
      {openAddRoomModal && (
        <CustomModal
          open={openAddRoomModal}
          onClose={() => setOpenAddRoomModal(false)}
          title="Add a new Room">
          <AddRoomForm onSubmit={handleAddRoom} />
        </CustomModal>
      )}

      <GlobalDataGrid
        rows={rooms || []}
        columns={columns}
        loading={isRoomsLoading}
        totalRowCount={!isRoomsLoading ? rooms?.length || 0 : 0}
        onUpdate={handleUpdateRoom}
      />
    </Container>
  );
};

export default AdminRooms;
