import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Section from './Section'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

import BrowseSearchBar from './BrowseSearchBar'
import BrowseTabs from './BrowseTabs'
import { useTranslation } from 'react-i18next'

function BrowseSection(props) {
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [search, setSearch] = useState('')
  const { t } = useTranslation()

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Box mt={2}>
        <Container>
          <Box sx={{ paddingBottom: '7px' }}>
            <Typography variant="h4">{t('browse.browse')}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'inline-block',
                visibility: showSearchBar ? 'visible' : 'hidden',
                width: '100%',
              }}
            >
              <BrowseSearchBar setSearch={setSearch} search={search} />
            </Box>
            <Box
              sx={{
                display: 'inline-block',
                justifyContent: 'flex-end',
              }}
            >
              <IconButton
                onClick={() => {
                  if (showSearchBar) {
                    setSearch('')
                  }
                  setShowSearchBar(!showSearchBar)
                }}
              >
                {showSearchBar ? (
                  <CloseIcon fontSize="large" />
                ) : (
                  <SearchIcon fontSize="large" />
                )}
              </IconButton>
            </Box>
          </Box>
          <BrowseTabs search={search} />
        </Container>
      </Box>
    </Section>
  )
}

export default BrowseSection
