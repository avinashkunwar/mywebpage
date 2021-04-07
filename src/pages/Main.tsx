import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Heading from '../components/structure/Heading';
import Body from '../components/structure/Body';
import Footer from '../components/structure/Footer';

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
  },
}));

const Main: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Heading />
      <Body />
      <Footer />
    </div>
  );
}

export default Main;