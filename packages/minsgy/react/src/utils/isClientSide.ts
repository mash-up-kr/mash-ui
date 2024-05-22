/**
 * @module isClientSide
 * @description 클라이언트 사이드 환경인지 여부를 반환
 */
export const isClientSide = Boolean(
  typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
)
