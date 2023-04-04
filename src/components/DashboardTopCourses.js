import React from 'react'
import MultiCarousel from 'react-multi-carousel'
import Box from '@material-ui/core/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import CardActionArea from '@mui/material/CardActionArea'
import useClasses from '../hooks/useClasses'
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
  },
}

const DashboardTopCourses = ({ title, courses, icon }) => {
  const classes = useClasses(styles)

  return (
    <>
      <Box sx={{ padding: '20px 0', paddingBottom: '20px' }}>
        <Stack direction="row" spacing={1}>
          {icon}
          <Box
            sx={{
              paddingTop: '7.5px',
            }}
          >
            <Typography variant="h5">{title}</Typography>
          </Box>
        </Stack>
      </Box>
      <MultiCarousel
        ssr
        partialVisible={true}
        responsive={responsive}
        swipeable
        itemClass={classes.carouselItem}
      >
        {courses.map((item, i) => {
          return (
            <Card
              key={i}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '15px',
                height: '375px',
                backgroundColor: '#413F4C !important',
                borderRadius: '6px',
              }}
            >
              <CardActionArea
                sx={{
                  height: '100%',
                }}
                href={'/course/' + item.uid}
              >
                <CardMedia
                  component="img"
                  alt={`${item.seriesName}-course`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    height: '200px',
                    overflow: 'hidden',
                    borderRadius: '6px',
                  }}
                  image={item.thumbnail[0]?.downloadURL}
                />
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px 0',
                    color: 'white',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Typography variant="h5">
                    <b>{item.seriesName} </b>
                  </Typography>

                  <Typography variant="h5">{item.creator}</Typography>
                  <Typography variant="h5">Materials Required</Typography>
                  {/* <Box>
                  <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    href={'/course/' + item.uid}
                  >
                    See details
                  </Button>
                </Box> */}
                </CardContent>
              </CardActionArea>
            </Card>
          )
        })}
      </MultiCarousel>
    </>
  )
}

export default DashboardTopCourses
