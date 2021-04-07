import NjcCover from '../images/cards/national-junior-college/national-junior-college-1024x683.jpg';
import BoogleCover from '../images/cards/boogle/boogle-hq.jpg';
import PersonalWebsiteV1Cover from '../images/cards/personal-website-v1/personal-website-v1.png';
import YaleNusCover from '../images/cards/yale-nus/yale-nus.png';
import CodeCacheCover from '../images/cards/codecache/codecache.png';
import { CardData } from '../../@types';

import NJC1 from '../images/cards/national-junior-college/carousel1.jpg';
import Boogle1 from '../images/cards/boogle/carousel1.jpg';
import PW1 from '../images/cards/personal-website-v1/carousel1.png';
import PW2 from '../images/cards/personal-website-v1/carousel2.png';
import C1 from '../images/cards/codecache/carousel1.png';
import C2 from '../images/cards/codecache/carousel2.png';
import C3 from '../images/cards/codecache/carousel3.png';
import C4 from '../images/cards/codecache/carousel4.png';
import C5 from '../images/cards/codecache/carousel5.png';
import C6 from '../images/cards/codecache/carousel6.png';

export const cards: Array<CardData> = [
  {
    title: `National Junior College`,
    date: `Nov 2017`,
    role: `[GCE 'A' Level Graduate]`,
    description: `I graduated from National Junior College in 2017 as a GCE 'A' Level Graduate from the Integrated Programme. My time here taught me to be a critical thinker and 
    nurtured my penchant for problem solving. It was also NJC that gave me my first leadership opportunity as the president of the NJC Symphonic Band, where I had the 
    experience of being part of a great team, and leading a great community.`,
    image: NjcCover,
    cardDialogContent: {
      carousel: [
        {
          caption: 'NJC',
          image: NjcCover
        },
        {
          caption: 'Picked up the saxophone here!',
          image: NJC1
        },
      ],
      infoList: [
        {
          infoTitle: 'Subjects',
          infoItems: [
            'H2 Mathematics',
            'H2 Economics',
            'H2 Physics',
            'H2 Chemistry',
            'H3 Economics'
          ],
        },
        {
          infoTitle: 'Awards and Scholarships',
          infoItems: [
            'MOE Pre-U Scholarship',
            'YDSP Academic Award for Mathematics'
          ]
        },
        {
          infoTitle: 'Positions Held',
          infoItems: [
            'Aug 2014 - Aug 2016: Section Leader, Symphonic Band',
            'Aug 2016 - Aug 2017: President, Symphonic Band'
          ]
        },
      ],
    }
  },
  {
    title: `Boogle Group Ltd`,
    date: `Oct 2019 - Sep 2020`,
    role: `[Software Engineer Intern]`,
    description: `My time at this vibrant startup has been nothing less than fruitful. It was here where I started designing and building sophisticated software from the ground up, and 
    learnt much of the coding best practices and standards which I still practice heavily today. During the months I was here, I was heavily involved in the front-end
    development, while occasionally finding myself immersed in the back-end and mobile development as well. I also had the opportunity to be part of an amazing product team,
    which allowed me, under the guidance of brilliant mentors, to carry out the process of bringing a product through its development cycle, from the ideation, 
    to the designing, coding, testing, and eventually, the deployment of the product.`,
    image: BoogleCover,
    cardDialogContent: {
      carousel: [
        {
          caption: 'Boogle',
          image: BoogleCover
        },
        {
          caption: 'Interacting with a younger batch of interns',
          image: Boogle1
        },
      ],
      infoList: [
        {
          infoTitle: 'Positions Held',
          infoItems: [
            'Oct 2019 - Jan 2020: Product Management Specialist Intern',
            'Jan 2020 - Jul 2020: Software Engineer Intern'
          ]
        },
        {
          infoTitle: 'Skills',
          infoItems: [
            'React',
            'Django',
            'React Native',
            'TypeScript',
            'Python',
            'MySQL',
            'AWS'
          ]
        }
      ]

    }
  },
  {
    title: `Personal Website`,
    date: `June 2020`,
    role: `V1`,
    description: `This website is the very first personal project I designed, built, and deployed on my own, and is also my first take on a personal website. Not only did 
    building this website allow me to put my development skills to the test, it was also a great sandbox for me to explore and experiment with new development and design techniques
    such as implementing a dark theme`,
    descriptionSecondPart: `, using React hooks, and being creative with scroll effects.`,
    projectLink: `https://github.com/leonardtng/personal-website`,
    image: PersonalWebsiteV1Cover,
    cardDialogContent: {
      carousel: [
        {
          caption: 'Personal Website Cover',
          image: PW1,
        },
        {
          caption: 'Tried out creating with dark theme',
          image: PW2,
        },
      ],
      infoList: [
        {
          infoTitle: 'Stack',
          infoItems: [
            'React',
            'TypeScript',
            'AWS',
          ]
        }
      ]
    }
  },
  {
    title: `Yale-NUS College`,
    date: `July 2020`,
    role: `[Undergraduate]`,
    description: `I am a current freshman at Yale-NUS College in the class of 2024. While I cannot be more excited, what the future holds for me here remains to be seen.`,
    image: YaleNusCover,
    cardDialogContent: {
      carousel: [
        {
          caption: 'Yale-NUS',
          image: YaleNusCover
        },
      ],
      infoList: [
        {
          infoTitle: 'Awards and Scholarships',
          infoItems: [
            'Global Leader Scholar',
          ]
        }
      ]
    }
  },
  {
    title: `CodeCache`,
    date: `November 2020`,
    role: `The lightweight code snippet manager built for developers and learners`,
    description: `My first full-stack project I designed, built and deployed during my first semester in college consisting of both a front-end and a back-end. Initially, 
    this project started off as a simple idea for a site that can store my code snippets. I eventually saw this idea through to build the final product, complete 
    with its own authentication system and fully functional code editor in a clean and simple UI. This project has allowed me to 
    improve on both my front-end and back-end skills, as well as important development tools such as AWS EC2, Lambda, and Docker.`,
    projectLink: `https://www.codecache.io`,
    image: CodeCacheCover,
    cardDialogContent: {
      carousel: [
        {
          caption: 'CodeCache Cover',
          image: C1
        },
        {
          caption: 'CodeCache Landing Page',
          image: C2
        },
        {
          caption: 'CodeCache Dashboard',
          image: C3
        },
        {
          caption: 'CodeCache Add Snippet',
          image: C4
        },
        {
          caption: 'CodeCache Stats Interface',
          image: C5
        },
        {
          caption: 'CodeCache Settings',
          image: C6
        },
      ],
      infoList: [
        {
          infoTitle: 'Stack',
          infoItems: [
            'React',
            'TypeScript',
            'Django REST Framework',
            'Docker',
            'AWS'
          ]
        }
      ]
    }
  },
]