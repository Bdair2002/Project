import { FC } from 'react';

type MapProps = {
  latitude: number;
  longitude: number;
};
const Map: FC<MapProps> = ({ latitude, longitude }) => {
  const src = `https://www.google.com/maps?q=${latitude},${longitude}&hl=en;z=14&output=embed`;
  return (
    <iframe
      style={{
        border: '1px solid #ccc',
      }}
      title="Google Map"
      width="100%"
      height="350"
      src={src}
      loading="lazy"
    />
  );
};

export default Map;
