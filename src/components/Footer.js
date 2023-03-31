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

const styles = theme => ({
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
    fontFamily: 'Bebas Neue,sans-serif',
    color: theme.primary,
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
  }
});

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
    >
      <Container>
        <div className={classes.wrapper}>
          <div className={`${classes.item} ${classes.left}`}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              {/* <img src={logo} alt="Logo" className={classes.brand} /> */}
              <span className={classes.logo}>CREATE TO LEARN</span>
            </Link>
          </div>
          <div
            className={`${classes.item} ${classes.right} ${classes.smallLinks}`}
          >
            <Typography>
              <LinkMui component={Link} to="/about" className={classes.link}>
                About
              </LinkMui>
              <LinkMui component={Link} to="/faq" className={classes.link}>
                FAQ
              </LinkMui>
              <LinkMui component={Link} to="/contact" className={classes.link}>
                Contact
              </LinkMui>
              <LinkMui
                href="https://medium.com"
                target="_blank"
                rel="noreferrer"
                className={classes.link}
              >
                Blog
              </LinkMui>
            </Typography>
          </div>
          <div className={`${classes.item} ${classes.right} ${classes.social}`}>
            <a
              href="https://twitter.com/divjoy"
              target="_blank"
              rel="noreferrer"
              className={classes.link}
            >
              <TwitterIcon fontSize="small" />
            </a>
            <a
              href="https://facebook.com/DivjoyOfficial"
              target="_blank"
              rel="noreferrer"
              className={classes.link}
            >
              <FacebookIcon fontSize="small" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className={classes.link}
            >
              <InstagramIcon fontSize="small" />
            </a>
          </div>
          <span className={`${classes.item} ${classes.legal} ${classes.left}`}>
            {props.copyright}
            <LinkMui component={Link} to="/legal/terms-of-service">
              Terms
            </LinkMui>
            <LinkMui component={Link} to="/legal/privacy-policy">
              Privacy
            </LinkMui>
          </span>
        </div>
      </Container>
    </Section>
  );
}

export default Footer
