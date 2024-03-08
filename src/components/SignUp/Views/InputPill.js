import React, { useEffect, useState } from 'react'
import TitleSection from './TitleSection'
import { Grid, Box, Chip } from '@mui/material'
import { useData } from 'util/signupProvider'

export default function InputPillView(props) {
  const { options, value } = props
  const { updateData } = useData();

  const [selected, setSelected] = useState([])

  useEffect(() => {
    updateData(value, selected);
  }, [value, selected, updateData]);

  const handleSelectedChange = (val) => {
    let arr
    if (!selected.includes(val)) {
      arr = [...selected, val];
      setSelected(arr);
    } else {
      arr = selected.filter((x) => x !== val);
      setSelected(arr);
    }
  }
  return (
    <Box>
      <TitleSection value={value} />
      <Grid
        container
        sx={{
          gap: '10px',
          justifyContent: 'flex-start',
          marginTop: '2em',
          padding: '1.5em',
        }}
      >
        {options?.map((val, i) => {
          const active = selected.includes(val);
          return (
          <Box as="div" key={i}>
            <Chip
              key={i}
              label={val}
              clickable
              style={{
                fontSize: 16,
                marginLeft: 0,
                backgroundColor: active ? '#6956F1' : '#211E34',
                fontWeight: active ? '700' : '',
                padding: '16px !important',
              }}
              onClick={() => handleSelectedChange(val)}
              variant="default"
              disabled={selected.length >= 3 && !active}
            />
          </Box>
        )})}
      </Grid>
    </Box>
  )
}
