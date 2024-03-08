import React from 'react'
import Typography from '@mui/material/Typography'
import SvgIcon from '@mui/material/SvgIcon'
import MultiCarousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import CreatorsSpotlightIcon from '../../assets/images/Creator-spotlight.svg'
import { ChevronRight } from '@mui/icons-material'

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
  return creators.length ? (
    <>
      <Typography variant="sectionTitle" pt="20px" pb="20px">
        <SvgIcon fontSize="large" component="div">
          <img
            src={CreatorsSpotlightIcon}
            alt="creators-spotlight-icon"
            style={{ paddingBottom: '5px' }}
          />
        </SvgIcon>
        Creator Spotlight
      </Typography>

      <MultiCarousel ssr partialVisible responsive={responsive} swipeable>
        {creators.map(({ name, image, community, uid }, i) => {
          return (
            <Card
              key={i}
              raised="false"
              elevation="0"
              sx={{
                padding: '0',
                mr: '15px',
              }}
            >
              <CardActionArea href={'/creator/' + uid}>
                <CardMedia
                  component="img"
                  height="230px"
                  alt={`creator-${name}`}
                  src={image && image.length ? image[0].downloadURL : ''}
                />
                <CardContent
                  sx={{
                    padding: '10px 0',
                  }}
                >
                  <Typography variant="bold">{name}</Typography>
                  <Typography variant="subtitle1">{community}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )
        })}
      </MultiCarousel>
    </>
  ) : null
}

export default DashboardCreatorSpotlight
