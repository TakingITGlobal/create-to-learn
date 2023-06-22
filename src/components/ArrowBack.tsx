import React, { Dispatch, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'util/router'

interface Props {
  showComponent: string
  setShowComponent: Dispatch<SetStateAction<string>>
}
function ArrowBack({ showComponent, setShowComponent }: Props) {
  const handleClick = () => setShowComponent('nav')

  return showComponent === 'nav' ? (
    <Box>
      <IconButton
        aria-label="back to settings page"
        component={Link}
        to="/settings/profile"
      >
        <ArrowBackIcon />
      </IconButton>
    </Box>
  ) : (
    <Box>
      <IconButton aria-label="back to previous page" onClick={handleClick}>
        <ArrowBackIcon />
      </IconButton>
    </Box>
  )
}

export default ArrowBack
