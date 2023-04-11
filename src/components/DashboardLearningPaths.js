import React from 'react'
import useClasses from '../hooks/useClasses'
import Box from '@material-ui/core/Box'
import Typography from '@mui/material/Typography'
import MultiCarousel from 'react-multi-carousel'
import { Button, Paper } from '@material-ui/core'
import 'react-multi-carousel/lib/styles.css'

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
    partialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 40,
    slidesToSlide: 1,
  },
}

const DashboardLearningPaths = ({ learningPaths }) => {
  const classes = useClasses(styles)

  return (
    <>
      <Box sx={{ paddingBottom: 5 }}>
        <Typography>Learning paths for students</Typography>
      </Box>
      <MultiCarousel
        ssr
        partialVisible={true}
        responsive={responsive}
        swipeable
        itemClass={classes.carouselItem}
      >
        {learningPaths.map((item, i) => (
          <Paper
            key={i}
            sx={{
              padding: 10,
              height: '250px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ padding: 10 }}>
              <Box>
                <h2>{item.name}</h2>
                <p>Throughout this unit ...</p>
                {item.seriesInPath.length > 0 && (
                  <p> Time Series: {item.seriesInPath.join()}</p>
                )}
              </Box>
              <Box>
                <Button color="primary" fullWidth variant="contained">
                  See details
                </Button>
              </Box>
            </Box>
          </Paper>
        ))}
      </MultiCarousel>
    </>
  )
}

export default DashboardLearningPaths
