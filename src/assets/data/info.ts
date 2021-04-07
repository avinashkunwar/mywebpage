import ProfileImage from '../images/profile/profile.png';
import ProfileImageDark from '../images/profile/profile-dark.png';
import ProfileImageAvatar from '../images/profile/profile-avatar.png';
import ProfileImageDarkAvatar from '../images/profile/profile-dark-avatar.png';
import { places } from './places';
import { pictures } from './pictures';
import { subsections } from './subsections';
import { cards } from './cards';
import { Info } from '../../@types';
import { mainPlaces } from './mainPlaces';

export const info: Info = {
  profile: {
    image: ProfileImage,
    imageDark: ProfileImageDark,
    imageAvatar: ProfileImageAvatar,
    imageDarkAvatar: ProfileImageDarkAvatar,
    captionFirstLine: `I'm an imaginative and fun-loving Software Engineer,`,
    captionSecondLine: ` based in Singapore`
  },
  about: {
    title: `I write code.`,
    description: `Not just any code. I believe in writing code with both structure and readability, and as a developer, enjoy optimising and improving the quality of the code 
    that I write. I have good knowledge in front-end, back-end, as well as mobile application development, and plan to venture into the field of blockchain or
    artificial intelligence.`,
    descriptionSecondPart: `A technology enthusiast, I am hopeful and passionate about the potential of technology in changing the world. From simple websites
    to complex systems, I thoroughly enjoy the process of building software, solving complex problems, and working with others to produce amazing end-products.`,
  },
  timeline: {
    title: `What I've Done So Far`,
    subtitle: `My journey begins here`,
    caption: ``,
    cards: cards,
  },
  blog: {
    title: `What I've Written`
  },
  abilities: {
    title: `What I Can Do`,
    description:  `I have been coding at a professional level for a year and have experience in an array of modern web technologies such as React, TypeScript, React Native,
    and Django REST Framework. I am also adept in using development tools such as git and AWS, and design / prototyping tools such as Invision Studio and Affinity Designer.
    On the sideline, I enjoy building web applications and tinkering with the Arduino.`,
    subsections: subsections,
    note: `Note: Skills are portrayed relative to each other and not on an absolute level (learning never stops!)`,
  },
  travel: {
    title: `Where I've Been`,
    description: `Travelling greatly excites me. I love experiencing new cultures, immersing myself in breathtaking sceneries, as well as eating amazing food. I hope to one day 
    fill this map with even more locations that I've visited.`,
    caption: `Here are some snapshots I took from the places I've been recently.`,
    places: places,
    mainPlaces: mainPlaces,
    pictures: pictures,
  }
}