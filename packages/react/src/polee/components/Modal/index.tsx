import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  ForwardedRef,
  ReactNode,
  RefObject,
} from 'react';
import { forwardRef, useEffect, useId, useMemo, useRef } from 'react';

import { mergeRefs } from '@mash-ui/utils';
import { useClickOutside } from '../../hooks/use-click-outside';
import useEventListener from '../../hooks/use-event-listener';
import useModalTransition from '../../hooks/use-modal-transition';
import Portal from './Portal';

export interface ModalProps {
  children: ReactNode;
  onClose: VoidFunction;
  isOpen: boolean;
  shouldCloseOnDimClick?: boolean;
  initial?: CSSProperties;
  animate?: CSSProperties;
  exit?: CSSProperties;
  preventBackgroundScroll?: boolean;
  shouldCloseOnEsc?: boolean;
  mountNode?: RefObject<HTMLElement>;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
}

const Backdrop = (props: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      {...props}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9995,
        backgroundColor: 'rgb(0 0 0 / 0.4)',
        ...props.style,
      }}
    />
  );
};

const Modal = forwardRef((props: ModalProps, ref: ForwardedRef<HTMLDivElement>) => {
  const {
    children,
    onClose,
    isOpen,
    initial,
    animate,
    exit,
    ariaLabelledby,
    ariaDescribedby,
    mountNode,
    preventBackgroundScroll = true,
    shouldCloseOnDimClick = true,
    shouldCloseOnEsc = true,
  } = props;
  const portalId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const { state, styles } = useModalTransition(isOpen, initial, animate, exit);

  useEventListener('keydown', (event: KeyboardEvent) => {
    if (shouldCloseOnEsc && event.key === 'Escape') {
      onClose();
    }
  });

  useEffect(() => {
    if (preventBackgroundScroll && state !== 'unmounted') {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (preventBackgroundScroll) {
        document.body.style.overflow = '';
      }
    };
  }, [preventBackgroundScroll, state]);

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

  useClickOutside(
    modalRef,
    () => {
      if (shouldCloseOnDimClick) {
        onClose();
      }
    },
    { event: 'pointerdown' }
  );

  if (!isOpen && state === 'unmounted') {
    return null;
  }

  return (
    <Portal id={portalId} containerRef={mountNode}>
      <Backdrop />

      <div
        ref={mergeRefs([modalRef, ref])}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        style={{ ...modalStyle, ...styles }}
      >
        {children}
      </div>
    </Portal>
  );
});

Modal.displayName = 'Modal';

export default Modal;
