import React, { Fragment } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  topLeft: {
    position: 'absolute',
    top: 60,
    left: 60,
  },
  topRight: {
    position: 'absolute',
    top: 60,
    right: 60,
    transform: 'rotate(90deg)',
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 60,
    left: 60,
    transform: 'rotate(-90deg)',
  },
  bottomRight: {
    position: 'absolute',
    bottom: 60,
    right: 60,
    transform: 'rotate(180deg)',
  },
  corner: {
    position: 'absolute',
    width: 21.3,
    height: 93.6,
    backgroundColor: '#ffffff',
  },
  corner2: {
    position: 'absolute',
    width: 93.6,
    height: 21.3,
    backgroundColor: '#ffffff',
  }
}));

const Corner: React.FC = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.corner} />
      <div className={classes.corner2} />
    </Fragment>
  );
}

const Corners: React.FC = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.topLeft}>
        <Corner />
      </div>
      <div className={classes.topRight}>
        <Corner />
      </div>
      <div className={classes.bottomLeft}>
        <Corner />
      </div>
      <div className={classes.bottomRight}>
        <Corner />
      </div>
    </Fragment >
  );
}

export default Corners;