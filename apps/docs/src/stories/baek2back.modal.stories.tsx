import { Modal, ModalManager } from "@mash-ui/react/baek2back";
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
    isOpen: true,
  },
  render: function Render() {
    const DefaultModal = ModalManager.create(() => {
      const modal = ModalManager.useModal();

      return (
        <Modal
          isOpen={modal.visible}
          onOpenChange={(value) => {
            if (!value) {
              setTimeout(() => {
                modal.resolve();
                modal.hide();
              }, 1000);
            }
          }}
        />
      );
    });

    return (
      <ModalManager.Provider>
        <button
          type="button"
          onClick={() => {
            ModalManager.show(DefaultModal).then(() => {
              alert("1초 후 닫힘!");
            });
          }}
        >
          Open
        </button>
      </ModalManager.Provider>
    );
  },
};
