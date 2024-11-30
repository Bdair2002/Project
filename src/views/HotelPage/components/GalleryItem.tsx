import { Button } from '@mui/material';
import { PhotoDto } from '../../../api/types';
import AppsIcon from '@mui/icons-material/Apps';
interface Props {
  photo: PhotoDto;
  index: number;
  photosShown: number;
}

const GalleryItem = ({ photo, index, photosShown }: Props) => {
  return (
    <a
      className={`${index === photosShown ? 'last-item' : ''} ${index <= photosShown ? 'show' : 'hide'}`}
      href={photo.url}>
      <img
        className={`gallery-item`}
        src={photo.url}
        alt={`${index + 1}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top',
          filter: `blur(${index == photosShown ? 1 : 0}px)`,
        }}
      />
      {index === photosShown && (
        <Button
          variant="contained"
          sx={{
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            position: 'absolute',
            bottom: '3rem',
            width: 'fit-content',
            right: '2rem',

            zIndex: 1,
          }}>
          <AppsIcon /> Show All Photos
        </Button>
      )}
    </a>
  );
};

export default GalleryItem;
