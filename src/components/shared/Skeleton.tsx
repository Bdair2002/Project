import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Skeleton, Box, Stack } from '@mui/material';

interface GlobalCardSkeletonProps {
  mediaHeight?: number;
  contentLines?: number;
  showActions?: boolean;
  actionsHeight?: number;
}

const GlobalCardSkeleton: React.FC<GlobalCardSkeletonProps> = ({
  mediaHeight = 200,
  contentLines = 3,
  showActions = true,
  actionsHeight = 40,
}) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '8px',
        padding: '16px',
        height: '100%',
      }}>
      <Card
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}>
        <Skeleton variant="rectangular" width="100%" height={mediaHeight} />

        <CardContent sx={{ flexGrow: 1 }}>
          <Stack spacing={1}>
            {Array.from({ length: contentLines }).map((_, index) => (
              <Skeleton key={index} variant="text" width={`${100 - index * 10}%`} />
            ))}
          </Stack>
        </CardContent>

        {showActions && (
          <CardActions sx={{ justifyContent: 'center', mt: 'auto', pb: 2 }}>
            <Skeleton variant="rectangular" width="60%" height={actionsHeight} />
          </CardActions>
        )}
      </Card>
    </Box>
  );
};

export default GlobalCardSkeleton;
