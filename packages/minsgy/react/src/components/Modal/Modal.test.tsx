// import { render, screen, fireEvent } from "@testing-library/react"
// import { describe, it, expect, vi } from "vitest"
// import { Modal } from "." // Modal 컴포넌트를 import

// describe("Modal Component", () => {
//   it("role, aria-* 속성이 제대로 부여되어 있는지", () => {
//     render(<Modal isOpen={true}>Content</Modal>)
//     const modal = screen.getByRole("dialog")
//     expect(modal).toHaveAttribute("aria-hidden", "false")
//   })

//   it("isOpen이 true일 때 제대로 노출되는지", () => {
//     render(<Modal isOpen={true}>Content</Modal>)
//     expect(screen.getByText("Content")).toBeInTheDocument()
//   })

//   it("isOpen이 false일 때 DOM에서 잘 제거되는지", () => {
//     render(<Modal isOpen={false}>Content</Modal>)
//     expect(screen.queryByText("Content")).toBeNull()
//   })

//   it("forwardRef가 제대로 전달되는지", () => {
//     const ref = vi.fn()
//     render(
//       <Modal isOpen={true} ref={ref}>
//         Content
//       </Modal>
//     )
//     expect(ref).toHaveBeenCalled()
//   })

//   it("ESC 키 입력 시에 제대로 닫히는지", () => {
//     const onClose = vi.fn()
//     render(
//       <Modal isOpen={true} onClose={onClose}>
//         Content
//       </Modal>
//     )
//     fireEvent.keyDown(window, { key: "Escape" })
//     expect(onClose).toHaveBeenCalled()
//   })

//   it("모달 외부 영역 클릭 시에 정상적으로 닫히는지", () => {
//     const onClose = vi.fn()
//     render(
//       <Modal isOpen={true} onClose={onClose}>
//         Content
//       </Modal>
//     )
//     fireEvent.click(document.body)
//     expect(onClose).toHaveBeenCalled()
//   })

//   it("body 태그에 overflow hidden이 정상적으로 부여되었다가 제거되는지", () => {
//     const { rerender } = render(<Modal isOpen={true}>Content</Modal>)
//     expect(document.body).toHaveStyle("overflow: hidden")
//     rerender(<Modal isOpen={false}>Content</Modal>)
//     expect(document.body).not.toHaveStyle("overflow: hidden")
//   })

//   it("mountPoint를 주어서 사용자가 렌더링하고 싶은 돔에 지정하기", () => {
//     const mountPoint = document.createElement("div")
//     document.body.appendChild(mountPoint)
//     render(
//       <Modal isOpen={true} mountPoint={mountPoint}>
//         Content
//       </Modal>,
//       { container: mountPoint }
//     )
//     expect(mountPoint).toContainElement(screen.getByText("Content"))
//   })
// })
