import React, { useState } from 'react'
import { styles } from './Styles'
import useClasses from 'hooks/useClasses'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid, Stack, TextField } from '@mui/material'
import { FixedSizeList as List } from 'react-window'
import { Check } from '@mui/icons-material'
import TitleSection from './TitleSection'
import Typography from '@mui/material/Typography'

export default function InputSearchView(props) {
  const { value, options } = props

  const classes = useClasses(styles)
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('');

  const filtered = inputValue !== '' ? 
    [...options.filter((x) =>
      x.toLowerCase().includes(inputValue.toLowerCase()),),'other'] 
    : []

  const [selected, setSelected] = useState('')

  function onInputChange(e) {
    let val = e.target.value;
    if(val.length > 2 ) setInputValue(e.target.value);
    else {
      setInputValue('');
    }
    
  }
  function onChange(e) {
    const val = e.target.value
    setSelected(e.target.value)
    localStorage.setItem(value, val)
  }
  const Row = ({ data, index, style, e }) => {
    const isLast = data.length - 1 === index;
    const isActive = data[index] === selected;
    return (
      <div style={style}>
        <input
          onChange={onChange}
          type="radio"
          value={data[index]}
          name={value}
          id={data[index]}
          hidden
        />
        <Button
          variant="multi-selection"
          component="label"
          htmlFor={data[index]}
          size="small"
          fullWidth
          className={isActive ? 'active' : ''}
          sx={{ marginBottom: '5px', height: 76, padding: '1rem' }}
        >
          {isLast ? t('btn.missing', { value: value }) : data[index]}
          <Check />
        </Button>
      </div>
    )
  }
  return (
    <>
      <TitleSection value={value} />
      <Box sx={{ marginBottom: '1.5em', display: 'flex', flexDirection: 'column', gap: 2, padding: '0 1.5em' }}>
        <Stack direction="column">
          {selected.length > 0 ? (
            <Typography color={'#a095ff'}>{selected}</Typography>
          ) :
          (
            <span style={{height: 76}}/>
          )
        }
        </Stack>

        <TextField variant="outlined" onChange={onInputChange} fullWidth />

        <Grid className={classes.gridColumn}>
          <Grid className={classes.scrollBox}>
            {/* <Box sx={{ padding: '10px 0' }}>
              <input
                type="radio"
                value="other"
                id="other"
                name={value}
                hidden
                onChange={onChange}
              />
              <Button
                variant="selection"
                component="label"
                htmlFor="other"
                size="small"
                fullWidth
              
              >
                {t('btn.missing', { value: value })}
              </Button>
            </Box> */}
            <List
              itemData={filtered}
              itemCount={filtered.length}
              height={420}
              itemSize={84}
              width="100%"
            >
              {Row}
            </List>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}