import { Children, type PropsWithChildren, type RefObject } from "react";
import { createPortal } from "react-dom";
import { useIsServer } from "../../utils/use-is-server";

export interface PortalProps {
  disabled?: boolean;
  container?: RefObject<HTMLElement>;
}

export const Portal = ({
  children,
  container,
  disabled,
}: PropsWithChildren<PortalProps>) => {
  const isServer = useIsServer()

  if (isServer || disabled) return <>{children}</>;

  const mountNode = container?.current ?? document.body;

  return (
    <>{Children.map(children, (child) => createPortal(child, mountNode))}</>
  );
};
