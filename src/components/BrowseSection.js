import React, { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Section from './Section'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import BrowseSearchBar from './BrowseSearchBar'
import BrowseTabs from './BrowseTabs'
import BrowseSearchEmptyState from './BrowseSearchEmptyState'
import BrowseCourseCard from './BrowseCourseCard'
import BrowseCreatorCard from './BrowseCreatorCard'
import Stack from '@mui/material/Stack'
import MultiCarousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { useTranslation } from 'react-i18next'
import useClasses from '../hooks/useClasses'
import { categories } from '../assets/options/categories'
import { useSearchFilter } from '../hooks/useSearchFilter'

const styles = (theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
  carouselItem: {
    paddingRight: '20px',
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
    partialVisibilityGutter: 15,
  },
}

function BrowseSection(props) {
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [durationFilter, setDurationFilter] = useState([])
  const [culturalGroupFilter, setCulturalGroupFilter] = useState([])

  const { t } = useTranslation()
  const classes = useClasses(styles)

  const { filterCourses, filterCreators } = useSearchFilter({
    search,
  })

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
                  <Button
                    onClick={() => setCategoryFilter(category.label)}
                    sx={{
                      border:
                        categoryFilter === category.label ? 'solid' : 'none',
                      borderColor: 'white',
                      padding: '0 5px',
                    }}
                  >
                    {category.illustration}
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
              <BrowseSearchBar
                setSearch={setSearch}
                search={search}
                setOpenSearchDrawer={setOpenSearchDrawer}
              />
            </Box>
            {search !== '' ? (
              <Box sx={{ padding: '0 20px' }}>
                {filterCourses?.length || filterCreators?.length ? (
                  <Box>
                    {filterCreators.map((creator, index) => (
                      <BrowseCreatorCard key={index} creator={creator} />
                    ))}
                    {filterCourses.map((course, index) => (
                      <BrowseCourseCard key={index} course={course} />
                    ))}
                  </Box>
                ) : (
                  <BrowseSearchEmptyState search={search} />
                )}
              </Box>
            ) : null}
          </SwipeableDrawer>
        </Container>
      </Box>
    </Section>
  )
}

export default BrowseSection
