import React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Paper from '@mui/material/Paper';
import HouseIcon from '@mui/icons-material/House'
import PublicIcon from '@mui/icons-material/Public'
import LibraryIcon from '@mui/icons-material/LocalLibrary'
import AccountIcon from '@mui/icons-material/AccountCircle'
import { Link } from './../util/router'

export default function BottomNavbar() {

  const [value, setValue] = React.useState(0)
  
  return (
    <Paper 
      elavation={0}
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1001, 
        paddingTop: '10px', 
        paddingBottom: '30px' 
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
    </Paper>
  );
}
