import React from 'react'
import MultiCarousel from 'react-multi-carousel'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'

import useClasses from '../hooks/useClasses'
import 'react-multi-carousel/lib/styles.css'
import { useTranslation } from 'react-i18next'
import MessageIcon from '@mui/icons-material/Message'
import MessageFromCreatorsIcon from '../assets/images/A-message-from-your-creatives.svg'

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

const DashboardCreatorsMessage = ({ creators }) => {
  const classes = useClasses(styles)

  const { t } = useTranslation()

  return creators.length ? (
    <>
      <Box sx={{ padding: '20px 0', paddingBottom: '20px' }}>
        <Stack direction="row" spacing={1}>
          <SvgIcon fontSize="large" component="div">
            <img
              src={MessageFromCreatorsIcon}
              alt="message-from-creators-icon"
              style={{ paddingBottom: '5px' }}
            />
          </SvgIcon>
          <Box
            sx={{
              paddingTop: '7.5px',
            }}
          >
            <Typography variant="h5">
              {t('dashboard.creators-message')}
            </Typography>
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
        {creators?.map((creator, i) => {
          return (
            <Card
              key={i}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '15px',
                height: '425px',
                backgroundColor: `${
                  i === 0 ? '#B173EE !important' : '#FFC14C !important'
                }`,
                borderRadius: '24px !important',
              }}
            >
              <CardMedia
                component="img"
                alt={`${creator.seriesName}-course`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '150px',
                  height: '150px',
                  borderRadius: '24px',
                  objectFit: 'cover',
                }}
                image={
                  creator && creator.image && creator.image.length
                    ? creator.image[0].downloadURL
                    : ''
                }
              />
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '20px 0',
                  justifyContent: 'flex-end',
                }}
              >
                <Typography variant="h5">
                  "{creator.messageFromCreator}"
                </Typography>
                <CardActions>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      color: 'black',
                      borderColor: 'black',
                      borderRadius: '20px',
                    }}
                    //Make this better
                    href={
                      '/course/' +
                      creator.seriesName
                        .trim()
                        .replace("'", '')
                        .replace(/\s+/g, '-')
                        .toLowerCase()
                    }
                  >
                    See {creator.name.split(' ')[0]}'s Course
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          )
        })}
      </MultiCarousel>
    </>
  ) : null
}

export default DashboardCreatorsMessage
