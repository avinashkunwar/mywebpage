import React, { useRef, useState, useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography, Slide, List, ListItem } from '@material-ui/core';
import { useScrollPosition, vh } from '../../@utils/useScrollPosition';
import { info } from '../../assets/data/info';
import TimelineCard from '../interactive/TimelineCard';
import { getSlideDirection } from '../../@utils/getSlideDirection';
import { ExperienceStyleProps, CardData } from '../../@types';
import ScrollDownMouse from '../shapes/ScrollDownMouse';
import { CurrentPageView } from '../../contexts/CurrentPageView';
import { CONTAINER_OFFSET } from '../../@constants';

const SCROLL_THRESHOLD = vh * 0.75;
const TIMELINE_WIDTH = 6;

const useStyles = makeStyles<Theme, ExperienceStyleProps>((theme: Theme) => ({
  experience: {
    display: 'flex',
    alignItems: 'flex-start',
    height: '300%',
    marginBottom: 100
  },
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: '#7F7F7F',
  },
  title: {
    margin: '50px 0 10px',
    '& h1': {
      fontWeight: 500,
    },
  },
  subtitle: {
    textAlign: 'center',
    color: styleProps => styleProps.scroll ? theme.palette.secondary.main : theme.palette.background.default,
    transition: '0.5s ease',
    margin: '10px 0',
    '& h2': {
      fontWeight: 500,
      marginBottom: 10,
    },
    '& #mouse': {
      '& span': {
        borderColor: styleProps => styleProps.scroll ? theme.palette.secondary.main : theme.palette.background.default,
        transition: '0.5s ease',
        transform: styleProps => styleProps.scroll ? 'scale(1.2)' : 'scale(1)',
        '&:before': {
          backgroundColor: styleProps => styleProps.scroll ? theme.palette.secondary.main : theme.palette.background.default,
          transition: '0.5s ease',
        }
      },
    }
  },
  container: {
    width: '90%',
    textAlign: 'center',
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    backgroundColor: styleProps => styleProps.scroll ? theme.palette.primary.main : theme.palette.primary.contrastText,
    borderRadius: '50%',
    transform: styleProps => `translate(-${styleProps.scroll ? 15 : 7.5}px, -10px)`,
    height: styleProps => styleProps.scroll ? 30 : 15,
    width: styleProps => styleProps.scroll ? 30 : 15,
    transition: '0.5s ease',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);',
    zIndex: 1,
    '&:after': {
      fontFamily: 'Material Icons',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      left: '50%',
      top: 0,
      transform: 'translate(-50%)',
      content: styleProps => styleProps.scroll ? '"radio_button_unchecked"' : '""',
      fontSize: styleProps => styleProps.scroll ? 30 : 0,
      transitionDelay: '0.2s',
      color: theme.palette.secondary.contrastText,
    },
  },
  timeline: {
    marginBottom: 20,
    '& ul': {
      padding: 0,
      '&:before': {
        position: 'absolute',
        content: '""',
        width: TIMELINE_WIDTH,
        height: styleProps => styleProps.scroll,
        maxHeight: styleProps => styleProps.maxScroll,
        backgroundColor: theme.palette.primary.main,
        transform: 'translateX(-50%)',
        borderRadius: '0 0 100% 100% / 0 0 15px 15px',
        zIndex: 1,
      },
      '& li': {
        display: 'list-item',
        padding: 0,
        textAlign: 'center',
        listStyleType: 'none',
        position: 'relative',
        width: 6,
        margin: '0 auto',
        paddingTop: 50,
        background: theme.palette.primary.contrastText,
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);', //0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
        '&:after': {
          fontFamily: 'Material Icons',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-50%)',
          zIndex: 1,
          color: theme.palette.secondary.contrastText,
          borderRadius: '20%',
          transition: '0.5s ease',
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);',
        },
        '&:nth-child(odd) .MuiCard-root': {
          left: 45,
          '&:before': {
            left: -15,
            borderWidth: '8px 16px 8px 0',
            borderColor: `transparent ${theme.palette.background.paper} transparent transparent`
          }
        },
        '&:nth-child(even) .MuiCard-root': {
          left: -509,
          '&:before': {
            right: -15,
            borderWidth: '8px 0 8px 16px',
            borderColor: `transparent transparent transparent ${theme.palette.background.paper}`
          }
        },
      },
      '& .MuiCard-root': {
        position: 'relative',
        overflow: 'visible',
        bottom: 0,
        width: 470,
        padding: 0,
        background: theme.palette.background.paper,
        borderRadius: 10,
        animation: '$pulse 1.5s ease infinite',
        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
        '&:before': {
          content: '""',
          position: 'absolute',
          bottom: 7,
          width: 0,
          height: 0,
          borderStyle: 'solid',
        },
        '&:hover': {
          animation: '',
        }
      },
      '& .MuiCardMedia-root': {
        height: 250,
        borderRadius: '10px 10px 0 0',
      },
      '& time': {
        display: 'block',
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: 8,
      },
      '& p': {
        textAlign: 'justify',
      }
    }
  },
  card1: {
    '&:after': {
      content: styleProps => styleProps.firstCheck ? '"school"' : '""',
      fontSize: styleProps => styleProps.firstCheck ? 20 : 0,
      width: styleProps => styleProps.firstCheck ? 30 : 15,
      height: styleProps => styleProps.firstCheck ? 30 : 15,
      backgroundColor: styleProps => styleProps.firstCheck ? '#FF5755' : theme.palette.primary.contrastText,
    },
  },
  card2: {
    '&:after': {
      content: styleProps => styleProps.secondCheck ? '"work"' : '""',
      fontSize: styleProps => styleProps.secondCheck ? 20 : 0,
      width: styleProps => styleProps.secondCheck ? 30 : 15,
      height: styleProps => styleProps.secondCheck ? 30 : 15,
      backgroundColor: styleProps => styleProps.secondCheck ? '#AD3AEA' : theme.palette.primary.contrastText,
    },
  },
  card3: {
    '&:after': {
      content: styleProps => styleProps.thirdCheck ? '"assignment"' : '""',
      fontSize: styleProps => styleProps.thirdCheck ? 20 : 0,
      width: styleProps => styleProps.thirdCheck ? 30 : 15,
      height: styleProps => styleProps.thirdCheck ? 30 : 15,
      backgroundColor: styleProps => styleProps.thirdCheck ? '#7ED857' : theme.palette.primary.contrastText,
    },
  },
  card4: {
    '&:after': {
      content: styleProps => styleProps.fourthCheck ? '"school"' : '""',
      fontSize: styleProps => styleProps.fourthCheck ? 20 : 0,
      width: styleProps => styleProps.fourthCheck ? 30 : 15,
      height: styleProps => styleProps.fourthCheck ? 30 : 15,
      backgroundColor: styleProps => styleProps.fourthCheck ? '#EAA03A' : theme.palette.primary.contrastText,
    },
  },
  card5: {
    '&:after': {
      content: styleProps => styleProps.fifthCheck ? '"assignment"' : '""',
      fontSize: styleProps => styleProps.fifthCheck ? 20 : 0,
      width: styleProps => styleProps.fifthCheck ? 30 : 15,
      height: styleProps => styleProps.fifthCheck ? 30 : 15,
      backgroundColor: styleProps => styleProps.fifthCheck ? '#ff6ec7' : theme.palette.primary.contrastText,
    },
  },
  '@media only screen and (max-width: 1700px)': {
    timeline: {
      '& ul': {
        '& .MuiCard-root': {
          width: 430,
        },
        '& li': {
          '&:nth-child(even) .MuiCard-root': {
            left: -469,
          }
        }
      }
    },
  },
  '@media only screen and (max-width: 1400px)': {
    timeline: {
      '& ul': {
        '& .MuiCard-root': {
          width: 350,
        },
        '& li': {
          '&:nth-child(even) .MuiCard-root': {
            left: -389,
          }
        }
      }
    },
  },
  '@media only screen and (max-width: 1200px)': {
    circle: {
      left: 23, //TIMELINE_WIDTH /2 + marginLeft
    },
    timeline: {
      '& ul': {
        '&:before': {
          left: 23
        },
        '& .MuiCard-root': {
          width: 'calc(100vw - 480px)',
        },
        '& li': {
          marginLeft: 20,
          '&:nth-child(even) .MuiCard-root': {
            left: 45,
            '&:before': {
              left: -15,
              borderWidth: '8px 16px 8px 0',
              borderColor: `transparent ${theme.palette.background.paper} transparent transparent`
            }
          },
        }
      }
    },
  },
  '@media only screen and (max-width: 960px)': {
    circle: {
      left: 23, //TIMELINE_WIDTH /2 + marginLeft
    },
    timeline: {
      '& ul': {
        '&:before': {
          left: 23
        },
        '& .MuiCard-root': {
          width: 'calc(100vw - 300px)',
        },
        '& li': {
          marginLeft: 20,
          '&:nth-child(even) .MuiCard-root': {
            left: 45,
            '&:before': {
              left: -15,
              borderWidth: '8px 16px 8px 0',
              borderColor: `transparent ${theme.palette.background.paper} transparent transparent`
            }
          },
        }
      }
    },
  },
  '@media only screen and (max-width: 600px)': {
    circle: {
      left: 23, //TIMELINE_WIDTH/2 + marginLeft
    },
    timeline: {
      '& ul': {
        '&:before': {
          left: 23
        },
        '& .MuiCard-root': {
          width: 'calc(100vw - 170px)',
        },
        '& li': {
          marginLeft: 20,
          '&:nth-child(even) .MuiCard-root': {
            left: 45,
            '&:before': {
              left: -15,
              borderWidth: '8px 16px 8px 0',
              borderColor: `transparent ${theme.palette.background.paper} transparent transparent`
            }
          },
        },
        '& .MuiCardMedia-root': {
          height: 150,
          borderRadius: '10px 10px 0 0',
        },
      }
    },
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1.02)',
      boxShadow: '0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12)',
    },
    '70%': {
      transform: 'scale(1)',
      boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
    },
    '100%': {
      transform: 'scale(1.02)',
      boxShadow: '0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12)',
    }
  },
}));

