import React, { useCallback, useMemo } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { memo } from 'react';
import { Box, Button, InputAdornment, Paper, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Guests from './components/guests';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import useSearchFilters from '../../../hooks/useSearchFilters';
import * as yup from 'yup';

const validationSchema = yup.object({
  checkIn: yup.date().required('Check-in date is required'),
  checkOut: yup.date().required('Check-out date is required'),
  adults: yup.number().min(1).required('Adults is required'),
  children: yup.number().min(0).required('Children is required'),
  rooms: yup.number().min(1).required('Rooms is required'),
});

type initialValuesType = {
  cityName: string;
  checkIn: dayjs.Dayjs;
  checkOut: dayjs.Dayjs;
  adults: number;
  children: number;
  rooms: number;
};
const SearchBox = () => {
  const navigate = useNavigate();
  const searchFilter = useSearchFilters();

  const formik = useFormik({
    initialValues: {
      cityName: '',
      checkIn: dayjs(),
      checkOut: dayjs().add(1, 'day'),
      adults: 2,
      children: 0,
      rooms: 1,
    },
    validationSchema: validationSchema,
    onSubmit: useMemo(
      () => (values: initialValuesType) => {
        const { cityName, checkIn, checkOut, adults, children, rooms } = values;
        const checkInDate = checkIn.format('YYYY-MM-DD');
        const checkOutDate = checkOut.format('YYYY-MM-DD');
        searchFilter.searchHotels({
          cityName,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          adults,
          children,
          rooms,
        });
        navigate('/search');
      },
      [searchFilter, navigate],
    ),
  });

  const handleCityChange = useCallback(
    (name: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      formik.setFieldValue(name, event.target.value);
    },
    [formik],
  );

  const handleDateChange = useCallback(
    (name: string, date: dayjs.Dayjs | null) => {
      formik.setFieldValue(name, date);
    },
    [formik],
  );

  const hanldeCountChange = useCallback(
    (name: string, count: number) => {
      formik.setFieldValue(name, count);
    },
    [formik],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={formik.handleSubmit}>
        <Box
          position="relative"
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'space-between',
            p: 2,
            mx: 'auto',
            marginBottom: '2rem',
          }}>
          <Box
            component={Paper}
            sx={{
              backgroundColor: 'transparent',
              p: 2,
              gap: 1,
              display: 'flex',
              alignItems: 'center',
            }}
            flexDirection={{ xs: 'column', md: 'row' }}>
            <Box width={{ xs: '100%', md: '25%' }}>
              <TextField
                id="cityName"
                placeholder="Search for hotels, cities..."
                variant="outlined"
                fullWidth
                sx={{
                  minWidth: 215,
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                value={formik.values.cityName}
                onChange={event => handleCityChange('cityName', event)}
              />
            </Box>
            <Box width={{ xs: '100%', md: '35%' }} display="flex" gap={1}>
              <DatePicker
                sx={{ width: '50%' }}
                label="Check-in"
                defaultValue={dayjs()}
                minDate={dayjs()}
                value={formik.values.checkIn}
                onChange={e => handleDateChange('checkIn', e)}
              />
              <DatePicker
                sx={{ width: '50%' }}
                label="Check-out"
                defaultValue={dayjs().add(1, 'day')}
                minDate={dayjs().add(1, 'day')}
                value={formik.values.checkOut}
                onChange={e => handleDateChange('checkOut', e)}
              />
            </Box>
            <Box width={{ xs: '100%', md: '25%', height: '100%' }}>
              <Guests
                onCountChange={hanldeCountChange}
                guests={{
                  adults: formik.values.adults,
                  children: formik.values.children,
                  rooms: formik.values.rooms,
                }}
              />
            </Box>
            <Box width={{ xs: '100%', md: '15%', height: '100%' }}>
              <Button
                disableElevation
                type="submit"
                variant="contained"
                fullWidth
                sx={{ fontWeight: 'bold', fontSize: '16px', height: '100%' }}>
                Search
              </Button>
            </Box>
          </Box>
          <Button variant="outlined" onClick={() => navigate('/hotels')}>
            View All Hotels
          </Button>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default memo(SearchBox);
