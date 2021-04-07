import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { GridList, GridListTile, Dialog, Typography, Zoom } from '@material-ui/core';
import { vw } from '../../@utils/useScrollPosition';
import { info } from '../../assets/data/info';
import { Picture } from '../../@types';
import { TransitionProps } from '@material-ui/core/transitions/transition';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,
    '& li': {
      cursor: 'pointer',
      display: 'block',
      objectFit: 'cover',
      overflow: 'hidden',
      padding: '0 !important',
      border: `2px solid ${theme.palette.background.default}`,
      '& .MuiGridListTile-tile': {
        filter: 'grayscale(90%)',
        transition: '0.6s ease',
      },
    },
    '& li:hover': {
      '& .MuiGridListTile-tile': {
        filter: 'grayscale(0%)',
        transform: 'scale(1.08)'
      },
    },
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  dialog: {
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    '& .MuiDialog-paper': {
      boxShadow: 'none',
      backgroundColor: '#00000000',
    },
    '& img': {
      maxWidth: 700,
      maxHeight: 500,
      borderRadius: 10,
    },
    '& .MuiTypography-root': {
      fontStyle: 'oblique',
      color: '#ffffff',
    },
  },
  '@media only screen and (max-width: 1200px)': {
    root: {
      '& .MuiGridListTile-tile': {
        filter: 'grayscale(0%) !important',
      },
    },
    column: {
      flex: 'calc(50% - 8px)',
      maxWidth: '50%',
    },
  },
  '@media only screen and (max-width: 600px)': {
    root: {
      '& .MuiGridListTile-tile': {
        filter: 'grayscale(0%) !important',
      },
    },
    column: {
      flex: 'calc(100% - 8px)',
      maxWidth: '100%',
    },
    dialog: {
      '& img': {
        maxWidth: 350,
        maxHeight: 450,
      },
    },
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Zoom ref={ref} {...props} />;
});

const Gallery: React.FC = () => {
  const classes = useStyles();

  const [enlarge, setEnlarge] = useState({ open: false, img: '', caption: '' });

  const pictures = vw < 600 ? info.travel.pictures.slice(0, 8) : vw < 1200 ? info.travel.pictures.slice(0, 12) : info.travel.pictures

  return (
    <div className={classes.root}>
      <GridList cellHeight={vw < 600 ? 260 : vw < 1200 ? 350 : 260} className={classes.gridList} cols={vw < 600 ? 1 : vw < 1200 ? 2 : 5}>
        {pictures.map((tile: Picture) => (
          <GridListTile key={tile.img} cols={tile.cols || 1} onClick={() => setEnlarge({ open: true, img: tile.img, caption: tile.title })}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
      <Dialog
        className={classes.dialog}
        maxWidth='lg'
        open={enlarge.open}
        onClose={() => setEnlarge({ open: false, img: '', caption: '' })}
        TransitionComponent={Transition}
      >
        <img src={enlarge.img} alt={enlarge.caption} />
        <Typography variant='h6' component='caption'>{enlarge.caption}</Typography>
      </Dialog>
    </div>
  );
}

export default Gallery;