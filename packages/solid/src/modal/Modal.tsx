import type { Accessor, JSX, ParentComponent } from 'solid-js';
import { Show, createSignal, mergeProps } from 'solid-js';
import { Portal } from 'solid-js/web';

import Backdrop from './Backdrop';
import injectAnimation from './hooks/inject-animation';
import useClickOutside from './hooks/use-click-outside';
import { useKeyStroke } from './hooks/use-key-stroke';
import usePreventBodyScroll from './hooks/use-prevent-body-scroll';

interface ModalProps {
  isOpen: Accessor<boolean>;
  onClose: VoidFunction;
  initial?: JSX.CSSProperties;
  animate?: JSX.CSSProperties;
  exit?: JSX.CSSProperties;
  dimStyle?: JSX.CSSProperties;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  preventBackgroundScroll?: boolean;
  shouldCloseOnDimClick?: boolean;
  shouldCloseOnESC?: boolean;
}

const Modal: ParentComponent<ModalProps> = (defaultProps) => {
  const props = mergeProps(
    {
      shouldCloseOnDimClick: true,
      shouldCloseOnESC: true,
      preventBackgroundScroll: true,
    },
    defaultProps
  );

  const [modalRef, setModalRef] = createSignal<HTMLDivElement | null>(null);

  const startExitAnimation = injectAnimation(modalRef, props.initial, props.animate, props.exit);

  const closeModal = () => {
    startExitAnimation();
    setTimeout(() => {
      props.onClose();
    }, 300);
  };

  useKeyStroke(['Escape'], () => {
    if (props.isOpen() && props.shouldCloseOnESC) {
      closeModal();
    }
  });

  const onCloseDimClick = () => {
    if (props.isOpen() && props.shouldCloseOnDimClick) {
      closeModal();
    }
  };
  useClickOutside(modalRef, onCloseDimClick, 'pointerdown');

  usePreventBodyScroll({ isOpen: props.isOpen });

  return (
    <Portal>
      <Show when={props.isOpen()}>
        <>
          <Backdrop style={props.dimStyle} />

          <div
            ref={setModalRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            aria-labelledby={props.ariaLabelledby}
            aria-describedby={props.ariaDescribedby}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              'z-index': 9999,
              transition: 'all 0.3s',
            }}
          >
            {props.children}
          </div>
        </>
      </Show>
    </Portal>
  );
};

export default Modal;
