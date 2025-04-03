export const getBackgroundImage = (backgroundImg, isMobile, isTablet, isDesktop) => {
  if (!backgroundImg) return '';

  if (isMobile) {
    return backgroundImg.mobile;
  } else if (isTablet) {
    return backgroundImg.tablet;
  } else if (isDesktop) {
    return backgroundImg.desktop;
  }
};