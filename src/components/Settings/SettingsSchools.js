import React, { useState, useMemo, useCallback } from 'react'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Slide from '@mui/material/Slide';
import { debounce } from 'lodash';

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import ButtonBase from '@mui/material/ButtonBase'
import Paper from '@mui/material/Paper'
import { FixedSizeList as List } from 'react-window'

import schools from '../../assets/options/schools'

import { updateUser } from '../../util/db'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../util/auth'
import { Stack } from '@mui/material';

function SettingsSchools({ showComponent, setShowComponent }) {
  const { t } = useTranslation()
  const auth = useAuth()
  const schoolData = schools.map((x) => x.School);

  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState(auth?.user?.school || '');
  const filtered = inputValue !== '' ? 
    [...schoolData.filter((x) =>
      x.toLowerCase().includes(inputValue.toLowerCase()),),'other'] 
    : []
 
  const handleTextChange = debounce((val) => {
    if(val.length > 2 ) setInputValue(val);
    else {
      setInputValue('');
    }
  }, 300);

  const handleSelectChange = (val) => {
    if(selected === val){
      setSelected('');
    } else {
      setSelected(val);
    }
    
  }

  const Row = ({ data, index, style, e }) => {
    const isLast = data.length - 1 === index;
    const cur = data[index];
    const active = cur === selected;
    return (
    <div style={style}>
      <ButtonBase
        onClick={() => handleSelectChange(cur)}
        id={cur}
        sx={{ 
          width: '100%', 
          fontSize: 16,
          textAlign: 'left',
          margin: '5px 0',
          padding: '20px',
          width: '100%',
          justifyContent: 'flex-start',
          backgroundColor: active ? '#6956F1' : '#211E34',
          borderRadius: '5px'
        }}
      >
        {isLast ? t('btn.missing', { value: 'school' }) : cur}
      </ButtonBase>
    </div>
  )}

  return (
    showComponent === 'school' && (
      <Slide
        direction="left"
        in={showComponent}
        timeout={500}
        mountOnEnter
        unmountOnExit
      >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '700px',
        }}
      >
        <Box sx={{ padding: '1.5rem 0' }}>
          <h1 variant="h3" fontWeight={700} color={'lavender'} sx={{ padding: '10px 20px 0 0' }}>
            Change School
          </h1>
          <Typography>Scroll or search to find your school </Typography>
          <Stack direction="column" 
            sx={{ 
              width: '100%', 
              fontSize: 16,
              textAlign: 'left',
              margin: '40px 0 40PX',
              padding: '20px',
              width: '100%',
              justifyContent: 'flex-start',
              backgroundColor: '#211E34',
              borderRadius: '5px'
            }}
          >

          <Typography color={'#a095ff'}>{selected || 'None Selected'}</Typography>

          </Stack>

          <TextField
            onChange={(e) => handleTextChange(e.target.value)}
            id="filled-start-adornment"
            sx={{
              borderRadius: '8px',
              width: '100%',
            }}
            label="Search your school"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" fontSize="medium" />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </Box>
        <List
          itemData={filtered}
          itemCount={filtered.length}
          height={450}
          itemSize={84}
          width="100%"
          sx={{textAlign: 'left'}}
        >
          {Row}
        </List>

        <Box
          sx={{
            display: 'flex',
            padding: '1.5rem 0',
            flexGrow: 1,
            alignItems: 'flex-end',
          }}
        >
          <Button
            fullWidth
            color="primary"
            variant="contained"
            sx = {{
              padding: "16px 24px"
            }}
            onClick={() => {
              updateUser(auth.user.uid, { school: selected })
              setShowComponent('nav')
            }}
          >
            {t('settings.update')}
          </Button>
        </Box>
      </Box>
    </Slide>
    )
  )
}

export default SettingsSchools
