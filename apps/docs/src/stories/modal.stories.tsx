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

    const Modal2 = () => {
      return (
        <Modal
          isOpen={isVisible2}
          onClose={hideModal2}
          closeOnOverlayClick={false}
        >
          <div>modal children2</div>
          <button type="button" onClick={hideModal2}>
            close
          </button>
        </Modal>
      );
    };
    const Modal3 = () => {
      return (
        <Modal isOpen={isOpen3} onClose={() => setIsOpen3(false)}>
          <div>modal children3</div>
          <button type="button" onClick={() => setIsOpen3(false)}>
            close
          </button>
        </Modal>
      );
    };
    const Modal4 = () => {
      return (
        <Modal isOpen={isOpen4} onClose={() => setIsOpen4(false)}>
          <div>modal children4</div>
          <button type="button" onClick={() => setIsOpen4(false)}>
            close
          </button>
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
          Open Modal1
        </button>
        <Modal isOpen={isVisible1} onClose={hideModal1} closeOnOverlayClick>
          <Modal.Overlay />

          <Modal.Container>
            <Modal.Header>
              <Modal.Title title="modal title" onClickClose={hideModal1} />
            </Modal.Header>

            <Modal.Body>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis, omnis corrupti. Ducimus quos repellendus est nemo
              tempora expedita ex aliquid nulla maiores, voluptatibus optio
              quibusdam provident animi sequi illo libero.
            </Modal.Body>

            <Modal.Footer>
              <button type="button" onClick={hideModal1}>
                close
              </button>
            </Modal.Footer>
          </Modal.Container>
        </Modal>

        <button
          type="button"
          onClick={() => {
            showModal2();
          }}
        >
          Open Modal2
        </button>
        {Modal2()}

        <button
          type="button"
          onClick={() => {
            setIsOpen3(true);
          }}
        >
          Open Modal3
        </button>
        {Modal3()}

        <button
          type="button"
          onClick={() => {
            setIsOpen4(true);
          }}
        >
          Open Modal4
        </button>
        {Modal4()}
      </>
    );
  },
  name: "Modal",
};
