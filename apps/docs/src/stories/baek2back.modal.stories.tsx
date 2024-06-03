import { Modal, type ModalProps } from "@mash-ui/react/baek2back";
import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta = {
  title: "Baek2back/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  args: {
    onOpenChange: fn(),
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    isOpen: false,
  },
  render: function Render(args) {
    const [{ isOpen }, updateArgs] = useArgs<ModalProps>();

    return (
      <>
        <button
          type="button"
          onClick={() => {
            updateArgs({ isOpen: !isOpen });
          }}
        >
          Open
        </button>
        <Modal
          {...args}
          isOpen={isOpen}
          onOpenChange={(isOpen) => {
            updateArgs({ isOpen });
          }}
        />
      </>
    );
  },
};
