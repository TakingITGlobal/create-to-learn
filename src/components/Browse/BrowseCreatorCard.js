import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import ButtonBase from '@mui/material/ButtonBase'
import CardMedia from '@mui/material/CardMedia'

const BrowseCreatorCard = ({ creator }) => {
  return (
    <ButtonBase
      href={'/creator/' + creator.uid}
      sx={{ alignItems: 'flex-start' }}
    >
      <Stack
        direction="column"
        spacing={1}
        width="100%"
        alignItems="flex-start"
      >
        <CardMedia
          component="img"
          sx={{ height: { xs: '144px', sm: '225px' } }}
          alt={`creator-${creator.name}`}
          src={creator.image && creator.image[0]?.downloadURL}
        />
        <Box>
          <Typography variant="body2">{creator.name} </Typography>
          <Typography variant="subtitle1">{creator.fnmi} </Typography>
        </Box>
      </Stack>
    </ButtonBase>
  )
}

export default BrowseCreatorCard
