import {
  ModalComponent,
  type ModalComponentProps,
} from "@mash-ui/react/brightbong92";
import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ModalComponent> = {
  title: "Brightbong92/Modal",
  component: ModalComponent,
};

export default meta;

type Story = StoryObj<typeof ModalComponent>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => {
    const [{ isOpen = false }, updateArgs] = useArgs<ModalComponentProps>();
    return (
      <>
        <button
          onClick={() => {
            updateArgs({ isOpen: true });
          }}
        >
          Open Modal
        </button>
        <ModalComponent
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
