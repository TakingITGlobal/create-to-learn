import React from 'react'
import useClasses from '../hooks/useClasses'
import Box from '@mui/material/Box'
import { emphasize } from '@mui/material/styles'
import BackgroundImage from './BackgroundImage'
import { capitalize } from '@mui/material/utils'

const styles = theme => ({
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
  }
});

function Section(props) {

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
      py={verticalPadding}
      className={
        classes.root +
        (className ? ` ${className}` : '')
      }
      {...otherProps}
    >
      {bgImage && <BackgroundImage image={bgImage} opacity={bgImageOpacity} />}

      {props.children}
    </Box>
  );
}

export default Section
