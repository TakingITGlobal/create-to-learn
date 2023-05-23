import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import IconButton from '@mui/material/IconButton'
import StarIcon from '@mui/icons-material/Star'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import EditItemModal from './EditItemModal'
import useClasses from '../../hooks/useClasses'

import { useAuth } from '../../util/auth'
import { updateItem, deleteItem, useItemsByOwner } from './../util/db'

const styles = (theme) => ({
  paperItems: {
    minHeight: '300px',
  },

  featured: {
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.action.selected : '#fdf8c2',
  },

  starFeatured: {
    color: theme.palette.warning.main,
  },
})

function DashboardItems(props) {
  const classes = useClasses(styles)
  const auth = useAuth()

  const {
    data: items,
    status: itemsStatus,
    error: itemsError,
  } = useItemsByOwner(auth.user.uid)

  const [creatingItem, setCreatingItem] = useState(false)

  const [updatingItemId, setUpdatingItemId] = useState(null)

  const itemsAreEmpty = !items || items.length === 0

  const canUseStar =
    auth.user.planIsActive &&
    (auth.user.planId === 'pro' || auth.user.planId === 'business')

  const handleStarItem = (item) => {
    if (canUseStar) {
      updateItem(item.id, { featured: !item.featured })
    } else {
      alert('You must upgrade to the pro or business plan to use this feature')
    }
  }

  return (
    <>
      {itemsError && (
        <Box mb={3}>
          <Alert severity="error">{itemsError.message}</Alert>
        </Box>
      )}
      <Paper className={classes.paperItems}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
        >
          <Typography variant="h5">Items</Typography>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={() => setCreatingItem(true)}
          >
            Add Item
          </Button>
        </Box>
        <Divider />

        {(itemsStatus === 'loading' || itemsAreEmpty) && (
          <Box py={5} px={3} align="center">
            {itemsStatus === 'loading' && <CircularProgress size={32} />}

            {itemsStatus !== 'loading' && itemsAreEmpty && (
              <>Nothing yet. Click the button to add your first item.</>
            )}
          </Box>
        )}

        {itemsStatus !== 'loading' && items && items.length > 0 && (
          <List disablePadding={true}>
            {items.map((item, index) => (
              <ListItem
                key={index}
                divider={index !== items.length - 1}
                className={item.featured ? classes.featured : ''}
              >
                <ListItemText>{item.name}</ListItemText>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="star"
                    onClick={() => handleStarItem(item)}
                    className={item.featured ? classes.starFeatured : ''}
                    size="large"
                  >
                    <StarIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="update"
                    onClick={() => setUpdatingItemId(item.id)}
                    size="large"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteItem(item.id)}
                    size="large"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
      {creatingItem && <EditItemModal onDone={() => setCreatingItem(false)} />}
      {updatingItemId && (
        <EditItemModal
          id={updatingItemId}
          onDone={() => setUpdatingItemId(null)}
        />
      )}
    </>
  )
}

export default DashboardItems
