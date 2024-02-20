import React from 'react'
import MultiCarousel from 'react-multi-carousel'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import { useTheme } from '@mui/material/styles'
import EastIcon from '@mui/icons-material/East'

import 'react-multi-carousel/lib/styles.css'
import { useTranslation } from 'react-i18next'
import MessageFromCreatorsIcon from '../../assets/images/A-message-from-your-creatives.svg'

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

const getRandomColor = (array) => {
  const randomColor = array[Math.floor(Math.random() * array.length)]
  return randomColor
}

const DashboardCreatorsMessage = ({ creators }) => {
  const theme = useTheme()
  const palette = Object.values(theme.palette.accent)

  const { t } = useTranslation()

  return creators.length ? (
    <>
      <Typography variant="sectionTitle" pt="20px" pb="20px">
        <SvgIcon fontSize="large" component="div">
          <img
            src={MessageFromCreatorsIcon}
            alt="message-from-creators-icon"
            style={{ paddingBottom: '5px' }}
          />
        </SvgIcon>
        {t('dashboard.creators-message')}
      </Typography>

      <MultiCarousel
        ssr
        // partialVisible={true}
        responsive={responsive}
        swipeable
        style={{
          paddingRight: '20px',
          paddingBottom: '20px',
        }}
      >
        {creators?.map((creator, i) => {
          return (
            <Card
              key={i}
              sx={{
                backgroundColor: getRandomColor(palette),
                margin: '0 10px',
              }}
            >
              <CardMedia
                component="img"
                alt={`${creator.seriesName}-course`}
                sx={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '24px',
                }}
                image={
                  creator && creator.image && creator.image.length > 0
                    ? creator?.image[0].downloadURL
                    : ''
                }
              />
              <CardContent
                sx={{
                  p: '0',
                  pb: '0',
                  pt: theme.spacing(3),
                }}
              >
                <Typography
                  variant="body"
                  sx={{
                    fontSize: '1.5em',
                    lineHeight: '1.3em',
                    fontWeight: '600',
                    hangingPunctuation: 'first last',
                    color: '#000',
                  }}
                >
                  {creator.messageFromCreator}
                </Typography>
                <CardActions
                  sx={{
                    padding: '0',
                    marginTop: '20px',
                  }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: '#000',
                      color: '#000',
                      padding: '0.5em',
                      textAlign: 'center',
                    }}
                    //Make this better
                    href={
                      '/tutorial/' +
                      creator.seriesName
                        .trim()
                        .replace("'", '')
                        .replace(/\s+/g, '-')
                        .toLowerCase()
                    }
                  >
                    See {creator.name.split(' ')[0]}'s Course
                    <EastIcon sx={{ ml: '10px' }} />
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
