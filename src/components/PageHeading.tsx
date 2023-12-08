import * as React from 'react'
import { Box, BoxProps, Typography } from '@mui/material'

export interface PageHeadingProps extends BoxProps {
  headingText: string | React.ReactNode
}

export const PageHeading = ({
  children = null,
  headingText = '',
  ...props
}: PageHeadingProps) => (
  <Box
    alignItems="center"
    component="header"
    display="flex"
    flexWrap="wrap"
    gap="0.5rem"
    justifyContent="flex-start"
    margin="1rem 0 0.5rem"
    {...props}
  >
    <Typography flexGrow="1" lineHeight="1.25" variant="h1">
      {headingText}
    </Typography>
    {children}
  </Box>
)
