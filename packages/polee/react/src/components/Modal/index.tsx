import { type ReactNode, useEffect, useRef } from 'react';

const modalRoot = document.getElementById('modal-root') || document.createElement('div');
if (!document.getElementById('modal-root')) {
  modalRoot.id = 'modal-root';
  document.body.appendChild(modalRoot);
}

const modalRegistry: Record<string, { container: HTMLDivElement }> = {};

export interface ModalShowOption {
  shouldCloseOnOverlayClick?: boolean;
  shouldCloseOnEsc?: boolean;
}

export type ModalAnimationType =
  | 'fade-in'
  | 'fade-out'
  | 'slide-up'
  | 'slide-down'
  | 'fade-in-slide-up'
  | 'fade-in-slide-down'
  | 'fade-out-slide-up'
  | 'fade-out-slide-down';

export interface ModalProps extends ModalShowOption {
  content: ReactNode;
  onClose: VoidFunction;
  enterAnimation?: ModalAnimationType;
  exitAnimation?: Omit<ModalAnimationType, 'fade-in' | 'fade-in-slide-up' | 'fade-in-slide-down'>;
}

export function Modal({
  content,
  onClose,
  shouldCloseOnOverlayClick,
  shouldCloseOnEsc,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (shouldCloseOnEsc) {
      // esc
    }

    if (shouldCloseOnOverlayClick) {
      // dim close
    }
  }, [onClose, shouldCloseOnOverlayClick, shouldCloseOnEsc]);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      aria-labelledby={'팝업'}
      aria-describedby={'팝업에 대한 설명'}
      onClick={() => {
        if (shouldCloseOnOverlayClick) onClose();
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>{content}</div>
    </div>
  );
}

export function show(content: ReactNode, options?: ModalShowOption) {
  const container = document.createElement('div');
  const modalId = Math.random().toString(36).slice(2);

  const onClose = () => {
    hide(modalId);
  };

  modalRoot.appendChild(container);

  modalRegistry[modalId] = { container };
  return modalId;
}

export function hide(modalId: string) {
  const modalInfo = modalRegistry[modalId];

  if (modalInfo && modalInfo.container.parentNode) {
    modalInfo.container.parentNode.removeChild(modalInfo.container);
    Reflect.deleteProperty(modalRegistry, modalId);
  }
}
