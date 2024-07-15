import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from "react";

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ModalState = {
  id: string;
  args?: Record<string, unknown>;
  visible?: boolean;
  delayVisible?: boolean;
  keepMounted?: boolean;
};

export type ModalStore = Record<string, ModalState>;

export type ModalAction = {
  type: string;
  payload: {
    id: string;
    args?: Record<string, unknown>;
    flags?: Record<string, unknown>;
  };
};

type ModalCallbacks = {
  [id: string]: {
    resolve: (args: unknown) => void;
    reject: (args: unknown) => void;
    promise: Promise<unknown>;
  };
};

export type ModalHandler<Props = Record<string, unknown>> = Prettify<
  ModalState & {
    visible: boolean;
    keepMounted: boolean;
    show: (args?: Props) => Promise<unknown>;
    hide: () => Promise<unknown>;
    resolve: (args?: unknown) => void;
    reject: (args?: unknown) => void;
    remove: () => void;
    resolveHide: (args?: unknown) => void;
  }
>;

export type ModalHocProps = {
  id: string;
  defaultVisible?: boolean;
  keepMounted?: boolean;
};

type ModalComponent<P = any> = React.FC<P> & {
  [S in typeof symModalId]?: string;
};

const symModalId = Symbol.for("ModalId");
const initialState: ModalStore = {};

export const ModalContext = React.createContext<ModalStore>(initialState);
const ModalIdContext = React.createContext<string | null>(null);
const MODAL_REGISTRY: {
  [id: string]: {
    comp: ModalComponent;
    props?: Record<string, unknown>;
  };
} = {};

const ALREADY_MOUNTED: Record<string, boolean> = {};

let uidSeed = 0;
let dispatch: React.Dispatch<ModalAction> = () => {
  throw new Error(
    "No dispatch method detected, did you embed your app with Modal.Provider?"
  );
};

const getUid = () => `modal_${uidSeed++}`;

export const reducer = (
  state: ModalStore = initialState,
  action: ModalAction
): ModalStore => {
  switch (action.type) {
    case "modal/show": {
      const { id, args } = action.payload;

      return {
        ...state,
        [id]: {
          ...state[id],
          id,
          args,
          visible: !!ALREADY_MOUNTED[id],
          delayVisible: !ALREADY_MOUNTED[id],
        },
      };
    }
    case "modal/hide": {
      const { id } = action.payload;

      if (!state[id]) return state;

      return {
        ...state,
        [id]: {
          ...state[id],
          id,
          visible: false,
        },
      };
    }
    case "modal/remove": {
      const { id } = action.payload;
      const newState = { ...state };
      delete newState[id];
      return newState;
    }
    case "modal/set-flags": {
      const { id, flags } = action.payload;

      return {
        ...state,
        [id]: {
          ...state[id]!,
          ...flags,
        },
      };
    }
    default:
      return state;
  }
};

const showModal = (
  id: string,
  args?: Record<string, unknown>
): ModalAction => ({ type: "modal/show", payload: { id, args } });

const setModalFlags = (
  id: string,
  flags: Record<string, unknown>
): ModalAction => ({ type: "modal/set-flags", payload: { id, flags } });

const hideModal = (id: string): ModalAction => ({
  type: "modal/hide",
  payload: { id },
});

const removeModal = (id: string): ModalAction => ({
  type: "modal/remove",
  payload: { id },
});

const modalCallbacks: ModalCallbacks = {};
const hideModalCallbacks: ModalCallbacks = {};
const getModalId = (modal: string | ModalComponent<any>): string => {
  if (typeof modal === "string") return modal;
  if (!modal[symModalId]) {
    modal[symModalId] = getUid();
  }

  return modal[symModalId];
};

type ModalArgs<T> = T extends
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>
  ? React.ComponentProps<T>
  : Record<string, unknown>;

export function show<T, C, P extends Partial<ModalArgs<ModalComponent<C>>>>(
  modal: ModalComponent<C>,
  args?: P
): Promise<T>;
export function show<T>(
  modal: string,
  args?: Record<string, unknown>
): Promise<T>;
export function show<T, P>(modal: string, args: P): Promise<T>;
export function show(
  modal: ModalComponent | string,
  args?: ModalArgs<ModalComponent> | Record<string, unknown>
) {
  const id = getModalId(modal);

  if (typeof modal !== "string" && !MODAL_REGISTRY[id]) {
    register(id, modal);
  }

  dispatch(showModal(id, args));

  if (!modalCallbacks[id]) {
    let theResolve!: (args?: unknown) => void;
    let theReject!: (args?: unknown) => void;

    const promise = new Promise((resolve, reject) => {
      theResolve = resolve;
      theReject = reject;
    });

    modalCallbacks[id] = {
      resolve: theResolve,
      reject: theReject,
      promise,
    };
  }

  return modalCallbacks[id]?.promise;
}

export function hide<T>(modal: string | ModalComponent): Promise<T>;
export function hide(modal: string | ModalComponent) {
  const id = getModalId(modal);
  dispatch(hideModal(id));
  delete modalCallbacks[id];
  if (!hideModalCallbacks[id]) {
    let theResolve!: (args?: unknown) => void;
    let theReject!: (args?: unknown) => void;

    const promise = new Promise((resolve, reject) => {
      theResolve = resolve;
      theReject = reject;
    });

    hideModalCallbacks[id] = {
      resolve: theResolve,
      reject: theReject,
      promise,
    };
  }

  return hideModalCallbacks[id]?.promise;
}

