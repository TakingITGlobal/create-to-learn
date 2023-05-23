import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import BrowseTabs from './BrowseTabs'
import Section from '../Section'
import BrowseSearchDrawer from './BrowseSearchDrawer'
import BrowseCategoryCarousel from './BrowseCategoryCarousel'

import 'react-multi-carousel/lib/styles.css'
import { useTranslation } from 'react-i18next'

function BrowseSection(props) {
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('All')

  const { t } = useTranslation()

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category)
  }

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container sx={{ paddingBottom: '60px' }}>
        <Box
          sx={{
            paddingTop: '40px',
            paddingBottom: '7px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h1">{t('browse.browse')}</Typography>

          <IconButton onClick={() => setOpenSearchDrawer(true)}>
            <SearchIcon fontSize="large" />
          </IconButton>
        </Box>
        <BrowseCategoryCarousel
          handleCategoryFilter={handleCategoryFilter}
          categoryFilter={categoryFilter}
        />
        <BrowseTabs
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
        <BrowseSearchDrawer
          openSearchDrawer={openSearchDrawer}
          setOpenSearchDrawer={setOpenSearchDrawer}
        />
      </Container>
    </Section>
  )
}

export default BrowseSection
