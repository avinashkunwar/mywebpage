import React, { useState, useRef } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ProfileImage from '../../assets/images/profile.png';
import { Grid, Slide, Typography } from '@material-ui/core';
import { useScrollPosition, vh } from '../../@utils/useScrollPosition';

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  profile: {
    width: styleProps => styleProps.checked? '50vw' : '10vw',
    display: 'flex',
    alignItems: 'center',
  },
  rect: {
    height: 15,
    width: '80%',
    backgroundColor: theme.palette.text.primary,
  },
  rectLeft: {
    '& div': {
      float: 'left',
    }
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      maxWidth: '50vw',
    },
  },
  rectRight: {
    '& div': {
      float: 'right',
    }
  },
  description: {
    marginTop: 50,
    '& .MuiTypography-subtitle1': {
      fontSize: 20,
    },
  },
  '@media only screen and (max-width: 1200px)': {
    profile: {
      width: '60vw',
    },
    rect: {
      width: '80%',
    },
  },
  '@media only screen and (max-width: 600px)': {
    profile: {
      width: '90vw',
    },
    rect: {
      width: '100%',
    },
  },
}));

interface StyleProps {
  checked: boolean
}

const Profile: React.FC = () => {

  const [checked, setChecked] = useState<boolean>(false)
  const profileRef: any = useRef();

  useScrollPosition(({ currPos }: any) => {
    currPos.y < vh * 0.55 && currPos.y > 0 ? setChecked(true) : setChecked(false);
  }, profileRef, false);

  const styleProps: StyleProps = {checked: checked}
  const classes = useStyles(styleProps);

  return (
    <Grid container spacing={0} className={classes.profile}>
      <Grid item xs={2} sm={2} md={3} lg={4} className={classes.rectLeft}>
        <Slide in={checked} direction='right'>
          <div className={classes.rect} />
        </Slide>
      </Grid>
      <Grid item xs={8} sm={8} md={6} lg={4} className={classes.image} >
        <img src={ProfileImage} alt='Leonard' ref={profileRef} />
      </Grid>
      <Grid item xs={2} sm={2} md={3} lg={4} className={classes.rectRight}>
        <Slide in={checked} direction='left'>
          <div className={classes.rect} />
        </Slide>
      </Grid>
      <Grid item xs={12} className={classes.description}>
        <Typography variant='subtitle1'>I'm an imaginative and fun-loving Software Engineer, <br /> based in Singapore</Typography>
      </Grid>
    </Grid>
  );
}

export default Profile;