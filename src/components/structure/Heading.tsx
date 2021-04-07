import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Cover from '../../assets/images/cover.jpg';
import Corners from '../shapes/Corners';
import { Typography, Fade, Hidden } from '@material-ui/core';
import { useScrollPosition } from '../../@utils/useScrollPosition';
import { isIos } from '../../@utils/isIos';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    height: '100vh',
    backgroundImage: `url(${Cover})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: isIos() ? 'scroll' : 'fixed',
    backgroundPosition: 'bottom',
    backgroundSize: 'cover',
    '-webkit-background-size': 'cover',
    '-moz-background-size': 'cover',
    '-o-background-size': 'cover',
  },
  mask: {
    height: '100vh',
    backgroundColor: '#868AA7',
    opacity: '0.28',
  },
  title: {
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  name: {
    fontSize: 36.7,
    // fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  divider: {
    height: 7,
    maxWidth: '80vw',
    width: 410,
    margin: 5,
    backgroundColor: '#ffffff',
  },
  description: {
    fontSize: 23.55,
    // fontWeight: 'bold',
    color: '#ffffff',
  },
  hi: {
    fontSize: 50,
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  }
}));

const Heading: React.FC = () => {
  const classes = useStyles();

  const [cornerEnter, setCornerEnter] = useState(true);

  useScrollPosition(({ currPos }: any) => {
    currPos.y > 150 ? setCornerEnter(false) : setCornerEnter(true);
  })

  return (
    <header className={classes.header} id='home'>
      <div className={classes.mask}>
      </div>
      <Hidden smDown>
        <Fade in={cornerEnter} timeout={{ enter: 700, exit: 500 }} style={{ transitionDelay: '150ms' }}>
          <div>
            <Corners />
          </div>
        </Fade>
      </Hidden>
      <Fade in={cornerEnter} timeout={{ enter: 700, exit: 500 }} style={{ transitionDelay: '150ms' }}>
        <div className={classes.title}>
          <Typography className={classes.name} component='h1'>Leonard Tng</Typography>
          <div className={classes.divider} />
          <Typography className={classes.description} component='h1'>Software Engineer, Singapore</Typography>
        </div>
      </Fade>
    </header>
  );
}

export default Heading;