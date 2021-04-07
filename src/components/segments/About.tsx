import React, { useState, useRef, useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography, Grow } from '@material-ui/core';
import { info } from '../../assets/data/info';
import { useScrollPosition, vh } from '../../@utils/useScrollPosition';
import { CurrentPageView } from '../../contexts/CurrentPageView';
import { CONTAINER_OFFSET } from '../../@constants';

const useStyles = makeStyles((theme: Theme) => ({
  about: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 50,
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
  description: {
    paddingBottom: 20,
  },
  projectLink: {
    '& a': {
      textDecoration: 'underline',
      color: theme.palette.secondary.main,
    }
  },
}));

const About: React.FC = () => {
  const classes = useStyles();
  const { setCurrentPage } = useContext(CurrentPageView);

  const [checked, setChecked] = useState<boolean>(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const containerHeight = aboutRef.current?.clientHeight;

  useScrollPosition(({ currPos }: any) => {
    currPos.y < vh * 0.75 ? setChecked(true) : setChecked(false);
    if (containerHeight) {
      if (CONTAINER_OFFSET > currPos.y && currPos.y > -containerHeight + CONTAINER_OFFSET) setCurrentPage('About');
    };
  }, aboutRef, false);

  return (
    <Grid container spacing={3} className={classes.about} ref={aboutRef} id='about'>
      <div className={classes.divider} />
      <Grid item xs={12} className={classes.title}>
        <Typography variant='h3' component='h1'>{info.about.title}</Typography>
      </Grid>
      <Grid item xs={12} className={classes.description}>
        <Grow in={checked} timeout={{ enter: 600, exit: 300 }}>
          <Typography variant='body1' component='p'>{info.about.description}</Typography>
        </Grow>
      </Grid>
      <Grid item xs={12} className={classes.description}>
        <Grow in={checked} timeout={{ enter: 600, exit: 300 }} style={{ transitionDelay: checked ? '125ms' : '0ms' }}>
          <Typography variant='body1' component='p'>{info.about.descriptionSecondPart}</Typography>
        </Grow>
      </Grid>
      <Grid item xs={12} className={classes.projectLink}>
        <Grow in={checked} timeout={{ enter: 600, exit: 300 }} style={{ transitionDelay: checked ? '250ms' : '0ms' }}>
          <Typography variant='h5' component='p'><b>View my latest project, CodeCache, at <a href='https://www.codecache.io' target='_blank' rel='noopener noreferrer'>https://www.codecache.io</a>!</b></Typography>
        </Grow>
      </Grid>
    </Grid>
  );
}

export default About;
