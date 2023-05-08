import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Section from './Section'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import BrowseTabs from './BrowseTabs'
import BrowseSearchDrawer from './BrowseSearchDrawer'
import Stack from '@mui/material/Stack'
import MultiCarousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { useTranslation } from 'react-i18next'
import useClasses from '../hooks/useClasses'
import { categories } from '../assets/options/categories'

const styles = (theme) => ({
  cardContent: {
    padding: '5px',
  },
  carouselItem: {
    padding: '0 20px',
  },
  title: {
    padding: '10px 0',
  },
})

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    partialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    partialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
    partialVisibilityGutter: 10,
  },
}

function BrowseSection(props) {
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState(
    localStorage.getItem('categoryFilter') ?? 'All',
  )
  const [durationFilter, setDurationFilter] = useState(
    JSON.parse(localStorage.getItem('durationFilter') || '[]'),
  )
  const [culturalGroupFilter, setCulturalGroupFilter] = useState(
    JSON.parse(localStorage.getItem('culturalGroupFilter') || '[]'),
  )

  const { t } = useTranslation()
  const classes = useClasses(styles)

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category)
    localStorage.setItem('categoryFilter', JSON.stringify(category))
  }

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
              paddingTop: '40px',
              paddingBottom: '7px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h4">{t('browse.browse')}</Typography>

            <IconButton onClick={() => setOpenSearchDrawer(true)}>
              <SearchIcon sx={{ color: 'white' }} fontSize="large" />
            </IconButton>
          </Box>
          <Box sx={{ padding: '10px 0' }}>
            <MultiCarousel
              ssr
              partialVisible
              responsive={responsive}
              swipeable
              itemClass={classes.carouselItem}
            >
              {categories.map((category, index) => (
                <Stack direction="column" spacing={2} key={index}>
                  <Button onClick={() => handleCategoryFilter(category.label)}>
                    <Box
                      component="img"
                      src={category.illustration}
                      alt="all"
                      sx={{
                        display: 'flex',
                        objectFit: 'cover',
                        border:
                          categoryFilter === category.label
                            ? ' 1px solid'
                            : 'none',
                        borderColor: 'white',
                      }}
                    />
                  </Button>
                  <Typography
                    sx={{
                      fontSize: 12,
                      textAlign: 'center',
                    }}
                  >
                    {category.label}
                  </Typography>
                </Stack>
              ))}
            </MultiCarousel>
          </Box>
          <BrowseTabs
            durationFilter={durationFilter}
            setDurationFilter={setDurationFilter}
            categoryFilter={categoryFilter}
            culturalGroupFilter={culturalGroupFilter}
            setCulturalGroupFilter={setCulturalGroupFilter}
            setCategoryFilter={setCategoryFilter}
          />
          <BrowseSearchDrawer
            openSearchDrawer={openSearchDrawer}
            setOpenSearchDrawer={setOpenSearchDrawer}
          />
        </Container>
      </Box>
    </Section>
  )
}

export default BrowseSection
