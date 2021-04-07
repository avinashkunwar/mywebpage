import { vw } from './useScrollPosition';

export const getSlideDirection = (index: number) => {
  return index % 2 || vw < 1200 ? 'left' : 'right'
}