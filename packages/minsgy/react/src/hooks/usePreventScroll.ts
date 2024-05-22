"use client"

import { useEffect } from "react"

export const usePreventScroll = () => {
  useEffect(() => {
    document.body.style.setProperty("overflow", "hidden")
    document.body.style.setProperty("touch-action", "none")

    return () => {
      document.body.style.setProperty("overflow", "visible")
      document.body.style.setProperty("touch-action", "auto")
    }
  }, [])
}
