export class ModalManager {
  private modals: Map<HTMLElement, number>;
  private listeners: Array<() => void>;
  closeOnOverlayClick?: boolean;

  constructor() {
    this.modals = new Map();
    this.closeOnOverlayClick = true;
    this.listeners = [];
  }

  add(modal: HTMLElement) {
    const index = this.modals.size + 1;
    this.modals.set(modal, index);
    this.emitChange();
    return index;
  }

  remove(modal: HTMLElement) {
    this.modals.delete(modal);
    this.emitChange();
  }

  isTopModal(modal: HTMLElement | null) {
    if (!modal) return false;
    return this.modals.get(modal) === this.modals.size;
  }

  setCloseOnOverlayClick(value: boolean) {
    this.closeOnOverlayClick = value;
    this.emitChange();
  }

  subscribe(listener: () => void) {
    this.listeners = [...this.listeners, listener];
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  getSnapshot() {
    return this.modals;
  }

  getCloseOnOverlayClickSnapshot() {
    return this.closeOnOverlayClick;
  }

  emitChange() {
    for (const listener of this.listeners) {
      listener();
    }
  }
}

export const modalManager = new ModalManager();
