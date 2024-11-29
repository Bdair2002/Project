import React from 'react';
import { Typography } from '@mui/material';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <Typography
      variant="h4"
      textAlign="center"
      sx={{
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: 'primary.main',
        marginBottom: 1,
      }}>
      {title}
    </Typography>
  );
};

export default SectionHeader;
