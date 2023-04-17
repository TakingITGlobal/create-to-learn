import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

import { useTranslation } from 'react-i18next'

const BrowseSearchBar = ({ setSearch, search }) => {
  const { t } = useTranslation()

  return (
    <OutlinedInput
      id="search-bar"
      onInput={(e) => {
        setSearch(e.target.value.toLowerCase())
      }}
      value={search}
      variant="outlined"
      placeholder={t('browse.search-by')}
      size="small"
      fullWidth
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon color="primary" fontSize="medium" />
        </InputAdornment>
      }
      inputProps={{
        style: { color: 'white' },
      }}
    />
  )
}

export default BrowseSearchBar
