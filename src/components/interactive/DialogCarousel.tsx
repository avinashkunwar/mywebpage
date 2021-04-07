import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MobileStepper, IconButton } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { CardDialogImage } from '../../@types';
import { vh } from '../../@utils/useScrollPosition';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
export const IMAGE_HEIGHT = vh < 900 ? 250 : 400;
export const PAPER_OFFSET = 50;

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    height: IMAGE_HEIGHT,
    width: '100%',
    '& .MuiMobileStepper-root': {
      background: 'rgba(0,0,0,0)',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '3rem',
    },
    '& .react-swipeable-view-container': {
      height: IMAGE_HEIGHT,
    },
  },
  imgWrapper: {
    height: IMAGE_HEIGHT,
    width: '100%',
  },
  img: {
    height: IMAGE_HEIGHT,
    display: 'block',
    width: '100%',
    overflow: 'hidden',
  },
  stepper: {
    transform: `translateY(calc(-100% - ${PAPER_OFFSET}px))`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiSvgIcon-root': {
      fontSize: '2.5rem'
    }
  },
  arrowButtonLeft: {
    position: 'absolute',
    top: `calc(-${IMAGE_HEIGHT}px * 0.58 + ${PAPER_OFFSET}px)`,
    left: 0,
  },
  arrowButtonRight: {
    position: 'absolute',
    top: `calc(-${IMAGE_HEIGHT}px * 0.58 + ${PAPER_OFFSET}px)`,
    right: 0,
  },
});

interface DialogCarouselProps {
  carousel: Array<CardDialogImage>;
}

const DialogCarousel: React.FC<DialogCarouselProps> = (props: DialogCarouselProps) => {
  const dialogCarouselStyles = useStyles();

  const data = props.carousel;

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const maxSteps = data.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className={dialogCarouselStyles.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {data.map((step: any, index: any) => (
          <div className={dialogCarouselStyles.imgWrapper} key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={dialogCarouselStyles.img} src={step.image} alt={step.caption} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      {maxSteps < 2 ? (
        null
      ) : (
          <MobileStepper
            className={dialogCarouselStyles.stepper}
            steps={maxSteps}
            position='static'
            variant='dots'
            activeStep={activeStep}
            nextButton={
              <IconButton size='small' className={dialogCarouselStyles.arrowButtonRight} onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </IconButton>
            }
            backButton={
              <IconButton size='small' className={dialogCarouselStyles.arrowButtonLeft} onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              </IconButton>
            }
          />
        )}

    </div>
  );
}

export default DialogCarousel;
