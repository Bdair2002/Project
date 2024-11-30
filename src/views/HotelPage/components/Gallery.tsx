import React from 'react';
import { Box } from '@mui/material';
import useHotel from '../../../hooks/useHotel';
import Grid from '@mui/material/Grid2';
import GalleryItem from './GalleryItem';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import lgAutoPlay from 'lightgallery/plugins/autoplay';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import LightGallery from 'lightgallery/react';
import '../../../styles/gallery.css';
import useMediaQuery from '../../../hooks/useMediaQuery';
import Skeleton from '../../../components/shared/Skeleton';
type GalleryProps = {
  hotelId: number;
};

const Gallery = ({ hotelId }: GalleryProps) => {
  const { isMobile } = useMediaQuery();
  const hotel = useHotel(hotelId);
  if (hotel.availableRooms_status === 'loading')
    return (
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Skeleton contentLines={0} actionsHeight={0} showActions={false} mediaHeight={200} />
        </Grid>

        <Grid container size={{ xs: 12, sm: 6, md: 6 }}>
          {[...Array(4)].map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 6 }}>
              <Skeleton contentLines={0} actionsHeight={0} showActions={false} mediaHeight={100} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  return (
    <Box sx={{ position: 'relative' }}>
      <LightGallery elementClassNames="grid" plugins={[lgThumbnail, lgAutoPlay]}>
        {hotel.gallery.map((photo, index) => (
          <GalleryItem key={photo.id} index={index} photo={photo} photosShown={isMobile ? 2 : 4} />
        ))}
      </LightGallery>
    </Box>
  );
};

export default Gallery;
