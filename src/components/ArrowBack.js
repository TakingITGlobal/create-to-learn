import React, { useCallback } from 'react'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

function ArrowBack({ setShowComponent }) {
  const handleArrowClick = useCallback(() => {
    setShowComponent('nav')
  }, [])
  return (
    <Box>
      <IconButton onClick={handleArrowClick}>
        <ArrowBackIcon />
      </IconButton>
    </Box>
  )
}

export default ArrowBack
