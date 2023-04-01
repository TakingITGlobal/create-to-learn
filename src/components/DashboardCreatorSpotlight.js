import React from 'react'
import useClasses from '../hooks/useClasses'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import MultiCarousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { Paper } from '@material-ui/core'

const styles = (theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
  carouselItem: {
    paddingRight: '20px',
    paddingBottom: '20px',
  },
})

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 40,
  },
}

const DashboardCreatorSpotlight = ({ creators }) => {
  const classes = useClasses(styles)

  return (
    <>
      <Box sx={{ paddingBottom: 5 }}>
        <Typography>Creator Spotlight</Typography>
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
            <Paper key={i} sx={{ padding: 2.5, height: '400px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  height: '200px',
                  overflow: 'hidden',
                }}
              >
                <img
                  alt={`creator-${item.name}`}
                  src={
                    item && item.image && item.image.length
                      ? item.image[0].downloadURL
                      : ''
                  }
                  style={{
                    top: 0,
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <Box sx={{ padding: 10 }}>
                <h2>{item.seriesName}</h2>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 5,
                  }}
                >
                  <Typography>{item.name}</Typography>
                </Box>
                <Box sx={{ paddingBottom: 5 }}>
                  <Typography>
                    {
                      item.pleaseIncludeAShort23SentenceBioThatWeCanUseWhenPromotingYourContent
                    }
                  </Typography>
                </Box>
                {/* <Box>
                  <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    href={item.webUrl}
                  >
                    See details
                  </Button>
                </Box> */}
              </Box>
            </Paper>
          )
        })}
      </MultiCarousel>
    </>
  )
}

export default DashboardCreatorSpotlight
