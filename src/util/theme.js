export const c2learn = (mode) => ({
  typography: {
    fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif',
    body: {
      fontSize: '1em',
      fontWeight: '500',
    },
    body2: {
      fontSize: '0.875em',
      fontWeight: '600',
    },
    small: {
      fontSize: '0.75em',
      fontWeight: '500',
    },
    bold: {
      fontWeight: '700',
      display: 'inline-block',
    },
    h1: {
      fontSize: '1.75em',
      lineHeight: '2em',
      fontWeight: '700',
    },
    h3: {
      fontSize: '1.125em',
      lineHeight: '1.3em',
      fontWeight: '700',
    },
    subtitle1: {
      fontSize: '0.875em',
      display: 'block',
      color: '#ccc',
    },
    sectionTitle: {
      fontSize: '1.125em',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      '.MuiSvgIcon-fontSizeMedium': {
        marginLeft: 'auto',
      },
    },
    decorative: {
      fontSize: '1.4em',
      fontWeight: '800',
      display: 'block',
      color: '#D2CCFB',
      paddingBottom: '10px',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 464,
      md: 1024,
      lg: 1200,
      xl: 1920,
    },
  },
  palette: {
    mode,
    primary: {
      ...(mode === 'light'
        ? {}
        : {
            main: '#6956F1',
          }),
    },
    action: {
      ...(mode === 'light'
        ? {}
        : {
            active: '#fff',
          }),
    },
    accent: {
      ...(mode === 'light'
        ? {}
        : {
            main: '#FFC75E',
            saffron: '#FFDA94',
            grape: '#7867F2',
            lightgrape: '#B4ABF8',
            lavender: '#B173EE',
            lightlavender: '#CBA2F4',
            fern: '#68C08A',
            lightfern: '#ACDCBE',
            watermelon: '#F781AB',
            lightwatermelon: '#FAABC7',
            candy: '#F78DE7',
            lightcandy: '#F9AAED',
          }),
    },
    background: {
      ...(mode === 'light'
        ? {}
        : {
            default: '#0B0919',
            paper: '#0B0919',
            secondary: '#2B2937',
            tertiary: '#413F4C',
          }),
    },
    text: {
      ...(mode === 'light'
        ? {}
        : {
            primary: '#fff',
            secondary: '#ccc',
            placeholder: '#B2B2B2',
            disabled: '#808080',
          }),
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '1rem',
          borderRadius: '12px',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          padding: '0',
          borderRadius: '4px',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          ...(mode === 'light'
            ? {}
            : {
                color: '#fff',
              }),
          '.MuiSvgIcon-root': {
            verticalAlign: 'middle',
          },
        },
      },
      variants: [
        {
          props: { variant: 'profile' },
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '15px 0',
            width: '100%',
            lineHeight: '1em',
          },
        },
      ],
    },
    MuiList: {
      styleOverrides: {
        root: {
          maxWidth: '100%',
        },
      },
      variants: [
        {
          props: { variant: 'icon-list' },
          style: {
            '.MuiListItem-root': {
              marginLeft: 'auto',
              paddingLeft: '0',
              fontSize: '0.875em',
            },
            '.MuiSvgIcon-root': {
              color: '#000',
              backgroundColor: '#fff',
              borderRadius: '99em',
              marginRight: '14px',
              padding: '2px',
            },
          },
        },
        {
          props: { variant: 'progress' },
          style: {
            width: '100%',
            padding: '0',
            '&::after': {
              content: '""',
              width: '2px',
              backgroundColor: '#fff',
              position: 'absolute',
              top: '25px',
              bottom: '120px',
              left: '25px',
              pointerEvents: 'none',
            },
            '.MuiListItem-root': {
              marginLeft: 'auto',
              paddingLeft: '0',
              paddingRight: '0',
              fontSize: '0.875em',
              counterIncrement: 'count',
            },
            '.MuiListItem-root::before': {
              position: 'absolute',
              top: '25px',
              left: '15px',
              zIndex: '1',
              content: 'counter(count)',
              color: '#000',
              backgroundColor: '#fff',
              borderRadius: '99em',
              fontWeight: '700',
              display: 'flex',
              width: '20px',
              height: '20px',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: '1em',
              fontSize: '0.85em',
            },
            '.MuiPaper-root': {
              width: '100%',
              borderRadius: '0',
              paddingLeft: '50px',
            },
            '.MuiSvgIcon-root': {
              color: '#000',
              backgroundColor: '#fff',
              borderRadius: '99em',
              marginRight: '14px',
              padding: '2px',
            },
          },
        },
      ],
    },
    MuiTab: {
      styleOverrides: {
        root: {
          flex: '1',
          textTransform: 'capitalize',
          fontSize: '1em',
          '&.Mui-selected': {
            color: '#fff',
            fontWeight: '700',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          colorSecondary: {
            color: 'white !important',
            backgroundColor: 'white !important',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1em',
          textTransform: 'capitalize',
          fontWeight: '600',
          borderRadius: '3em',
          padding: '0.75em 1.5em',
          lineHeight: '1.25em',
        },
        sizeLarge: {
          fontWeight: '700',
          padding: '1em 1.5em',
        },
        textError: {
          backgroundColor: '#FE3A3A',
          color: 'white',
          borderRadius: '3em',
        },
        textInfo: {
          backgroundColor: 'white',
          color: 'black',
          borderRadius: '25px',
          '&:active, &:hover': {
            color: '#fff',
          },
        },
        secondary: {
          backgroundColor: '#fff',
          color: '#000',
          '&:active, &:hover': {
            color: '#ccc',
          },
        },
        text: {
          color: '#fff',
          borderRadius: '0',
        },
        outline: {
          borderWidth: '2px',
        },
      },
      variants: [
        {
          props: { variant: 'selection' },
          style: {
            justifyContent: 'space-between',
            backgroundColor: '#211E34',
            borderRadius: '0.75em',
            padding: '1.125em 1.5em',
            color: '#ccc',
            '.MuiSvgIcon-root': {
              color: '#000',
              backgroundColor: '#fff',
              borderRadius: '99em',
              marginLeft: '14px',
              padding: '2px',
              fontSize: '1.1em',
              display: 'none',
            },
            '&.active, &:hover': {
              backgroundColor: '#6956F1',
              color: '#fff',
              '.MuiSvgIcon-root': {
                display: 'block',
              },
            },
          },
        },
      ],
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 'auto',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          paddingTop: '10px',
          paddingBottom: '30px',
          textAlign: 'center',
          '&.Mui-selected': {
            fontSize: '0.625em',
            color: '#fff',
          },
        },
        label: {
          fontWeight: '700',
          fontSize: '0.625em',
          '&.Mui-selected': {
            fontSize: '1em',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: '0',
          },
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          objectFit: 'cover',
          borderRadius: '6px',
        },
      },
    },
    MuiStack: {
      variants: [
        {
          props: { variant: 'squareCard' },
          style: {
            justifyContent: 'center',
            '> *': {
              aspectRatio: '1/1',
              display: 'flex',
              alignItems: 'center',
              flex: '1',
              borderRadius: '4px',
              justifyContent: 'center',
            },
          },
        },
      ],
    },
    MuiMobileStepper: {
      styleOverrides: {
        progress: {
          width: '100%',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: '8px',
          borderRadius: '10px',
          backgroundColor: '#ccc',
          '& .MuiLinearProgress-bar': {
            borderRadius: '10px',
          },
        },
      },
    },
  },
})
