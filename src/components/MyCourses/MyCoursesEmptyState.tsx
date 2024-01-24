import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from '../../util/router'
import emptyStateImage from '../../assets/images/empty-state.png'

interface Props {
  title: string
  subtitle: string
  buttonText: string
  href: string
}

const MyCoursesEmptyState = ({ title, subtitle, buttonText, href }: Props) => {
  return (
    <Box
      mt={5}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        component="img"
        src={emptyStateImage}
        sx={{
          height: '225px',
          maxHeight: { xs: 300, lg: 500 },
          padding: '20px 0',
        }}
      />
      <Box>
        <Typography variant="h3" align="center">
          {title}
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography variant="body2" align="center">
          {subtitle}
        </Typography>
      </Box>
      <Box
        mt={3}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '90px'
        }}
      >
        <Button variant="contained" size="large" component={Link} to={href}>
          {buttonText}
        </Button>
      </Box>
    </Box>
  )
}

export default MyCoursesEmptyState
