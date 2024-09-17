import { useState } from 'react';

import { BREAKPOINTS } from '@/shared/constants/breakpoints';
import useResize from '@/shared/hooks/useResize';

export default function useWindowWidth() {
  const [isLaptop, setIsLaptop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSTablet, setIsSTablet] = useState(false);
  const [isLMobile, setIsLMobile] = useState(false);
  const [isMMobile, setIsMMobile] = useState(false);
  const [isSMobile, setIsSMobile] = useState(false);

  useResize(() => {
    setIsLaptop(window.innerWidth <= BREAKPOINTS.LAPTOP);
    setIsTablet(window.innerWidth <= BREAKPOINTS.TABLET);
    setIsSTablet(window.innerWidth <= BREAKPOINTS.S_TABLET);
    setIsLMobile(window.innerWidth <= BREAKPOINTS.L_MOBILE);
    setIsMMobile(window.innerWidth <= BREAKPOINTS.M_MOBILE);
    setIsSMobile(window.innerWidth <= BREAKPOINTS.S_MOBILE);
  });

  return {
    isLaptop,
    isTablet,
    isSTablet,
    isLMobile,
    isMMobile,
    isSMobile,
  };
}
