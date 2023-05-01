import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import MultiCarousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Paper } from '@mui/material'
import useClasses from '../hooks/useClasses'
import CreatorsSpotlightIcon from '../assets/images/Creator-spotlight.svg'

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
    items: 3,
    partialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    partialVisibilityGutter: 10,
  },
}

const DashboardCreatorSpotlight = ({ creators }) => {
  const classes = useClasses(styles)

  return creators.length ? (
    <>
      <Box sx={{ padding: '20px 0', paddingBottom: '20px' }}>
        <Stack direction="row" spacing={1}>
          <SvgIcon fontSize="large" component="div">
            <img
              src={CreatorsSpotlightIcon}
              alt="creators-spotlight-icon"
              style={{ paddingBottom: '5px' }}
            />
          </SvgIcon>
          <Box
            sx={{
              paddingTop: '7.5px',
            }}
          >
            <Typography variant="h5">Creator Spotlight</Typography>
          </Box>
        </Stack>
      </Box>
      <MultiCarousel
        ssr
        partialVisible
        responsive={responsive}
        swipeable
        itemClass={classes.carouselItem}
      >
        {creators.map((item, i) => {
          return (
            <Paper key={i} sx={{ height: '400px' }}>
              <Box sx={{ height: '228px', objectFit: 'cover' }}>
                <img
                  alt={`creator-${item.name}`}
                  src={
                    item && item.image && item.image.length
                      ? item.image[0].downloadURL
                      : ''
                  }
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: 5,
                  paddingTop: 20,
                  backgroundColor: '#0c0914',
                  color: 'white',
                  lineHeight: 'normal',
                }}
              >
                <Typography variant="h6">
                  <b> {item.name}</b>
                </Typography>
                <Typography variant="h6">{item.community}</Typography>
              </Box>
            </Paper>
          )
        })}
      </MultiCarousel>
    </>
  ) : null
}

export default DashboardCreatorSpotlight
