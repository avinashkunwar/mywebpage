export const isIos = () => {
    if (/iPad|iPhone|iPod/.test(navigator.platform)) {
      return true;
    } else {
      return navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2 &&
        /MacIntel/.test(navigator.platform);
    }
}