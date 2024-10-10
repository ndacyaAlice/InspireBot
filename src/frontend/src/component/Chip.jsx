import  React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const Chips=({name})=>{
  return (
    <Stack spacing={1} sx={{ alignItems: 'center' }}>
      <Stack direction="row" spacing={1}>
        <Chip label={`Note #${name}`} color="success" />
      </Stack>
    </Stack>
  );
}

export default Chips
