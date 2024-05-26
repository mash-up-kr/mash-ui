import { useEffect, useState, type RefObject } from 'react';

const useModalAnimation = (
  ref: RefObject<HTMLDivElement>,
  isOpen: boolean,
  onClose: VoidFunction,
  animationDuration: number = 300
) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (ref.current) {
        ref.current.style.opacity = '0';
        ref.current.style.transform = 'translateY(-20px)';
        ref.current.style.visibility = 'visible';
        ref.current.style.transition = `opacity ${animationDuration}ms, transform ${animationDuration}ms`;
        requestAnimationFrame(() => {
          if (ref.current) {
            ref.current.style.opacity = '1';
            ref.current.style.transform = 'translateY(0)';
          }
        });
      }
    } else if (ref.current) {
      setIsAnimating(true);
      ref.current.style.opacity = '1';
      ref.current.style.transform = 'translateY(0)';
      ref.current.style.transition = `opacity ${animationDuration}ms, transform ${animationDuration}ms`;
      requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.opacity = '0';
          ref.current.style.transform = 'translateY(-20px)';
        }
      });

      setTimeout(() => {
        if (ref.current) {
          ref.current.style.visibility = 'hidden';
        }
        onClose();
        setIsAnimating(false);
        setIsVisible(false);
      }, animationDuration);
    }
  }, [isOpen, ref, onClose, animationDuration]);

  return isAnimating || isVisible;
};

export default useModalAnimation;
