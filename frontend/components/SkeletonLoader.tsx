import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Stack } from '@mui/material';

const SkeletonLoader = () => {
  return (
    <Stack spacing={1}>
      <Skeleton animation="wave" height={60} />
      <Skeleton animation="wave" height={40} />
      <Skeleton animation="wave" height={60} />
    </Stack>
  );
};
export default SkeletonLoader;
