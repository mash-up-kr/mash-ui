import type { CSSProperties, ForwardedRef, ReactNode, RefObject } from 'react';
import { forwardRef, useCallback, useEffect, useId, useMemo, useRef } from 'react';

import type { CustomAnimation, EnterAnimation, ExitAnimation } from '../../hooks/useAnimation';
import useAnimation from '../../hooks/useAnimation';
import useEventListener from '../../hooks/useEventListener';
import { mergeRefs } from '../../utils/mergeRef';
import Portal from './Portal';

export interface ModalProps {
  children: ReactNode;
  onClose: VoidFunction;
  isOpen: boolean;
  dim?: boolean;
  dimStyle?: CSSProperties;
  shouldCloseOnDimClick?: boolean;
  enterAnimation?: EnterAnimation;
  exitAnimation?: ExitAnimation;
  preventBackgroundScroll?: boolean;
  shouldCloseOnEsc?: boolean;
  animationDuration?: string | number;
  slideAnimationDistance?: string;
  mountNode?: RefObject<HTMLElement>;
  customAnimations?: {
    enter?: CustomAnimation;
    exit?: CustomAnimation;
  };
  ariaLabelledby?: string;
  ariaDescribedby?: string;
}

const getDimStyle = (dimStyle?: CSSProperties): CSSProperties => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: -1,
  ...dimStyle,
});

const Modal = forwardRef((props: ModalProps, ref: ForwardedRef<HTMLDivElement>) => {
  const {
    children,
    onClose,
    dimStyle,
    isOpen,
    enterAnimation,
    exitAnimation,
    animationDuration,
    slideAnimationDistance,
    customAnimations,
    ariaLabelledby,
    ariaDescribedby,
    mountNode,
    dim = true,
    preventBackgroundScroll = true,
    shouldCloseOnDimClick = true,
    shouldCloseOnEsc = true,
  } = props;
  const modalRef = useRef<HTMLDivElement>(null);

  const portalId = useId();

  useEventListener('keydown', (event: KeyboardEvent) => {
    if (shouldCloseOnEsc && event.key === 'Escape') {
      onClose();
    }
  });

  useAnimation({
    ref: modalRef,
    enterAnimation: customAnimations?.enter ? 'custom-enter' : enterAnimation,
    exitAnimation: customAnimations?.exit ? 'custom-exit' : exitAnimation,
    animationDuration,
    slideAnimationDistance,
    customAnimations,
  });

  useEffect(() => {
    if (preventBackgroundScroll && isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (preventBackgroundScroll) {
        document.body.style.overflow = '';
      }
    };
  }, [preventBackgroundScroll, isOpen]);

  const handleDimClick = useCallback(() => {
    if (shouldCloseOnDimClick) {
      onClose();
    }
  }, [onClose, shouldCloseOnDimClick]);

  const mergedDimStyle = useMemo(() => getDimStyle(dimStyle), [dimStyle]);

  const modalStyle = useMemo(() => {
    const styles: CSSProperties = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9996,
    };
    return styles;
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal id={portalId} containerRef={mountNode}>
      <div
        ref={mergeRefs([modalRef, ref])}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        style={modalStyle}
      >
        {dim && <div style={mergedDimStyle} onClick={handleDimClick} />}
        {children}
      </div>
    </Portal>
  );
});

Modal.displayName = 'Modal';

export default Modal;