const Timeline: React.FC = () => {
  const { setCurrentPage } = useContext(CurrentPageView);

  const timelineRef = useRef<HTMLUListElement>(null);
  const firstRef = useRef<HTMLSpanElement>(null);
  const secondRef = useRef<HTMLSpanElement>(null);
  const thirdRef = useRef<HTMLSpanElement>(null);
  const fourthRef = useRef<HTMLSpanElement>(null);
  const fifthRef = useRef<HTMLSpanElement>(null);

  const [scroll, setScroll] = useState<number>(0);
  const containerHeight = timelineRef.current?.clientHeight;

  const [firstCheck, setFirstCheck] = useState<boolean>(false);
  const [secondCheck, setSecondCheck] = useState<boolean>(false);
  const [thirdCheck, setThirdCheck] = useState<boolean>(false);
  const [fourthCheck, setFourthCheck] = useState<boolean>(false);
  const [fifthCheck, setFifthCheck] = useState<boolean>(false);

  useScrollPosition(({ currPos }: any) => {
    currPos.y < SCROLL_THRESHOLD + 40 ? setFirstCheck(true) : setFirstCheck(false);
  }, firstRef, false);

  useScrollPosition(({ currPos }: any) => {
    currPos.y < SCROLL_THRESHOLD + 40 ? setSecondCheck(true) : setSecondCheck(false);
  }, secondRef, false);

  useScrollPosition(({ currPos }: any) => {
    currPos.y < SCROLL_THRESHOLD + 40 ? setThirdCheck(true) : setThirdCheck(false);
  }, thirdRef, false);

  useScrollPosition(({ currPos }: any) => {
    currPos.y < SCROLL_THRESHOLD + 40 ? setFourthCheck(true) : setFourthCheck(false);
  }, fourthRef, false);

  useScrollPosition(({ currPos }: any) => {
    currPos.y < SCROLL_THRESHOLD + 40 ? setFifthCheck(true) : setFifthCheck(false);
  }, fifthRef, false);

  useScrollPosition(({ currPos }: any) => {
    currPos.y < SCROLL_THRESHOLD + 40 ? setScroll(-(currPos.y - SCROLL_THRESHOLD)) : setScroll(0);
    if (containerHeight) {
      if (CONTAINER_OFFSET > currPos.y && currPos.y > -containerHeight + CONTAINER_OFFSET) setCurrentPage('Timeline');
    };
  }, timelineRef, false);

  const styleProps: ExperienceStyleProps = {
    firstCheck: firstCheck,
    secondCheck: secondCheck,
    thirdCheck: thirdCheck,
    fourthCheck: fourthCheck,
    fifthCheck: fifthCheck,
    scroll: timelineRef.current ? scroll : 0,
    maxScroll: timelineRef.current ? timelineRef.current.clientHeight : 0,
  }

  const classes = useStyles(styleProps);

  const cardList = info.timeline.cards.map((item: CardData, index: number) => {
    return <TimelineCard
      title={item.title}
      date={item.date}
      role={item.role}
      description={item.description}
      descriptionSecondPart={item.descriptionSecondPart}
      projectLink={item.projectLink}
      image={item.image}
      cardDialogContent={item.cardDialogContent}
      direction={getSlideDirection(index)} />
  });

  return (
    <Grid container spacing={3} className={classes.experience} id='timeline'>
      <div className={classes.divider} />
      <Grid item xs={12} className={classes.title}>
        <Typography variant='h3' component='h1'>{info.timeline.title}</Typography>
      </Grid>
      <Grid item xs={12} className={classes.subtitle}>
        <Typography variant='h5' component='h2'>{info.timeline.subtitle}</Typography>
        <ScrollDownMouse />
      </Grid>
      <Grid item xs={12} className={classes.container}>
        <section className={classes.timeline}>
          <List ref={timelineRef}>
            <span className={classes.circle} />
            <ListItem className={classes.card1}>
              <Slide in={firstCheck} direction={getSlideDirection(0)}>
                <div>
                  {cardList[0]}
                  <span ref={firstRef} />
                </div>
              </Slide>
            </ListItem>
            <ListItem className={classes.card2}>
              <Slide in={secondCheck} direction={getSlideDirection(1)}>
                <div>
                  {cardList[1]}
                  <span ref={secondRef} />
                </div>
              </Slide>
            </ListItem>
            <ListItem className={classes.card3}>
              <Slide in={thirdCheck} direction={getSlideDirection(2)}>
                <div>
                  {cardList[2]}
                  <span ref={thirdRef} />
                </div>
              </Slide>
            </ListItem>
            <ListItem className={classes.card4}>
              <Slide in={fourthCheck} direction={getSlideDirection(3)}>
                <div>
                  {cardList[3]}
                  <span ref={fourthRef} />
                </div>
              </Slide>
            </ListItem>
            <ListItem className={classes.card5}>
              <Slide in={fifthCheck} direction={getSlideDirection(4)}>
                <div>
                  {cardList[4]}
                  <span ref={fifthRef} />
                </div>
              </Slide>
            </ListItem>
          </List>
        </section>
      </Grid>
    </Grid>
  );
}

export default Timeline;
