import type { ReactNode, RefObject } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import useIsClient from '../../hooks/use-is-client';

interface PortalProps {
  id: string;
  children: ReactNode;
  containerRef?: RefObject<HTMLElement>;
}

function Portal({ id, children, containerRef }: PortalProps) {
  const isClient = useIsClient();
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isClient) return;

    let portalElement = containerRef?.current || document.getElementById(id);
    if (portalElement) {
      setElement(portalElement);
      return () => {
        portalElement?.remove();
      };
    }

    portalElement = document.createElement('div');
    portalElement.id = id;
    portalElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 9995;
    `;
    document.body.appendChild(portalElement);
    setElement(portalElement);

    return () => {
      portalElement?.remove();
    };
  }, [id, containerRef, isClient]);

  if (!isClient) {
    return children;
  }

  if (!element) {
    return null;
  }

  return createPortal(children, element);
}

export default Portal;
