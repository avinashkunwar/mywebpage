import React, { useContext } from 'react';
import AppRouter from './AppRouter';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme, Theme, ThemeOptions } from '@material-ui/core';
import { ThemeContext } from '../../contexts/ThemeContext';
import CurrentPageViewProvider from '../../contexts/CurrentPageView';

const AppTheme: React.FC = () => {
  const { lightMode } = useContext(ThemeContext);

  const common: ThemeOptions = {
    typography: {
      fontFamily: navigator.userAgent.match(/Android/i) || navigator.appVersion.indexOf("Win") !== -1 ? "'Raleway', sans-serif !important" : "'Avenir', sans-serif !important",
      h3: {
        // fontFamily: navigator.userAgent.match(/Android/i) || navigator.appVersion.indexOf("Win") !== -1 ? "'Arvo', sans-serif !important" : "'American Typewriter', sans-serif !important"
        fontFamily: "'Arvo', sans-serif !important"
      }
    }
  };

  const light: Theme = createMuiTheme({
    palette: {
      primary: {
        main: '#17577e',
        contrastText: '#DCD6D2',
      },
      secondary: {
        main: '#4086A1',
        contrastText: '#f7f9fb',
      },
      background: {
        default: '#E7E7E4',
        paper: '#A5C9CD', //#63939d
      },
      text: {
        primary: '#121858',
        secondary:'rgba(0, 0, 0, 0.54)',
      },
    },
    ...common
  });

  const dark: Theme = createMuiTheme({
    palette: {
      primary: {
        main: '#66FCF1',
        contrastText: '#686c6c',
      },
      secondary: {
        main: '#9fb3c8',
        contrastText: '#010101',
      },
      background: {
        default: '#0B0C10',
        paper: '#1F2833',
      },
      text: {
        primary: '#C5C6C7',
        secondary: 'rgba(255, 255, 255, 0.5)',
      },
    },
    ...common
  });

  return (
    <CurrentPageViewProvider>
      <ThemeProvider theme={lightMode ? light : dark}>
        <AppRouter />
      </ThemeProvider>
    </CurrentPageViewProvider>
  );
}

export default AppTheme;