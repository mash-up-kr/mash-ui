import { type JSX, createSignal } from 'solid-js';
import { Portal, render } from 'solid-js/web';

import { generateUUID4 } from '../utils/uuid';
import { modals, setModals } from './store';

const [modalContainer, setModalContainer] = createSignal<HTMLDivElement | null>(null);

// TODO
export const show = (content: JSX.Element) => {
  const id = generateUUID4();
  setModals((modals) => ({ ...modals, [id]: content }));
  if (!modalContainer()) {
    setModalContainer(createModalRoot());
  }

  renderModals();
  return id;
};

export const hide = (id?: string) => {
  setModals((modals) => {
    if (id) {
      const { [id]: _, ...rest } = modals;
      return rest;
    }
    return {};
  });
  renderModals();
};

const renderModals = () => {
  const container = modalContainer();
  if (!container) return;

  render(
    () => (
      <>
        {Object.values(modals).map((content) => (
          <Portal>{content}</Portal>
        ))}
      </>
    ),
    container
  );
};

const createModalRoot = () => {
  const container = document.createElement('div');
  container.id = 'modal-root';
  document.body.appendChild(container);
  return container;
};
