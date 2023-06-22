import React from 'react'
import useClasses from '../hooks/useClasses'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { BoxProps } from '@mui/material'
import cx from 'classnames'

const styles = (_: any) => ({
  root: {
    // Add bottom margin if element below
    '&:not(:last-child)': {
      marginBottom: '2rem',
    },
  },

  subtitle: {
    // Subtitle text generally isn't very long
    // so usually looks better to limit width.
    maxWidth: 700,
    // So we can have max-width but still
    // have alignment controlled by text-align.
    display: 'inline-block',
  },
})

interface Props extends BoxProps {
  subtitle: string
  title: string
  size: string
}

function SectionHeader({
  subtitle,
  title,
  size,
  className,
  ...otherProps
}: Props) {
  const classes = useClasses(styles) as any // TODO: type this

  // Render nothing if no title or subtitle
  if (!title && !subtitle) {
    return <></>
  }

  return (
    <Box
      component="header"
      className={cx([classes.root, className])}
      {...otherProps}
    >
      {title && (
        <Typography variant="h1" gutterBottom={subtitle ? true : false}>
          {title}
        </Typography>
      )}

      {subtitle && (
        <Typography variant="subtitle1" className={classes.subtitle}>
          {subtitle}
        </Typography>
      )}
    </Box>
  )
}

export default SectionHeader
