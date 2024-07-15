import { Modal, type ModalRootProps } from "@mash-ui/react/minsgy";
import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "minsgy/Modal",
  component: Modal.Root,
  subcomponents: {
    ModalBody: Modal.Body,
    ModalContainer: Modal.Container,
    ModalFooter: Modal.Footer,
    ModalOverlay: Modal.Overlay,
  },
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(args) {
    const [{ isOpen }, updateArgs] = useArgs<ModalRootProps>();

    return (
      <>
        <button
          type="button"
          onClick={() => {
            updateArgs({ isOpen: !isOpen });
          }}
        >
          Open Modal
        </button>
        <Modal.Root {...args} isOpen={isOpen}>
          <Modal.Overlay />
          <Modal.Container
            style={{
              width: "400px",
              borderRadius: "4px",
            }}
          >
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
              type="button"
              onClick={() => {
                updateArgs({
                  isOpen: false,
                });
              }}
            >
              X
            </button>
            <Modal.Header
              style={{
                height: "50px",
                width: "100%",
              }}
            >
              Header
            </Modal.Header>
            <Modal.Body
              style={{
                height: "200px",
              }}
            >
              Body
            </Modal.Body>
            <Modal.Footer>Footer</Modal.Footer>
          </Modal.Container>
        </Modal.Root>
      </>
    );
  },
};
