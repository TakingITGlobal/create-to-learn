import React, { useState } from 'react'
import { styles } from './Styles'
import useClasses from 'hooks/useClasses'
import TitleSection from './TitleSection'
import { Box, Button, Grid } from '@mui/material'
import { Check } from '@mui/icons-material'
import classNames from 'classnames'

export default function InputSelectView(props) {
  const { value, options } = props
  const classes = useClasses(styles)
  const [data, setData] = useState([])

  const cols = props.cols ? props.cols : 1

  function onChange(e) {
    let arr
    if (!data.includes(e.target.value)) {
      arr = [...data, e.target.value]
      setData(arr)
    } else {
      arr = data.filter((x) => x !== e.target.value)
      setData(arr)
    }
    localStorage.setItem(value, arr)
  }
  
  return (
    <Box>
      <TitleSection value={value} />
      <Grid
        container
        sx={{
          gap: '10px',
          padding: '1em',
        }}
      >
        {options?.map((val, i) => {
          const isActive = data.includes(val);
          return (
            <Box
              as="div"
              key={i}
              className={classes.btnInput}
              sx={{
                flex: `0 1 calc(calc(100% / ${cols}) - (10px * ${cols - 1}))`,
              }}
            >
              <input
                onChange={onChange}
                type="checkbox"
                value={val}
                name={value}
                id={val}
                hidden
              />
              <Button
                variant="multi-selection"
                component="label"
                fullWidth
                htmlFor={val}
                className={classNames({ 'active': isActive})}
              >
                {val}
                {isActive ? <Check /> : null}
              </Button>
            </Box>
          )})}
      </Grid>
    </Box>
  )
}

