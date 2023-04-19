import React from 'react'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import { useTranslation } from 'react-i18next'

const BrowseSearchBar = ({ setSearch, search }) => {
  const { t } = useTranslation()
  console.log(search)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '40px 20px',
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
              <SearchIcon
                sx={{ color: 'white' }}
                color="primary"
                fontSize="medium"
              />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      <Button onClick={() => setSearch('')} sx={{ color: 'white' }}>
        Cancel
      </Button>
    </Box>
  )
}

export default BrowseSearchBar
