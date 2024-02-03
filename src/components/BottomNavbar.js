import React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Paper from '@mui/material/Paper'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MovieIcon from '@mui/icons-material/Movie';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useLocation } from './../util/router'

export default function BottomNavbar() {
  const [value, setValue] = React.useState(0)
  const { pathname } = useLocation()

  return (
    pathname !== '/sign-up' && pathname !== '/' && (
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 0,
          zIndex: '1001'
        }}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
          showLabels
        >
          <BottomNavigationAction
            component={Link}
            to="/dashboard"
            label="Home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/browse"
            label="Browse"
            icon={<SearchIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/my-courses"
            label="My Courses"
            icon={<MovieIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/settings/profile"
            label="Profile"
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      </Paper>
    )
  )
}
