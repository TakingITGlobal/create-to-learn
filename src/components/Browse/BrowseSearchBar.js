import React from 'react'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'

import { useTranslation } from 'react-i18next'

const BrowseSearchBar = ({ setSearch, search, setOpenSearchDrawer }) => {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '40px 0',
      }}
    >
      <TextField
        onInput={(e) => setSearch(e.target.value)}
        id="filled-start-adornment"
        sx={{ backgroundColor: '#2B2937', borderRadius: '8px' }}
        value={search}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'white' }} fontSize="medium" />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      <Button onClick={() => setOpenSearchDrawer(false)}>{t('cancel')}</Button>
    </Box>
  )
}

export default BrowseSearchBar
