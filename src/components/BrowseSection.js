import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Section from './Section'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@mui/material/Paper'

function BrowseSection(props) {
  const [showSearchBar, setShowSearchBar] = useState(false)
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Box mt={2}>
        <Container>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <Box sx={{ paddingBottom: 7 }}>
              <Typography variant="h4">Browse</Typography>
            </Box>
            <IconButton onClick={() => setShowSearchBar(!showSearchBar)}>
              {showSearchBar ? (
                <CloseIcon fontSize="large" />
              ) : (
                <SearchIcon fontSize="large" />
              )}
            </IconButton>
          </Box>
          {showSearchBar && (
            <Paper>
              <Box sx={{ padding: 10 }}>
                <SearchBar />
              </Box>
            </Paper>
          )}
        </Container>
      </Box>
    </Section>
  )
}

const SearchBar = ({ setSearchQuery }) => (
  <OutlinedInput
    id="search-bar"
    onInput={(e) => {
      setSearchQuery(e.target.value)
    }}
    variant="outlined"
    placeholder="Search..."
    size="small"
    fullWidth
    endAdornment={
      <InputAdornment>
        <SearchIcon color="primary" fontSize="medium" />
      </InputAdornment>
    }
    sx={{ '.MuiOutlinedInput--root': { color: 'blue' } }}
  />
)

export default BrowseSection
