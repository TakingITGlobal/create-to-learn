import React, { useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import MultiCarousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

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

function BrowseCategoryCarousel({ handleCategoryFilter, categoryFilter }) {
  const classes = useClasses(styles)

  return (
    <Box sx={{ padding: '10px 0' }}>
      <MultiCarousel
        initialSlide={5}
        keyBoardControl
        partialVisible
        responsive={responsive}
        swipeable
        infinite
        itemClass={classes.carouselItem}
        removeArrowOnDeviceType={['tablet', 'mobile']}
        additionalTransfrom={0}
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
                    categoryFilter === category.label ? ' 1px solid' : 'none',
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
  )
}

export default BrowseCategoryCarousel
