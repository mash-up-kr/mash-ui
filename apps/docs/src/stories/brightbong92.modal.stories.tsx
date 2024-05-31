import { Modal, type ModalProps } from "@brightbong92/react-ui";
import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Modal> = {
  title: "Brightbong92/Modal",
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
    const [{ isOpen = false }, updateArgs] = useArgs<ModalProps>();
    return (
      <>
        <button
          onClick={() => {
            updateArgs({ isOpen: true });
          }}
        >
          Open Modal
        </button>
        <Modal
          {...props}
          isOpen={isOpen}
          onClose={() => {
            updateArgs({ isOpen: false });
          }}
          closeOutsideClick
        />
      </>
    );
  },
  name: "Modal",
};
