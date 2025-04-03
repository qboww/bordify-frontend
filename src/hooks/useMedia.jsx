import { useMediaQuery } from 'react-responsive';

export const useMedia = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 767.999px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width: 768px) and (max-width: 1439.998px)',
  });
  const isDesktop = useMediaQuery({
    query: '(min-width: 1440px)',
  });
  return {
    isDesktop,
    isTablet,
    isMobile,
  };
};
