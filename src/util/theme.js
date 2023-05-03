export const c2learn = (mode) => ({
    typography: {
        fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif',
        body: {
          fontSize: '16px',
          fontWeight: '500',
        },
        body2: {
          fontSize: '16px',
          fontWeight: '500',
        },
        bold: {
          fontWeight: '700',
        },
        h1: {
          fontSize: '1.75em',
          lineHeight: '2em',
          fontWeight: 700,
        },
        h3: {
          fontSize: '1.125em',
          lineHeight: '1.3em',
          fontWeight: 700,
        },
      },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1200,
            xl: 1920,
        },
    },
    palette: {
      mode,
      primary: {
        ...(mode === 'light' 
        ? {
        }
        : {
            main: '#6956F1',
        }),
      },
      accent: {
        ...(mode === 'light' 
        ? {
        }
        : {
          main: '#FFC14C',
          lavender: '#A864EC',
          watermelon: '#F673A2',
          fern: '#58B97D',
          pink: '#F571E1',
        }),
      },
      background: {
        ...(mode === 'light' 
        ? {
        }
        : {
            default: '#0B0919',
            paper: '#0B0919',
            secondary: '#2B2937',
            tertiary: '#413F4C',
        }),
      },
      text: {
        ...(mode === 'light' 
        ? {
        }
        : {
          text: {
            primary: '#fff',
            secondary: '#ccc',
            placeholder: '#B2B2B2',
            disabled: '#808080'
          },
        }),
      },
    },
    components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              padding: '1rem',
              borderRadius: '12px'
            }
          }
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
            secondary: {
              backgroundColor: '#fff',
              color: '#000'
            },
            text: {
              color: '#fff',
            },
            outline: {
              borderWidth: '1px',
            }
          }
        },
        MuiBottomNavigation: {
          styleOverrides: {
            root: {
              height: 'auto',
            }
          }
        },
        MuiBottomNavigationAction: {
          styleOverrides: {
            root: {
              paddingTop: '10px',
              paddingBottom: '30px',
              "&.Mui-selected" : {
                fontSize: '0.625em',
                color: '#fff'
              }
            },
            label: {
              fontWeight: '700',
              fontSize: '0.625em',
              "&.Mui-selected" : {
                fontSize: '1em',
              }
            }
          }
        },
        MuiCardContent: {
          styleOverrides: {
            root: {
              "&:last-child" : {
                paddingBottom: '0',
              }
            }
          }
        },
        MuiCardMedia: {
          styleOverrides: {
            root: {
              objectFit: 'cover',
              borderRadius: '6px'
            }
          }
        }
      },
  });