export class ModalManager {
  private modals: Map<HTMLElement, number>;
  private listeners: Array<() => void>;

  constructor() {
    this.modals = new Map();
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

  subscribe(listner: () => void) {
    this.listeners = [...this.listeners, listner];
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listner);
    };
  }

  getSnapshot() {
    return this.modals;
  }

  emitChange() {
    for (const listner of this.listeners) {
      listner();
    }
  }
}

export const modalManager = new ModalManager();
