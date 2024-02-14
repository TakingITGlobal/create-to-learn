import { CardMedia, Stack, Typography } from '@mui/material'
import React from 'react'

export default function WindowView(props) {
  return (
    <Stack
      direction="column"
      spacing={4}
      alignItems="center"
      sx={{ margin: '0 auto' }}
    >
      <CardMedia
        component="img"
        alt=""
        sx={{
          width: '300px',
          height: '300px',
          borderRadius: '24px',
        }}
        image={props.image}
      />
      <Typography sx={{ padding: '1em' }} variant="bold" textAlign="center">
        {props.text}
      </Typography>
    </Stack>
  )
}
