import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ResponsiveWrapper from '../utility/ResponsiveWrapper';
import Profile from '../segments/Profile';
import About from '../segments/About';
import Welcome from '../segments/Welcome';
import Timeline from '../segments/Timeline';
import Blog from '../segments/Blog';
import Abilities from '../segments/Abilities';
import FloatingButtons from '../buttons/FloatingButtons';
import Travel from '../segments/Travel';
import Contact from '../segments/Contact';
import NavBar from './NavBar';

const useStyles = makeStyles((theme: Theme) => ({
  body: {
    height: '100%',
    width: '100vw',
    textAlign: 'center',
  },
  buffer: {
    height: '100vh',
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    '& h1': {
      color: theme.palette.primary.main,
    }
  },
}));

const Body: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Welcome />

      <div className={classes.buffer} />
      <Grid container spacing={2} className={classes.content}>
        <NavBar />

        <ResponsiveWrapper>
          <Profile />
        </ResponsiveWrapper>

        <ResponsiveWrapper>
          <About />
        </ResponsiveWrapper>

        <ResponsiveWrapper>
          <Timeline />
        </ResponsiveWrapper>

        <ResponsiveWrapper>
          <Blog />
        </ResponsiveWrapper>

        <ResponsiveWrapper>
          <Abilities />
        </ResponsiveWrapper>

        <ResponsiveWrapper>
          <Travel />
        </ResponsiveWrapper>

        <ResponsiveWrapper>
          <Contact />
        </ResponsiveWrapper>

        <FloatingButtons />
      </Grid>
    </div>
  );
}

export default Body;