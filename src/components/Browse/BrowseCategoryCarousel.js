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
    slidesToSlide: 5,
    partialVisibilityGutter: 40
  },

  mobile: {
    breakpoint: {
      max: 464,
      min: 0
    },
    items: 3.75,
    slidesToSlide: 3,
    partialVisibilityGutter: 0
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
    slidesToSlide: 5,
    partialVisibilityGutter: 30
  }
}

function BrowseCategoryCarousel({ handleCategoryFilter, categoryFilter }) {
  const theme = useTheme()
  return (
    <Box sx={{ overflow:'hidden' }}>
      <Box sx={{ padding: '10px 0', margin: '0px -26px 0 -10px' }}>
        <MultiCarousel
          keyBoardControl
          partialVisible
          responsive={responsive}
          removeArrowOnDeviceType={[ 'mobile', 'smallest']}
          additionalTransfrom={0}
          customTransition="linear .25"
          ssr 

        >
          {categories.map((category, index) => (
            <Stack direction="column" spacing={2} key={index}>
              <Button onClick={() => handleCategoryFilter(category.label)} sx={{display:'block', padding:'0 10px', textAlign: 'left'}}>
                <Box
                  component="img"
                  src={category.illustration}
                  alt={category}
                  sx={{
                    display: 'flex',
                    width: {xs:'100%', sm: '100%', md: '8vw'},
                    height: {xs: 'auto', sm:'100%', md: '8vw'},
                    backgroundColor: '#211E34',
                    padding:'0',
                    borderRadius:'4px',
                    border:
                      categoryFilter === category.label ? ' 1px solid' : 'none',
                    borderColor: 'white',
                  }}
                />
                <Typography
                  variant="small"
                  sx={{
                    fontSize: {md: '0.85em'},
                    textAlign: 'center',
                    padding: '5px 0',
                    lineHeight: '1.1em',
                    color:  categoryFilter === category.label ? theme.palette.text.primary : theme.palette.text.secondary,
                  }}
                >
                  {category.label}
                </Typography>
              </Button>
            </Stack>
          ))}
        </MultiCarousel>
      </Box>
    </Box>  
  )
}

export default BrowseCategoryCarousel
