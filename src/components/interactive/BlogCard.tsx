import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography, Link, CardActionArea, Hidden } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import MediumLogo from '../../assets/images/medium.svg';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    height: 240,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'justify',
    alignItems: 'flex-start'
  },
  content: {
    flex: '1 0 auto',
    '& #date': {
      position: 'absolute',
      bottom: 15,
      right: 15,
      display: 'flex',
      alignItems: 'center',
    },
  },
  skeleton: {
    position: 'absolute',
    left: 0,
    textAlign: 'left',
  },
  cover: {
    float: 'left',
    width: 400,
  },
  mediumLogo: {
    height: 20,
    width: 20,
    marginRight: 20,
    opacity: 0.6,
  },
  '@media (max-width: 1200px)': {
    cover: {
      width: 300,
    },
  },
  '@media (max-width: 600px)': {
    root: {
      height: 150,
    },
    details: {
      textAlign: 'left',
      '& h4': {
        fontSize: '1rem',
        marginBottom: 15
      },
      '& #date': {
        fontSize: '0.5rem',
        bottom: 10,
        right: 10,
      },
    },
    cover: {
      width: 200,
    },
    mediumLogo: {
      height: 10,
      width: 10,
      marginRight: 10,
    },
  }
}));

interface BlogCardProps {
  title: string;
  pubDate: string;
  link: string;
  image: string;
  description: string;
  isLoading: boolean;
}

const BlogCard: React.FC<BlogCardProps> = (props: BlogCardProps) => {
  const classes = useStyles();

  return (
    <Link href={props.link} target='_blank' style={{ textDecoration: 'none' }} rel="noopener" aria-label="Medium">
      <Card className={classes.root} elevation={5}>
        {props.isLoading ? (
          <Skeleton className={classes.cover} animation='wave' variant='rect' height={240} />
        ) : (
            <CardMedia
              className={classes.cover}
              image={props.image}
              title={props.title}
            />
          )}
        <CardActionArea className={classes.details}>
          {props.isLoading ? (
            <CardContent className={classes.skeleton}>
              <Skeleton animation='wave' width='50rem' height='5rem' />
              <Skeleton animation='wave' width='35rem' height='2rem' />
              <Skeleton animation='wave' width='35rem' height='2rem' />
              <Skeleton animation='wave' width='35rem' height='2rem' />
              <Skeleton animation='wave' width='35rem' height='2rem' />
            </CardContent>
          ) : (
              <CardContent className={classes.content}>
                <Typography variant='h6' component='h4' gutterBottom>
                  {props.title}
                </Typography>
                <Hidden xsDown>
                  <Typography variant='subtitle1' color='textSecondary' gutterBottom>
                    {props.description}
                  </Typography>
                </Hidden>
                <Typography variant='body2' component='div' id='date'>
                  <img src={MediumLogo} alt='Medium' className={classes.mediumLogo} />
                  {props.pubDate}
                </Typography>
              </CardContent>
            )}
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default BlogCard