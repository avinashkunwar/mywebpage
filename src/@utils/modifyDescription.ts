import { vw } from "./useScrollPosition";

export const modifyDescription = (description: string, words: number = 405) => {
  if (description.length > words) {
    const newDescription = description.slice(0, (words - 5)) + ' ...'
    return newDescription;
  } else if (vw < 600) {
    const newDescription = description.slice(0, 200) + ' ...'
    return newDescription;
  };
  return description
};