import React from 'react';
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import Rating, { IconContainerProps } from '@material-ui/lab/Rating';
import { Typography, Box } from '@material-ui/core';
import BuildIcon from '@material-ui/icons/Build';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import HotTubIcon from '@material-ui/icons/HotTub';
import StarsIcon from '@material-ui/icons/Stars';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

const useStyles = makeStyles((theme: Theme) => ({
  rating: {
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    '& legend': {
      fontSize: '1.5rem',
    },
    '& svg': {
      fontSize: '1.5rem',
    }
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  '@keyframes hovereffect': {
    '0%': {
      transform: 'scale(1)'
    },
    '50%': {
      transform: 'scale(1.4)'
    },
    '100%': {
      transform: 'scale(1)'
    },
  }
}));

const StyledRating = withStyles((theme: Theme) => ({
  iconFilled: {
    color: theme.palette.primary.main,
  },
  iconEmpty: {
    color: theme.palette.primary.contrastText,
  }
}))(Rating);

const customIcons: { [index: string]: { icon: React.ReactElement; label: string } } = {
  1: {
    icon: <BuildIcon />,
    label: 'Working on it',
  },
  2: {
    icon: <MenuBookIcon />,
    label: 'Novice',
  },
  3: {
    icon: <HotTubIcon />,
    label: 'Comfortable',
  },
  4: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Experienced',
  },
  5: {
    icon: <StarsIcon />,
    label: 'Proficient',
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

interface RatingProps {
  legend: string;
  value: number;
}

const RatingComponent: React.FC<RatingProps> = (props: RatingProps) => {
  const classes = useStyles();

  return (
    <Box component='fieldset' mb={1} borderColor='transparent' className={classes.rating}>
      <Typography variant='body1'>{props.legend}</Typography>
      <div className={classes.wrapper}>
        <StyledRating
          readOnly
          size='large'
          name='customized-icons'
          defaultValue={props.value}
          IconContainerComponent={IconContainer}
        />
        <Typography variant='body1' component='p'>{customIcons[props.value].label}</Typography>
      </div>
    </Box>
  )
}

export default RatingComponent;