import React from 'react'
import MultiCarousel from 'react-multi-carousel'
import { Typography, Box, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import 'react-multi-carousel/lib/styles.css'

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
    partialVisibilityGutter: 100,
  },
}

const DashboardTopCourses = ({ title, courses, icon }) => {
  const theme = useTheme();

  return courses.length ? (
    <>
      <Typography variant="sectionTitle" pt="20px" pb="20px">
        {icon}
        {title}
      </Typography>

      <MultiCarousel
        ssr
        partialVisible={true}
        responsive={responsive}
        swipeable
      >
        {courses.map((item, i) => {
          return (
            <Card
              key={i}
              sx={{
                height: '315px',
                padding: '0',
                margin: '0 10px'
              }}
            >
              <CardActionArea
                sx={{
                  height: '100%',
                  padding: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  backgroundColor: theme.palette.background.secondary,
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
                    objectFit: 'cover',
                  }}
                  image={item.thumbnail[0]?.downloadURL}
                />
                <CardContent
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: '1'
                  }}
                >
                  <Box componant="div">
                    <Typography component="h3" variant="bold">
                      {item.seriesName}
                    </Typography>
                    <Typography variant="body" component="p">{item.creator}</Typography>
                  </Box>

                  <Typography variant="subtitle1" component="p">Materials Required</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )
        })}
      </MultiCarousel>
    </>
  ) : null
}

export default DashboardTopCourses
