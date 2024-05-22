export const ModalBackdrop = ({ onClick }: { onClick?: VoidFunction }) => {
  return (
    <div
      aria-hidden="true"
      onClick={onClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
      }}
    />
  )
}
