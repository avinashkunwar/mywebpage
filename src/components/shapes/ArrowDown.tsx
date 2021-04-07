import React, { useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Fade } from '@material-ui/core';
import { vh, useScrollPosition } from '../../@utils/useScrollPosition';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    bottom: 80,
    '& #arrow': {
      '& span': {
        position: 'absolute',
        top: 0,
        left: '50%',
        width: 24,
        height: 24,
        marginLeft: -12,
        borderLeft: `3px solid ${theme.palette.secondary.main}`,
        borderBottom: `3px solid ${theme.palette.secondary.main}`,
        '-webkit-transform': 'rotate(-45deg)',
        transform: 'rotate(-45deg)',
        animation: '$scrolling 2s infinite',
      },
    }
  },
  '@keyframes scrolling': {
    '0%': {
      '-webkit-transform': 'rotate(-45deg) translate(0, 0)',
      transform: 'rotate(-45deg) translate(0, 0)',
    },
    '20%': {
      '-webkit-transform': 'rotate(-45deg) translate(-10px, 10px)',
      transform: 'rotate(-45deg) translate(-10px, 10px)',
    },
    '40%': {
      '-webkit-transform': 'rotate(-45deg) translate(0, 0)',
      transform: 'rotate(-45deg) translate(0, 0)',
    },
  }
}));

const ArrowDown: React.FC = () => {
  const classes = useStyles();

  const [showArrow, setShowArrow] = useState<boolean>(false);

  useScrollPosition(({ currPos }: any) => {
    currPos.y > vh * 1.1 && currPos.y < vh * 2 ? setShowArrow(true) : setShowArrow(false);
  });

  return (
    <Fade in={showArrow} timeout={{ enter: 1500, exit: 200 }}>
      <div className={classes.wrapper}>
        <div id='arrow'><span></span></div>
      </div>
    </Fade>
  )
}

export default ArrowDown;