import { Modal, useModal } from "@mash-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof Modal> = {
  title: "React/Modal",
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => {
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);

    const {
      show: showModal1,
      isVisible: isVisible1,
      hide: hideModal1,
    } = useModal({});

    const {
      show: showModal2,
      isVisible: isVisible2,
      hide: hideModal2,
    } = useModal({});

    const ModalContainer = ({ children }: { children: React.ReactNode }) => {
      return <Modal.Container>{children}</Modal.Container>;
    };

    const ModalBody = () => {
      return (
        <Modal.Body>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
          omnis corrupti. Ducimus quos repellendus est nemo tempora expedita ex
          aliquid nulla maiores, voluptatibus optio quibusdam provident animi
          sequi illo libero.
        </Modal.Body>
      );
    };

    const Modal1 = () => {
      return (
        <Modal
          isOpen={isVisible1}
          onClose={hideModal1}
          closeOnOverlayClick={false}
        >
          <Modal.Overlay />
          <ModalContainer>
            <Modal.Header>
              <Modal.Title title="modal title" onClickClose={hideModal1} />
            </Modal.Header>
            <ModalBody />
            <Modal.Footer>
              <button type="button" onClick={hideModal1}>
                close
              </button>
            </Modal.Footer>
          </ModalContainer>
        </Modal>
      );
    };

    const Modal2 = () => {
      return (
        <Modal
          isOpen={isVisible2}
          onClose={hideModal2}
          closeOnOverlayClick={true}
        >
          <Modal.Overlay />
          <ModalContainer>
            <ModalBody />
            <button type="button" onClick={hideModal2}>
              close
            </button>
          </ModalContainer>
        </Modal>
      );
    };
    const Modal3 = () => {
      return (
        <Modal isOpen={isOpen3} onClose={() => setIsOpen3(false)} closeOnEsc>
          <Modal.Overlay />
          <ModalContainer>
            <ModalBody />
            <button type="button" onClick={() => setIsOpen3(false)}>
              close
            </button>
          </ModalContainer>
        </Modal>
      );
    };
    const Modal4 = () => {
      return (
        <Modal
          isOpen={isOpen4}
          onClose={() => setIsOpen4(false)}
          closeOnEsc={false}
        >
          <Modal.Overlay />
          <ModalContainer>
            <ModalBody />
            <button type="button" onClick={() => setIsOpen4(false)}>
              close
            </button>
          </ModalContainer>
        </Modal>
      );
    };

    return (
      <>
        <button
          type="button"
          onClick={() => {
            showModal1();
          }}
        >
          click out side off
        </button>
        {Modal1()}

        <button
          type="button"
          onClick={() => {
            showModal2();
          }}
        >
          click out side on
        </button>
        {Modal2()}

        <button
          type="button"
          onClick={() => {
            setIsOpen3(true);
          }}
        >
          click on esc on
        </button>
        {Modal3()}

        <button
          type="button"
          onClick={() => {
            setIsOpen4(true);
          }}
        >
          click on esc off
        </button>
        {Modal4()}
      </>
    );
  },
  name: "Modal",
};
