import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Section from './Section'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import BrowseSearchBar from './BrowseSearchBar'
import BrowseTabs from './BrowseTabs'
import { useTranslation } from 'react-i18next'

function BrowseSection(props) {
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false)
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
              justifyContent: 'flex-end',
            }}
          >
            <IconButton onClick={() => setOpenSearchDrawer(true)}>
              <SearchIcon sx={{ color: 'white' }} fontSize="large" />
            </IconButton>
          </Box>
          <SwipeableDrawer
            anchor="right"
            open={openSearchDrawer}
            onOpen={(event) => setOpenSearchDrawer(true)}
            onClose={(event) => setOpenSearchDrawer(false)}
          >
            <Box
              sx={{
                display: 'inline-block',
              }}
            >
              <BrowseSearchBar setSearch={setSearch} search={search} />
            </Box>
          </SwipeableDrawer>
          <BrowseTabs search={search} />
        </Container>
      </Box>
    </Section>
  )
}

export default BrowseSection
