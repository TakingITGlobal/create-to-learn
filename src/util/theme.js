export const c2learn = (mode) => ({
    typography: {
        fontSize: 16,
        fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif',
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
        }),
      },
    },
    components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'lowercase',
              fontWeight: '600',
              borderRadius: '3em',
              padding: '0.75em 1.5em',
              lineHeight: '1.25em',
            },
            sizeLarge: {
              fontWeight: '700',
              padding: '1em 1.5em',
            }
          }
        }
      },
  });