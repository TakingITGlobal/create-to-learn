import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import MultiCarousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useTheme } from '@mui/material/styles'

import { categories } from '../../assets/options/categories'

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
  const theme = useTheme()
  return (
    <Box sx={{ padding: '10px 0' }}>
      <MultiCarousel
        initialSlide={5}
        keyBoardControl
        partialVisible
        responsive={responsive}
        swipeable
        infinite
        removeArrowOnDeviceType={['tablet', 'mobile']}
        additionalTransfrom={0}
      >
        {categories.map((category, index) => (
          <Stack direction="column" spacing={2} key={index}>
            <Button onClick={() => handleCategoryFilter(category.label)}>
              <Box
                component="img"
                src={category.illustration}
                alt={category}
                sx={{
                  display: 'flex',
                  width: '100px',
                  height: '100px',
                  backgroundColor: '#211E34',
                  padding: '10px',
                  border:
                    categoryFilter === category.label ? ' 1px solid' : 'none',
                  borderColor: 'white',
                }}
              />
            </Button>
            <Typography
              variant="small"
              sx={{
                textAlign: 'center',
                marginTop: '0!important',
                color:  categoryFilter === category.label ? theme.palette.text.primary : theme.palette.text.secondary,
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
