import React from 'react'
import useClasses from '../hooks/useClasses'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import LinkMui from '@mui/material/Link'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import Section from './Section'
import { Link } from './../util/router'
import Box from '@mui/material/Box'
import TakingITGlobalLogo from '../assets/images/TakingITGlobal-Logo.png';
import LenovoLogo from '../assets/images/Lenovo-Logo.png';
import ImagineNativeLogo from '../assets/images/ImagineNative-logo.png';
import CanadaLogo from '../assets/images/Canada-logo.png'


const styles = (theme) => ({
  sticky: {
    marginTop: 'auto',
  },

  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  item: {
    display: 'flex',
    flex: 'none',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 24,
    [theme.breakpoints.up('sm')]: {
      flex: '50%',
    },
  },

  brand: {
    display: 'block',
    height: 32,
  },

  logo: {
    height: 28,
    marginRight: theme.spacing(2),
    paddingTop: 0,
    color: theme.palette.primary.main,
    fontSize: 30,
    fontWeight: 700,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
  },

  social: {
    alignItems: 'flex-end',
  },

  link: {
    color: 'inherit',
    textDecoration: 'None',
    lineHeight: 1,
    '&:not(:last-of-type)': {
      marginRight: '1.2rem',
    },
  },

  left: {
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  right: {
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
    },
  },

  // Move links to end (bottom right)
  // Swaps position with social
  smallLinks: {
    [theme.breakpoints.up('sm')]: {
      order: 1,
    },
  },

  legal: {
    opacity: 0.6,
    fontSize: '0.875rem',
    '& a': {
      color: 'inherit',
      marginLeft: '0.8rem',
    },
  },
})

function Footer(props) {
  // const darkMode = useDarkMode()
  // Use inverted logo if specified
  // and we are in dark mode
  // const logo =
  //   props.logoInverted && darkMode.value ? props.logoInverted : props.logo
  const classes = useClasses(styles)

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      className={props.sticky && classes.sticky}
      sx = {{
        padding: {lg:'30px 160px'},
        textAlign: 'center'
      }}
    >
        <Box
        sx = {{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
        }}
        >
          <div style = {{ width: '30%'}}>
            <img
              src={TakingITGlobalLogo}
              alt="cultural-teachings-icon"
              width='100%'
              height='100%'
            />
          </div>
          <div style = {{ width: '15%'}}>
            <img
              src={ImagineNativeLogo}
              alt="cultural-teachings-icon"
              width='100%'
              height='100%'
            />
          </div>
          <div style = {{ width: '20%'}}>
            <img
              src={CanadaLogo}
              alt="cultural-teachings-icon"
              width='100%'
              height='100%'
            />
          </div>
          <div style = {{ width: '30%'}}>
            <img
              src={LenovoLogo}
              alt="cultural-teachings-icon"
              width='100%'
              height='100%'
            />
          </div>
        </Box>
        <Typography sx={{ padding: '16px 0 60px 0'}} fontWeight= {'400'}>
          Create to Learn is a program of TakingITGlobal, in partnership with imagineNATIVE, with support from Lenovo Foundation and the Government of Canada’s CanCode and Supports for Student Learning programs.
        </Typography>
        <Typography color="text.secondary" fontWeight= {'400'}>
          © 2022 TakingITGlobal
        </Typography>
    </Section>
  )
}

export default Footer
