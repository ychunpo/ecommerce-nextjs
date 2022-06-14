import { createTheme } from '@mui/material/styles';
import NextHead from 'next/Head';
import NextLink from 'next/link';
import { AppBar, Box, CssBaseline, Link, ThemeProvider, Toolbar, Typography, Container } from '@mui/material';
import layoutStyles from '../utils/styles'

export default function Layout({ title, description, children }) {
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
      mode: 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080'
      },
    },
  });

  return (
    <>
      <NextHead>
        <title>{title ? `${title} - Shop` : 'Shop'}</title>
        {description && <meta name="description" content={description}></meta>}
      </NextHead>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={layoutStyles.appbar}>
          <Toolbar sx={layoutStyles.toolbar}>
            <NextLink href="/" passHref>
              <Link>
                <Typography sx={layoutStyles.brand}>Shop</Typography>
              </Link>
            </NextLink>
          </Toolbar>
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