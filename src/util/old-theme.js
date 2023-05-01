// import React from 'react'
// import {
//   useTheme,
//   createTheme,
//   ThemeProvider as MuiThemeProvider,
// } from '@mui/material/styles'
// import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
// import * as colors from '@mui/material/colors'
// import CssBaseline from '@mui/material/CssBaseline'
// import useMediaQuery from '@mui/material/useMediaQuery'
// import { createLocalStorageStateHook } from 'use-local-storage-state'


// const themeConfig = {
//   // Light theme
//   light: {
//     palette: {
//       type: 'light',
//       primary: {
//         // Use hue from colors or hex
//         main: '#0c0914',
//         // Uncomment to specify light/dark
//         // shades instead of automatically
//         // calculating from above value.
//         //light: "#4791db",
//         //dark: "#115293",
//       },
//       secondary: {
//         main: colors.pink['500'],
//       },
//       background: {
//         // Background for <body>
//         // and <Section color="default">
//         default: '#fff',
//         // Background for elevated
//         // components (<Card>, etc)
//         paper: '#fff',
//       },
//     },
//   },

//   // Dark theme
//   dark: {
//     palette: {
//       type: 'dark',
//       text: {
//         primary: '#fff',
//         secondary: '#ccc',
//         placeholder: '#B2B2B2',
//         disabled: '#808080'
//       },
//       icon: {
//         primary: '#fff',
//       },
//       primary: {
//         main: '#6956F1',
//       },
//       secondary: {
//         main: '#FFC14C',
//         mango: '#FFC14C',
//         lavender: '#A864EC',
//         watermelon: '#F673A2',
//         fern: '#58B97D',
//         pink: '#F571E1',
//       },
//       background: {
//         default: '#313131',
//         secondary: '#2B2937',
//         tertiary: '#413F4C',
//         paper: '#1c1925',
//       },
//       icon: {
//         color: '#fff',
//       },
//       Paper: {
//         icon: {
//           primary: '#fff',
//         },
//       },
//     },
//     typography: {
//       fontSize: 16,
//       color: '#fff',
//       fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif',
//       h1: {
//         fontSize: '2rem',
//         color: '#fff',
//         fontWeight: 700,
//       },
//     },

//     components: {
//       MuiCssBaseline: {
//         styleOverrides: {
//           h1: {
//             fontSize: '2rem',
//             color: '#fff',
//             fontWeight: 700,
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             textTransform: 'uppercase'
//           },
//           secondary: {
//             backgroundColor: '#fff',
//             color: '#000',
//           },
//           text: {
//             color: '#fff',
//           }
//         }
//       },
//       MuiTypography: {
//         variants: [
//           {
//             props: {
//               variant: 'p',
//             },
//             style: {
//               fontSize: '1em',
//               color: '#fff',
//             },
//           },
//           {
//             props: {
//               variant: 'h1',
//             },
//             style: {
//               fontSize: '2rem',
//               color: '#fff',
//               fontWeight: 700,
//             },
//           },
//           {
//             props: {
//               variant: 'h2',
//             },
//             style: {
//               fontSize: '1.3rem',
//               color: '#fff',
//               fontWeight: 600,
//             },
//           },
//           {
//             props: {
//               variant: 'h3',
//             },
//             style: {
//               fontSize: '1.2rem',
//               color: '#fff',
//               fontWeight: 800,
//             },
//           },
//         ],
//       },
//     },
//   },

//   // Values for both themes
//   common: {
//     typography: {
//       fontSize: 16,
//       fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif',
//     },
//     breakpoints: {
//       values: {
//         xs: 0,
//         sm: 600,
//         md: 960,
//         lg: 1200,
//         xl: 1920,
//       },
//     },

//     components: {
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             textTransform: 'lowercase',
//             fontWeight: '600',
//             borderRadius: '3em',
//             padding: '0.75em 1.5em',
//             lineHeight: '1.25em',
//           },
//           sizeLarge: {
//             fontWeight: '700',
//             padding: '1em 1.5em',
//           }
//         }
//       }
//     },
//     // Override component styles
//     overrides: {
//       // Global styles
//       MuiCssBaseline: {
//         '@global': {
//           '#root': {
//             // Flex column that is height
//             // of viewport so that footer
//             // can push self to bottom by
//             // with auto margin-top
//             minHeight: '100vh',
//             display: 'flex',
//             flexDirection: 'column',
//             // Prevent child elements from
//             // shrinking when content
//             // is taller than the screen
//             // (quirk of flex parent)
//             '& > *': {
//               flexShrink: 0,
//             },
//           },
//         },
//       },
//     },
//   },
// }

// function getTheme(name) {
//   // Create MUI theme from themeConfig
//   return createTheme({
//     ...themeConfig.common,
//     ...themeConfig['dark'],
//     // Merge in common values
//     overrides: {
//       // Merge overrides
//       ...(themeConfig.common && themeConfig.common.overrides),
//       ...(themeConfig['dark'] && themeConfig['dark'].overrides),
//     },
//   })
// }

// // Create a local storage hook for dark mode preference
// const useDarkModeStorage = createLocalStorageStateHook('isDarkMode')

// export const ThemeProvider = (props) => {
//   // Get system dark mode preference
//   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
//     noSsr: true,
//   })

//   // Get stored dark mode preference
//   let [isDarkModeStored, setIsDarkModeStored] = useDarkModeStorage()

//   // Use stored dark mode with fallback to system preference
//   const isDarkMode =
//     isDarkModeStored === undefined ? prefersDarkMode : isDarkModeStored

//   // Get MUI theme object
//   const themeName = isDarkMode ? 'dark' : 'light'
//   const theme = getTheme(themeName)

//   // Add toggle function to theme object
//   theme.palette.toggle = () => setIsDarkModeStored((value) => !value)

//   return (
//     <MuiThemeProvider theme={props?.theme ? props.theme : theme}>
//       <EmotionThemeProvider theme={props?.theme ? props.theme : theme}>
//         {/* Set global MUI styles */}
//         <CssBaseline />
//         {props.children}
//       </EmotionThemeProvider>
//     </MuiThemeProvider>
//   )
// }

// // Hook for detecting dark mode and toggling between light/dark
// // More convenient than reading theme.palette.type from useTheme
// export function useDarkMode() {
//   // Get current Material UI theme
//   const theme = useTheme()
//   // Check if it's the dark theme
//   const isDarkMode = theme.palette.type === 'dark'
//   // Return object containing dark mode value and toggle function
//   return { value: isDarkMode, toggle: theme.palette.toggle }
// }
