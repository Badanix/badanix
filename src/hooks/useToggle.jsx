import { useState } from 'react';

const useToggle = (initialState = false) => {
  const [isVisible, setIsVisible] = useState(initialState);

  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);
  const toggle = () => setIsVisible((prev) => !prev);

  return {
    isVisible,
    open,
    close,
    toggle,
  };
};

export default useToggle;
