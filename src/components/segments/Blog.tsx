import React, { Fragment, useState, useRef, useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography, Slide } from '@material-ui/core';
import BlogCard from '../interactive/BlogCard';
import { info } from '../../assets/data/info';
import { useScrollPosition, vh, vw } from '../../@utils/useScrollPosition';
import { CurrentPageView } from '../../contexts/CurrentPageView';
import { CONTAINER_OFFSET } from '../../@constants';
import useGetApi from '../../@utils/useGetApi';
import { modifyDescription } from '../../@utils/modifyDescription';
import { htmlToText } from '../../@utils/htmlToText';

const useStyles = makeStyles((theme: Theme) => ({
  blog: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 50,
    overflowX: 'hidden',
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
  posts: {
    marginTop: 20,
  },
  cardWrapper: {
    paddingBottom: 40,
  }
}));

const Blog: React.FC = () => {
  const classes = useStyles();
  const { setCurrentPage } = useContext(CurrentPageView);

  const blogDataLoadState = useGetApi('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@leonardtng', null, true);

  const [checked, setChecked] = useState<boolean>(false);
  const blogRef = useRef<HTMLDivElement>(null);
  const containerHeight = blogRef.current?.clientHeight;

  useScrollPosition(({ currPos }: any) => {
    currPos.y < vh * 0.65 ? setChecked(true) : setChecked(false);
    if (containerHeight) {
      if (CONTAINER_OFFSET > currPos.y && currPos.y > -containerHeight + CONTAINER_OFFSET) setCurrentPage('Blog');
    };
  }, blogRef, false);

  return (
    <Grid container spacing={3} className={classes.blog} ref={blogRef} id='blog'>
      <div className={classes.divider} />
      <Grid item xs={12} className={classes.title}>
        <Typography variant='h3' component='h1'>{info.blog.title}</Typography>
      </Grid>
      <Grid item xs={12} className={classes.posts}>
        {blogDataLoadState.isLoading ? (
          <Slide in={checked} direction='right' timeout={{ enter: 300, exit: 300 }} style={{ transitionDelay: checked ? '50ms' : '0ms' }}>
            <div>
              <BlogCard title='' pubDate='' link='' image='' description='' isLoading={blogDataLoadState.isLoading} />
            </div>
          </Slide>
        ) : (
            <Fragment>
              {blogDataLoadState.data.items.map((post: any, index: number) => {
                const shortenedDescription = modifyDescription(htmlToText(post.description), vw * 0.22);
                return <Slide in={checked} direction='right' timeout={{ enter: 600, exit: 600 }} style={{ transitionDelay: checked ? `${(index + 1) * 150}ms` : '0ms' }} key={index}>
                  <div className={classes.cardWrapper}>
                    <BlogCard title={post.title} pubDate={post.pubDate} link={post.link} image={post.thumbnail} description={shortenedDescription} isLoading={blogDataLoadState.isLoading} />
                  </div>
                </Slide>
              })}
            </Fragment>
          )}
      </Grid>
    </Grid>
  );
}

export default Blog;
