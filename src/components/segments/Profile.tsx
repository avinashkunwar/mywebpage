import React, { useState, useRef, useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Slide, Typography, Box } from '@material-ui/core';
import { useScrollPosition, vh } from '../../@utils/useScrollPosition';
import SingaporeMap from '../interactive/SingaporeMap';
import { ThemeContext } from '../../contexts/ThemeContext';
import { info } from '../../assets/data/info';

const useStyles = makeStyles((theme: Theme) => ({
  profile: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },
  rect: {
    height: 15,
    width: '80%',
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);',
    borderRadius: '15px 15px 15px 15px / 100% 100% 100% 100%',
  },
  rectLeft: {
    '& div': {
      float: 'right',
    }
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      maxHeight: '50vw',
      maxWidth: '50vw',
      boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);',
      borderRadius: '50%',
    },
  },
  rectRight: {
    '& div': {
      float: 'left',
    }
  },
  description: {
    marginTop: 50,
    '& .MuiTypography-subtitle1': {
      fontSize: 20,
    },
  },
  map: {
  },
  buffer: {
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    height: 50,
    width: '101%',
    transform: 'translate(-1px, -20px)'
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
}));

const Profile: React.FC = () => {
  const classes = useStyles();
  const { lightMode } = useContext(ThemeContext);

  const [checked, setChecked] = useState<boolean>(false);
  const profileRef = useRef<HTMLImageElement>(null);

  const [mapChecked, setMapChecked] = useState<boolean>(false);
  const mapRef = useRef<HTMLImageElement>(null);

  useScrollPosition(({ currPos }: any) => {
    currPos.y < vh * 0.55 && currPos.y > 0 ? setChecked(true) : setChecked(false);
  }, profileRef, false);

  useScrollPosition(({ currPos }: any) => {
    currPos.y < vh * 0.65 ? setMapChecked(true) : setMapChecked(false);
  }, mapRef, false);

  return (
    <Grid container spacing={0} className={classes.profile}>
      <Grid item xs={2} sm={2} md={3} lg={4} className={classes.rectLeft}>
        <Slide in={checked} direction='right'>
          <div className={classes.rect} />
        </Slide>
      </Grid>
      <Grid item xs={8} sm={8} md={6} lg={4} className={classes.image}>
        <img src={lightMode ? info.profile.image : info.profile.imageDark} alt='Leonard Tng' ref={profileRef} />
      </Grid>
      <Grid item xs={2} sm={2} md={3} lg={4} className={classes.rectRight}>
        <Slide in={checked} direction='left'>
          <div className={classes.rect} />
        </Slide>
      </Grid>
      <Grid item xs={12} className={classes.description}>
        <Typography variant='subtitle1'>{info.profile.captionFirstLine}<br />{info.profile.captionSecondLine}</Typography>
      </Grid>
      <Grid item xs={1} sm={1} md={2} lg={3} />
      <Grid item xs={10} sm={10} md={8} lg={6} className={classes.map} ref={mapRef}>
          <Box>
            <SingaporeMap enter={mapChecked}/>
            {/* <div className={classes.buffer} /> */}
          </Box>
      </Grid>
      <Grid item xs={1} sm={1} md={2} lg={3} />
    </Grid>
  );
}

export default Profile;