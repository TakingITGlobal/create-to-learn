import React, { useState } from 'react'
import { styles } from './Styles'
import useClasses from 'hooks/useClasses'
import TitleSection from './TitleSection'
import { Box, Grid, TextField } from '@mui/material'


export default function InputTextView({ value }) {
  const classes = useClasses(styles)
  const [data, setData] = useState('')

  function onChange(e) {
    const val = e.target.value
    setData(val)
    localStorage.setItem(value, val)
  }

  return (
    <Box>
      <TitleSection value={value} />
      <Grid
        container
        item
        className={classes.gridColumn}
        onChange={onChange}
        sx={{ padding: '1.5em' }}
      >
        <TextField variant="outlined" fullWidth />
      </Grid>
    </Box>
  )
}