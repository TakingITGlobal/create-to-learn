import React from 'react'
import useClasses from '../hooks/useClasses'
import Box from '@mui/material/Box'
import BackgroundImage from './BackgroundImage'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'



const styles = (theme) => ({
  root: {
    position: 'relative',
    // Ensure child <Container> is above background
    // image (if one is set with the bgImage prop).
    '& > .MuiContainer-root': {
      position: 'relative',
    },
  },

  // Create color classes that set background color and determine
  // text color and dividing border automatically based on background color.
  // Adds the keys colorDefault, colorLight, etc
  // ...[
  //   ['default', theme.palette.background.default],
  //   ['light', emphasize(theme.palette.background.default, 0.03)],
  //   ['primary', theme.palette.primary.main],
  //   ['secondary', theme.palette.secondary.main],
  // ].reduce((acc, [str, value]) => {
  //   acc[`color${capitalize(str) = {
  //     backgroundColor: value,
  //     // Ensure text is legible on background
  //     color: theme.palette.getContrastText(value),
  //     // Sibling selector that adds a top border if section above
  //     // has the same color class.
  //     // We use emphasize to compute border based on background color
  //     // and make sure it's always lightly visible.
  //     [`& + &`]: {
  //       borderTop: `1px solid ${emphasize(value, 0.09)}`,
  //     },
  //   }
  //   return acc
  // }, {}),

  colorInherit: {
    color: 'inherit',
  },

  colorTransparent: {
    backgroundColor: 'transparent',
    color: 'inherit',
  },
})

function Section(props) {
  const theme = useTheme();
  const location = useLocation();
  const pathname = location.pathname;
  const pathsToCheck = ['/', '/sign-up']
  const isIndex = pathsToCheck.includes(pathname)

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useClasses(styles)
  const {
    bgColor = 'default',
    bgImage,
    bgImageOpacity,
    size = 'normal',
    className,
    children,
    ...otherProps
  } = props

  // Get MUI responsize size object based
  // on size prop (normal, medium, large, auto)
  const verticalPadding = {
    normal: { xs: 2 },
    medium: { xs: 2, sm: 10 },
    large: { xs: 2, sm: 20 },
    auto: 0,
  }[size]

  return (
    <Box
      component="section"
      marginLeft = {isMobile || isIndex ? 0 : '360px'}
      className={classes.root + (className ? ` ${className}` : '')}
      {...otherProps}
    >
      {bgImage && <BackgroundImage image={bgImage} opacity={bgImageOpacity} />}

      {props.children}
    </Box>
  )
}

export default Section
