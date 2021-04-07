import React, { useRef, useState, useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography, Button, Zoom } from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { useScrollPosition, vh } from '../../@utils/useScrollPosition';
import { CurrentPageView } from '../../contexts/CurrentPageView';
import { CONTAINER_OFFSET } from '../../@constants';
import resume from '../../assets/documents/resume.pdf';

const useStyles = makeStyles((theme: Theme) => ({
  contact: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
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
  resume: {
    '& a': {
      textDecoration: 'underline',
      color: theme.palette.secondary.main,
    }
  },
  button: {
    margin: 30,
    boxShadow: `0 0 0 0 ${theme.palette.secondary.main}80`,
    animation: '$pulse 1.5s ease infinite',
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

const Contact: React.FC = () => {
  const classes = useStyles();
  const { setCurrentPage } = useContext(CurrentPageView);

  const [checked, setChecked] = useState<boolean>(false);
  const contactRef = useRef<HTMLHeadingElement>(null);
  const containerHeight = contactRef.current?.clientHeight;

  useScrollPosition(({ currPos }: any) => {
    currPos.y < vh * 0.85 ? setChecked(true) : setChecked(false);
    if (containerHeight) {
      if (CONTAINER_OFFSET > currPos.y && currPos.y > -containerHeight + CONTAINER_OFFSET) setCurrentPage('Timeline');
    };
  }, contactRef, false);

  return (
    <Grid container spacing={3} className={classes.contact} id='contact'>
      <div className={classes.divider} />
      <Grid item xs={12} className={classes.title}>
        <Typography variant='h3' component='h1' ref={contactRef}>What I can do for you</Typography>
      </Grid>
      <Grid item xs={12}>
        <Zoom in={checked}>
          <Typography variant='h5' component='h3'>I'm currently available for internships.</Typography>
        </Zoom>
      </Grid>
      <Grid item xs={12} className={classes.resume}>
        <Zoom in={checked} style={{ transitionDelay: checked ? '400ms' : '0ms' }}>
          <Typography variant='h6' component='h4'>View my resume <a href={resume} target='_blank' rel='noopener noreferrer'>here</a>!</Typography>
        </Zoom>
      </Grid>
      <Grid item xs={12}>
        <Zoom in={checked} style={{ transitionDelay: checked ? '600ms' : '0ms' }}>
          <Typography variant='body1' component='p'>But of course, if you want to work together, find out more, or just wanna chill and chat, </Typography>
        </Zoom>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          startIcon={<EmojiPeopleIcon />}
          href='mailto:theleonardtng@gmail.com'
        >
          Contact Me!
        </Button>
      </Grid>
    </Grid>
  );
}

export default Contact;