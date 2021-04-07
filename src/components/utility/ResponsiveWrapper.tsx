import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';

interface ResponsiveWrapperProps {
  children: React.ReactNode;
}

const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = (props: ResponsiveWrapperProps) => {
  return (
    <Fragment>
      <Grid item xs={1} sm={1} md={2} lg={2} />
      <Grid item xs={10} sm={10} md={8} lg={8}>
        {props.children}
      </Grid>
      <Grid item xs={1} sm={1} md={2} lg={2} />
    </Fragment>
  );
}

export default ResponsiveWrapper