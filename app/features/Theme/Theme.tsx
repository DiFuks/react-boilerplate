import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import { ThemeProvider as MuiThemeProvider, createMuiTheme, colors } from '@material-ui/core';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    font-family: Roboto, sans-serif;
    font-weight: 300;
    height: 100%;
  }
  
  #app {
    height: 100%;
  }
`;

const theme = createMuiTheme({
  palette: {
    primary: colors.pink,
  },
});

export const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <MuiThemeProvider theme={theme}>
      <Normalize/>
      <GlobalStyle/>
      {children}
    </MuiThemeProvider>
  </ThemeProvider>
);
