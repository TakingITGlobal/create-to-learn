import React, { useEffect, useState } from 'react'
import { styles } from './Styles'
import useClasses from 'hooks/useClasses'
import TitleSection from './TitleSection'
import { Box, Grid, TextField } from '@mui/material'
import { debounce } from 'lodash';
import { useData } from 'util/signupProvider'

export default function InputTextView({ value }) {
  const classes = useClasses(styles)
  const { updateData } = useData();
  const [text, setText] = useState('')

  useEffect(() => {
    updateData(value, text);
  }, [value, text, updateData])
  const handleChange = debounce((val) => {
    setText(val);
  }, 500);

  return (
    <Box>
      <TitleSection value={value} />
      <Grid
        container
        item
        className={classes.gridColumn}
        onChange={(e) => handleChange(e.target.value)}
        sx={{ padding: '1.5em' }}
      >
        <TextField variant="outlined" fullWidth />
      </Grid>
    </Box>
  )
}