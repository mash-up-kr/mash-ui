import { useMemo } from "react"

const MODAL_CLASS_NAME = "modal-root"

export const useModalContainer = () => {
  const container = useMemo(() => {
    const existingContainer = document.querySelector(`.${MODAL_CLASS_NAME}`)
    if (existingContainer) {
      return existingContainer
    }

    const element = document.createElement("div")
    element.classList.add(MODAL_CLASS_NAME)

    return element
  }, [])

  return container
}
