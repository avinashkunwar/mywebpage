import React, { useState, useContext } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Slide, Button, Grid, Hidden, IconButton, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';
import { useScrollPosition, vh } from '../../@utils/useScrollPosition';
import { info } from '../../assets/data/info';
import { ThemeContext } from '../../contexts/ThemeContext';
import { HashLink as Link } from 'react-router-hash-link';
import { CurrentPageView } from '../../contexts/CurrentPageView';
import DrawerMenu from './DrawerMenu';
import resume from '../../assets/documents/resume.pdf';

const useStyles = makeStyles((theme: Theme) => ({
  appbar: {
    fontSize: 12,
    justifyContent: 'center',
    '& .MuiTypography-root': {
      color: theme.palette.secondary.contrastText,
    },
  },
  headerGroup: {
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    '& .MuiAvatar-root': {
      marginRight: 20,
    },
  },
  buttonGroup: {
    display: 'flex',
    textAlign: 'right',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& .MuiButton-root': {
      marginRight: 20,
      '& .MuiTypography-root': {
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.2)',
        },
      },
    },
    '& a': {
      textDecoration: 'none',
      color: theme.palette.secondary.contrastText,
    },
  },
  menuButton: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiIconButton-root': {
      color: theme.palette.secondary.contrastText,
    },
  },
  focus: {
    '&:after': {
      content: '""',
      position: 'absolute',
      height: 3,
      backgroundColor: theme.palette.secondary.contrastText,
      width: '100%',
      left: '50%',
      bottom: 0,
      transform: 'translateX(-50%)',
    },
  },
}));

const NavBar: React.FC = () => {
  const classes = useStyles();
  const { lightMode } = useContext(ThemeContext);
  const { currentPage } = useContext(CurrentPageView);

  const [checked, setChecked] = useState<boolean>(false);

  useScrollPosition(({ prevPos, currPos }: any) => {
    currPos.y < prevPos.y && currPos.y > vh * 3 ? setChecked(true) : setChecked(false);
  });

  const [open, setOpen] = useState<boolean>(false)
  const handleMenuOpen = () => {
    open ? setOpen(false) : setOpen(true);
  }

  return (
    <Slide direction='down' in={checked}>
      <AppBar className={classes.appbar} elevation={2}>
        <Toolbar>
          <Grid container spacing={0}>
            <Hidden mdDown>
              <Grid item xs={1}></Grid>
              <Grid item xs={2} className={classes.headerGroup}>
                <Avatar alt='Leonard Tng' src={lightMode ? info.profile.imageAvatar : info.profile.imageDarkAvatar}></Avatar>
                <Typography variant='h5' component='h1'>{currentPage}</Typography>
              </Grid>
              <Grid item xs={8} className={classes.buttonGroup}>
                <Button>
                  <Link smooth to='#home'>
                    <Typography variant='body1' component='h2'>Home</Typography>
                  </Link>
                </Button>
                <Button className={currentPage === 'About' ? classes.focus : undefined}>
                  <Link smooth to='#about'>
                    <Typography variant='body1' component='h2' >About</Typography>
                  </Link>
                </Button>
                <Button className={currentPage === 'Timeline' ? classes.focus : undefined}>
                  <Link smooth to='#timeline'>
                    <Typography variant='body1' component='h2'>Timeline</Typography>
                  </Link>
                </Button>
                <Button className={currentPage === 'Blog' ? classes.focus : undefined}>
                  <Link smooth to='#blog'>
                    <Typography variant='body1' component='h2'>Blog</Typography>
                  </Link>
                </Button>
                <Button className={currentPage === 'Abilities' ? classes.focus : undefined}>
                  <Link smooth to='#abilities'>
                    <Typography variant='body1' component='h2'>Abilities</Typography>
                  </Link>
                </Button>
                <Button className={currentPage === 'Travel' ? classes.focus : undefined}>
                  <Link smooth to='#travel'>
                    <Typography variant='body1' component='h2'>Travel</Typography>
                  </Link>
                </Button>
                <Button className={currentPage === 'Contact' ? classes.focus : undefined}>
                  <Link smooth to='#contact'>
                    <Typography variant='body1' component='h2' noWrap>Get in Touch!</Typography>
                  </Link>
                </Button>
                <Button>
                  <Typography variant='body1' component='h2'><a href={resume} target='_blank' rel='noopener noreferrer'>Resume</a></Typography>
                </Button>
                <IconButton href='https://github.com/leonardtng/' target='_blank' rel='noopener' aria-label='GitHub'>
                  <GitHubIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}></Grid>
            </Hidden>
            <Hidden lgUp>
              <Grid item xs={2} className={classes.menuButton}>
                <IconButton onClick={handleMenuOpen}>
                  <MenuIcon />
                  <DrawerMenu open={open} setOpen={handleMenuOpen} />
                </IconButton>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={9} className={classes.headerGroup}>
                <Typography variant='h5' component='h1'>{currentPage}</Typography>
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}

export default NavBar