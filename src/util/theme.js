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
        subtitle1: {
          fontSize: '0.875em'
        }
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
      action: {
        ...(mode === 'light' 
        ? {
        }
        : {
            active: '#fff',
        }),
      },
      accent: {
        ...(mode === 'light' 
        ? {
        }
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
          primary: '#fff',
          secondary: '#ccc',
          placeholder: '#B2B2B2',
          disabled: '#808080'
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
        MuiLink: {
          variants: [
            {
              props: {variant: 'profile'},
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '15px 0',
                width: '100%',
                lineHeight: '1em',
                ".MuiSvgIcon-root" : {
                  marginLeft: 'auto'
                }
              }
            }
          ]
        },
        MuiTab: {
          styleOverrides: {
            root: {
              textTransform: 'capitalize',
              fontSize: '1em',
              "&.Mui-selected" : {
                color: '#fff',
                fontWeight: '700'
              }
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
              borderWidth: '2px',
            }, 
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
        },
        MuiStack: {
          variants: [
            {
              props: {variant: 'squareCard'},
              style: {
                justifyContent: 'center',
                "> *" : {
                  aspectRatio: '1/1',
                  display: 'flex',
                  alignItems: 'center',
                  flex: '1',
                  borderRadius: '4px',
                  justifyContent: 'center',
                }
              }
            }
          ]
        },
      },
  });