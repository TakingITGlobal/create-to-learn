import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@mui/material/Typography'
import MultiCarousel from 'react-multi-carousel'
import CircularProgress from '@mui/material/CircularProgress'
import { Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useLearningPaths } from '../util/db'
import 'react-multi-carousel/lib/styles.css'

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
  carouselItem: {
    paddingRight: '20px',
    paddingBottom: '20px',
  },
}))

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

const DashboardLearningPaths = () => {
  const classes = useStyles()
  const [learningPaths, setLearningPaths] = useState([])

  const { isLoading, data } = useLearningPaths()

  useEffect(() => {
    if (!isLoading) {
      setLearningPaths(data)
    }
  }, [data, isLoading])

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Box sx={{ paddingBottom: 5 }}>
        <Typography>Learning paths for students</Typography>
      </Box>
      <MultiCarousel
        ssr
        partialVisible
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
