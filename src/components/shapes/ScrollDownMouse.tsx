import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    position: 'relative',
    width: '100%',
    height: 60,
    '& #mouse': {
      position: 'relative',
      display: 'inline-block',
      color: theme.palette.secondary.main,
      '& span': {
        position: 'absolute',
        top: 0,
        left: -12.5,
        width: 21,
        height: 35,
        border: '2px solid',
        borderRadius: 50,
        '&:before': {
          position: 'absolute',
          top: 7,
          left: '50%',
          content: '""',
          width: 4.2,
          height: 4.2,
          marginLeft: -2.1,
          borderRadius: '100%',
          animation: '$scrolling 2s infinite',
          boxSizing: 'border-box',
          zIndex: -1,
        }
      }
    }
  },
  '@keyframes scrolling': {
    '0%': {
      '-webkit-transform': 'translate(0, 0)',
      transform: 'translate(0, 0)',
      opacity: 0,
    },
    '40%': {
      opacity: 1,
    },
    '80%': {
      '-webkit-transform': 'translate(0, 20px)',
      transform: 'translate(0, 20px)',
      opacity: 0,
    },
    '100%': {
      opacity: 0,
    }
  }
}));

const ScrollDownMouse: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div id='mouse'><span></span></div>
    </div>
  )
}

export default ScrollDownMouse
