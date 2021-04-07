import React, { useState, useRef, useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography, Box, Grow, Button } from '@material-ui/core';
import PublicIcon from '@material-ui/icons/Public';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import AnimatedWorldMap from '../interactive/AnimatedWorldMap';
import WorldMap from '../interactive/WorldMap';
import Gallery from '../interactive/Gallery';
import { info } from '../../assets/data/info';
import { useScrollPosition, vh, vw } from '../../@utils/useScrollPosition';
import { CurrentPageView } from '../../contexts/CurrentPageView';
import { CONTAINER_OFFSET, LAST_SECTION_OFFSET } from '../../@constants';

const useStyles = makeStyles((theme: Theme) => ({
  travel: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 100,
  },
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: '#7F7F7F',
  },
  title: {
    margin: '50px 0 20px',
    '& h1': {
      fontWeight: 500,
    },
  },
  map: {
    marginTop: 50,
  },
  mapChangeButton: {
    transform: 'translateY(-120%)',
    width: 'fit-content',
    margin: 'auto',
    '& svg': {
      marginRight: 20,
    }
  },
  buttonAnimation: {
    boxShadow: `0 0 0 0 ${theme.palette.secondary.main}80`,
    animation: '$pulse 1.5s ease infinite',
  },
  buffer: {
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    height: 50,
    width: '101%',
    transform: 'translate(-1px, -20px)'
  },
  caption: {
    marginBottom: 10,
    fontStyle: 'oblique',
  },
  '@media only screen and (max-width: 1200px)': {
    rect: {
      width: '80%',
    },
  },
  '@media only screen and (max-width: 600px)': {
    rect: {
      width: '100%',
    },
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.9)',
    },
    '70%': {
      transform: 'scale(1)',
      boxShadow: `0 0 0 15px ${theme.palette.secondary.main}00`,
    },
    '100%': {
      transform: 'scale(0.9)',
      boxShadow: `0 0 0 0 ${theme.palette.secondary.main}00`
    }
  },
}));

const Travel: React.FC = () => {
  const classes = useStyles();
  const { setCurrentPage } = useContext(CurrentPageView);

  const [animatedMap, setAnimatedMap] = useState<boolean>(true);
  const [clicked, setClicked] = useState<boolean>(false);

  const handleChangeMap = () => {
    setAnimatedMap(prev => !prev);
    setClicked(true);
  }

  const [checked, setChecked] = useState<boolean>(false);
  const travelRef = useRef<HTMLImageElement>(null);
  const containerHeight = travelRef.current?.clientHeight;

  useScrollPosition(({ currPos }: any) => {
    currPos.y < vh * 0.65 ? setChecked(true) : setChecked(false);
    if (containerHeight) {
      if (CONTAINER_OFFSET > currPos.y && currPos.y > -containerHeight + LAST_SECTION_OFFSET) setCurrentPage('Travel');
    };
  }, travelRef, false);

  return (
    <Grid container spacing={3} className={classes.travel} ref={travelRef} id='travel'>
      <div className={classes.divider} />
      <Grid item xs={12} className={classes.title}>
        <Typography variant='h3' component='h1'>{info.travel.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grow in={checked} timeout={{ enter: 600, exit: 300 }}>
          <Typography variant='body1' component='p'>{info.travel.description}</Typography>
        </Grow>
      </Grid>
      <Grid item sm={1} md={2} lg={2} />
      <Grid item xs={12} sm={10} md={8} lg={8} className={classes.map}>
        <Grow in={checked} timeout={{ enter: 600, exit: 300 }} style={{ transitionDelay: checked ? '600ms' : '0ms', transformOrigin: '50% 50%' }}>
          <Box>
            {animatedMap ? (
              <AnimatedWorldMap enter={checked} animatedMap={animatedMap} />
            ) : (
                <WorldMap enter={checked} />
              )}
            {/* <div className={classes.buffer} /> */}

          </Box>
        </Grow>
        <div className={classes.mapChangeButton}>
          <Button color='secondary' variant='contained' size={vw < 600 ? 'small' : 'medium'} className={clicked ? undefined : classes.buttonAnimation} onClick={handleChangeMap}>
            {animatedMap ? (
              <PublicIcon />
            ) : (
                <FlightTakeoffIcon />
              )}
            {animatedMap ? (
              'Map'
            ) : (
                'Take Off!'
              )}
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} className={classes.caption}>
        <Typography variant='body1' component='p'>{info.travel.caption}</Typography>
      </Grid>
      <Grid item sm={1} md={2} lg={2} />
      <Grid item xs={12}>
        <Gallery />
      </Grid>
    </Grid>
  );
}

export default Travel;