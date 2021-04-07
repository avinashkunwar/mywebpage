import React, { Fragment, useContext, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useScrollTrigger, Zoom, Fab, Tooltip } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { vh, vw } from '../../@utils/useScrollPosition';
import { ThemeContext } from '../../contexts/ThemeContext';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import NightsStayIcon from '@material-ui/icons/NightsStay';

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  themeToggle: {
    position: 'fixed',
    bottom: theme.spacing(15),
    right: theme.spacing(5),
  },
  buttonAnimation: {
    animation: '$pulse 1.5s ease infinite',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1.2)',
      backgroundColor: '#0B0C10',
    },
    '70%': {
      transform: 'scale(1)',
      backgroundColor: theme.palette.secondary.main,
    },
    '100%': {
      transform: 'scale(1.2)',
      backgroundColor: '#0B0C10',
    }
  },
  '@media only screen and (max-width: 600px)': {
    arrow: {
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
    themeToggle: {
      bottom: theme.spacing(11),
      right: theme.spacing(3),
    },
  },
}));

const FloatingButtons = () => {
  const classes = useStyles();
  const { lightMode, toggleTheme } = useContext(ThemeContext);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: vh * 3,
  });

  const [clicked, setClicked] = useState<boolean>(false);

  const handleThemeClick = () => {
    toggleTheme();
    setClicked(true)
  };

  const handleScrollClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fragment>
      <Zoom in={trigger}>
        <Tooltip title='Toggle Theme'>
          <div onClick={handleThemeClick} role='presentation' className={classes.themeToggle}>
            <Fab color='secondary' size={vw < 600 ? 'medium' : 'large'} className={clicked || !lightMode ? undefined : classes.buttonAnimation}>
              {lightMode ? (
                <NightsStayIcon />
              ) : (
                  <Brightness7Icon />
                )}
            </Fab>
          </div>
        </Tooltip>
      </Zoom>
      <Zoom in={trigger} style={{ transitionDelay: trigger ? '300ms' : '0ms' }}>
        <Tooltip title='Scroll to Top'>
          <div onClick={handleScrollClick} role='presentation' className={classes.arrow}>
            <Fab color='secondary' size={vw < 600 ? 'medium' : 'large'}>
              <KeyboardArrowUpIcon />
            </Fab>
          </div>
        </Tooltip>
      </Zoom>
    </Fragment>
  );
}

export default FloatingButtons;