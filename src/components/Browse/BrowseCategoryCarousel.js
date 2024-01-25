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
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 5,
    partialVisibilityGutter: 40
  },

  mobile: {
    breakpoint: {
      max: 464,
      min: 0
    },
    items: 3,
    partialVisibilityGutter: 40
  },

  smallest: {
    breakpoint: {
      max: 380,
      min: 0
    },
    items: 2,
    partialVisibilityGutter: 40
  },

  tablet: {
    breakpoint: {
      max: 1024,
      min: 720,
    },
    items: 5,
    partialVisibilityGutter: 30
  }
}

function BrowseCategoryCarousel({ handleCategoryFilter, categoryFilter }) {
  const theme = useTheme()
  return (
    <Box sx={{ padding: '10px' }}>
      <MultiCarousel
        initialSlide={5}
        keyBoardControl
        partialVisible
        responsive={responsive}
        swipeable
        infinite
        removeArrowOnDeviceType={['tablet', 'mobile', 'smallest']}
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
                  width: {xs:'18vw', sm: '100px', md: '150px'},
                  height: {xs:'18vw', sm:'100px', md: '150px'},
                  backgroundColor: '#211E34',
                  padding:'10px',
                  borderRadius:'4px',
                  border:
                    categoryFilter === category.label ? ' 1px solid' : 'none',
                  borderColor: 'white',
                }}
              />
            </Button>
            <Typography
              variant="small"
              sx={{
                fontSize: {md: '0.85em'},
                textAlign: 'center',
                marginTop: '0!important',
                padding: '5px 0',
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
