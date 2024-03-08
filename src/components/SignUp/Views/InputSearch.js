import React, { useEffect, useState } from 'react'
import { styles } from './Styles'
import useClasses from 'hooks/useClasses'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid, Stack, TextField } from '@mui/material'
import { FixedSizeList as List } from 'react-window'
import { Check } from '@mui/icons-material'
import { debounce } from 'lodash';
import TitleSection from './TitleSection'
import { useData } from 'util/signupProvider'
import classNames from 'classnames'
import Typography from '@mui/material/Typography'

export default function InputSearchView(props) {
  const { value, options } = props
  const { t } = useTranslation()
  const { updateData } = useData();

  const classes = useClasses(styles)

  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState('');
  const filtered = inputValue !== '' ? 
    [...options.filter((x) =>
      x.toLowerCase().includes(inputValue.toLowerCase()),),'other'] 
    : []

  
  useEffect(() => {
    updateData(value, selected);
  }, [selected, value, updateData]);
 
  const handleTextChange = debounce((val) => {
    if(val.length > 2 ) setInputValue(val);
    else {
      setInputValue('');
    }
  }, 300);

  const handleSelectChange = (val) => {
    setSelected(val);
  }
  
  const Row = ({ data, index, style, e }) => {
    const isLast = data.length - 1 === index;
    const cur = data[index];
    const active = cur === selected;
    
    return (
      <div style={style}>
        <Button
          onClick={() => handleSelectChange(cur)}
          variant="multi-selection"
          id={cur}
          size="small"
          fullWidth
          className={classNames({ 'active': active})}
          sx={{ marginBottom: '5px', height: 76, padding: '1rem' }}
        >
          {isLast ? t('btn.missing', { value: value }) : cur}
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
          {selected ? (
            <Typography color={'#a095ff'}>{selected}</Typography>
          ) :
          (
            <span style={{height: 76}}/>
          )
        }
        </Stack>

        <TextField variant="outlined" onChange={(e) => handleTextChange(e.target.value)} fullWidth />

        <Grid className={classes.gridColumn}>
          <Grid className={classes.scrollBox}>
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