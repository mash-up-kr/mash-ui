"use client"

import { createPortal } from "react-dom"
import { useModalContainer } from "./useModalContainer"
import { usePreventScroll } from "../../hooks/usePreventScroll"
import { isClientSide } from "../../utils/isClientSide"
import { ForwardedRef, HtmlHTMLAttributes, forwardRef } from "react"
import { ModalBackdrop } from "./ModalBackdrop"

type PortalProps = {
  container?: Element | null
  children: React.ReactNode
}

const Portal = ({ children, container }: PortalProps) => {
  const defaultContainer = useModalContainer()
  document.body.appendChild(container ?? defaultContainer)
  return createPortal(children, container ?? defaultContainer)
}

export type ModalProps = HtmlHTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  container?: Element | null
  isOpen?: boolean
  onClose?: VoidFunction
  initialOpen?: boolean
  dimmed?: boolean
  disabledDimmedClickClose?: boolean
  disabledScrollLock?: boolean
}

export const Modal = forwardRef(
  (
    {
      children,
      dimmed = true,
      disabledDimmedClickClose = true,
      onClose,
      container,
      style,
      ...rest
    }: ModalProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    usePreventScroll()

    if (!isClientSide) return null
    return (
      <Portal container={container}>
        <div
          aria-modal="true"
          role="dialog"
          ref={ref}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            ...style,
          }}
          {...rest}
        >
          {children}
        </div>
        {dimmed && (
          <ModalBackdrop
            onClick={disabledDimmedClickClose ? undefined : onClose}
          />
        )}
      </Portal>
    )
  }
)

Modal.displayName = "Modal"
