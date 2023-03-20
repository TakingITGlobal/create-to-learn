import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HouseIcon from '@material-ui/icons/House'
import PublicIcon from '@material-ui/icons/Public'
import LibraryIcon from '@material-ui/icons/LocalLibrary'
import AccountIcon from '@material-ui/icons/AccountCircle'
import { Link } from './../util/router'

const useStyles = makeStyles({
  root: {
    gap: 10,
  },
})

export default function BottomNavbar() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={Link}
        to="/dashboard"
        label="Home"
        icon={<HouseIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/browse"
        label="Browse"
        icon={<PublicIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/my-courses"
        label="Courses"
        icon={<LibraryIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/settings/profile"
        label="Profile"
        icon={<AccountIcon />}
      />
    </BottomNavigation>
  )
}
