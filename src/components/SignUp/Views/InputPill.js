import React, { useState } from 'react'
import TitleSection from './TitleSection'
import { Grid, Box, Chip } from '@mui/material'

export default function InputPillView(props) {
  const { options, value } = props

  const [data, setData] = useState([])

  function onChange(val) {
    let arr
    if (!data.includes(val)) {
      arr = [...data, val]
      setData(arr)
    } else {
      arr = data.filter((x) => x !== val)
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
          gap: '14px 10px',
          justifyContent: 'flex-start',
          padding: '1.5em',
        }}
      >
        {options?.map((val, i) => (
          <Box as="div" key={i}>
            <Chip
              key={i}
              label={val}
              clickable
              style={{
                fontSize: 15,
                fontWeight: 700,
                marginLeft: 0,
                padding: '18px 8px',

                backgroundColor: data.includes(val) ? '#6956F1' : '#211E34',
              }}
              onClick={() => onChange(val)}
              variant="default"
              disabled={data.length === 3 && !data.includes(val)}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  )
}
