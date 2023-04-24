import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import { useTranslation } from 'react-i18next'

const BrowseCreatorCard = ({ creator }) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ padding: '10px 0' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <Box
            component="img"
            src={creator.image && creator.image[0]?.downloadURL}
            width="100px"
          />
        </Grid>
        <Grid item xs={8}>
          <Box>
            <Typography variant="body2">{creator.name} </Typography>
            <Typography variant="body2">tags </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BrowseCreatorCard
