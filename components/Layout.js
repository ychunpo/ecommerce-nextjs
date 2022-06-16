import { useContext } from 'react';
import NextHead from 'next/Head';
import NextLink from 'next/link';
import { AppBar, Box, CssBaseline, Container, Link, Switch, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import layoutStyles from '../utils/layoutStyles';
import { Store } from '../utils/Store';
import jsCookie from 'js-cookie';

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
    },
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080'
      },
    },
  });

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    jsCookie.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };

  return (
    <>
      <NextHead>
        <title>{title ? `${title} - Shop` : 'Shop'}</title>
        {description && <meta name="description" content={description}></meta>}
      </NextHead>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={layoutStyles.appbar}>
          <Box display="flex" alignItems="center">
            <NextLink href="/" passHref>
              <Link>
                <Typography sx={layoutStyles.brand}>Shop</Typography>
              </Link>
            </NextLink>
          </Box>
          <Box>
            <Switch
              checked={darkMode}
              onChange={darkModeChangeHandler}>
            </Switch>
          </Box>
        </AppBar>
        <Container component="main" sx={layoutStyles.main}>
          {children}
        </Container>
        <Box component="footer" sx={layoutStyles.footer}>
          <Typography>All rights reserved. Shop by 2022.</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}