export const remove = (modal: string | ModalComponent): void => {
  const id = getModalId(modal);
  dispatch(removeModal(id));
  delete modalCallbacks[id];
  delete hideModalCallbacks[id];
};

const setFlags = (id: string, flags: Record<string, unknown>): void => {
  dispatch(setModalFlags(id, flags));
};

export function useModal(): ModalHandler;
export function useModal(
  modal: string,
  args?: Record<string, unknown>
): ModalHandler;
export function useModal<
  C,
  P extends Partial<ModalArgs<ModalComponent<C>>>
>(): Omit<ModalHandler, "show"> & {
  show: (args?: P) => Promise<unknown>;
};
export function useModal(modal?: any, args?: any): any {
  const modals = useContext(ModalContext);
  const contextModalId = useContext(ModalIdContext);
  let id: string | null = null;
  const isUseComponent = modal && typeof modal !== "string";
  if (!modal) {
    id = contextModalId;
  } else {
    id = getModalId(modal);
  }

  if (!id) throw new Error("No modal id found in Modal.useModal.");

  useEffect(() => {
    if (isUseComponent && !MODAL_REGISTRY[id]) {
      register(id, modal, args);
    }
  }, [isUseComponent, id, modal, args]);

  const modalInfo = modals[id];

  const showCallback = useCallback(
    (args?: Record<string, unknown>) => show(id, args),
    [id]
  );
  const hideCallback = useCallback(() => hide(id), [id]);
  const removeCallback = useCallback(() => remove(id), [id]);
  const resolveCallback = useCallback(
    (args?: unknown) => {
      modalCallbacks[id]?.resolve(args);
      delete modalCallbacks[id];
    },
    [id]
  );
  const rejectCallback = useCallback(
    (args?: unknown) => {
      modalCallbacks[id]?.reject(args);
      delete modalCallbacks[id];
    },
    [id]
  );
  const resolveHide = useCallback(
    (args?: unknown) => {
      hideModalCallbacks[id]?.resolve(args);
      delete hideModalCallbacks[id];
    },
    [id]
  );

  return useMemo(
    () => ({
      id,
      args: modalInfo?.args,
      visible: !!modalInfo?.visible,
      keepMounted: !!modalInfo?.keepMounted,
      show: showCallback,
      hide: hideCallback,
      remove: removeCallback,
      resolve: resolveCallback,
      reject: rejectCallback,
      resolveHide,
    }),
    [
      id,
      modalInfo?.args,
      modalInfo?.visible,
      modalInfo?.keepMounted,
      showCallback,
      hideCallback,
      removeCallback,
      resolveCallback,
      rejectCallback,
      resolveHide,
    ]
  );
}

export const create = <P extends {}>(
  Comp: React.ComponentType<P>
): ModalComponent<P & ModalHocProps> => {
  return ({ defaultVisible, keepMounted, id, ...props }) => {
    const { args, show } = useModal(id);

    const modals = useContext(ModalContext);
    const shouldMount = !!modals[id];

    useEffect(() => {
      if (defaultVisible) {
        show();
      }

      ALREADY_MOUNTED[id] = true;

      return () => {
        delete ALREADY_MOUNTED[id];
      };
    }, [id, show, defaultVisible]);

    useEffect(() => {
      if (keepMounted) setFlags(id, { keepMounted: true });
    }, [id, keepMounted]);

    const delayVisible = modals[id]?.delayVisible;

    useEffect(() => {
      if (delayVisible) {
        show(args);
      }
    }, [delayVisible, args, show]);

    if (!shouldMount) return null;
    return (
      <ModalIdContext.Provider value={id}>
        <Comp {...(props as unknown as P)} {...args} />
      </ModalIdContext.Provider>
    );
  };
};

export const register = <T extends ModalComponent>(
  id: string,
  comp: T,
  props?: Partial<ModalArgs<T>>
): void => {
  if (!MODAL_REGISTRY[id]) {
    MODAL_REGISTRY[id] = { comp, props };
  } else {
    MODAL_REGISTRY[id]!.props = props;
  }
};

export const unregister = (id: string): void => {
  delete MODAL_REGISTRY[id];
};

const ModalPlaceholder = () => {
  const modals = useContext(ModalContext);
  const visibleModalIds = Object.keys(modals).filter((id) => !!modals[id]);
  visibleModalIds
    .filter((id) => !MODAL_REGISTRY[id] && !ALREADY_MOUNTED[id])
    .forEach((id) => {
      console.warn(
        `No modal found for id: ${id}. Please check the id or if it is registered or declared via JSX.`
      );
    });

  const toRender = visibleModalIds
    .filter((id) => MODAL_REGISTRY[id])
    .map((id) => ({ id, ...MODAL_REGISTRY[id]! }));

  return (
    <>
      {toRender.map((t) => (
        <t.comp key={t.id} id={t.id} {...t.props} />
      ))}
    </>
  );
};

export const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [modals, _dispatch] = useReducer(reducer, initialState);

  dispatch = _dispatch;

  return (
    <ModalContext.Provider value={modals}>
      {children}
      <ModalPlaceholder />
    </ModalContext.Provider>
  );
};

export const ModalManager = {
  Provider,
  create,
  register,
  show,
  hide,
  remove,
  useModal,
};
