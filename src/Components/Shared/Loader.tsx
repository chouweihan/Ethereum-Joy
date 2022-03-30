import React from 'react'
import { LinearProgress, Box } from '@mui/material'

const Loader = ({ px } : { px?: number }) => {
  return (
    <Box sx={{ width: '100%', ...(px && { pt: px, pb: px}) }}>
      <LinearProgress />
    </Box>
  )
}

export default Loader