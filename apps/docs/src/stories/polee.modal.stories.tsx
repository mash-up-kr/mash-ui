import { Modal, type ModalProps } from '@mash-ui/react/polee';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'polee/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      table: {
        control: 'boolean',
        description: '모달의 열림/닫힘 상태를 제어',
      },
    },
    shouldCloseOnEsc: {
      table: {
        control: 'boolean',
        description: 'ESC 키를 누르면 모달 닫히는 여부',
      },
    },
    shouldCloseOnDimClick: {
      table: {
        control: 'boolean',
        description: '모달 외부를 클릭하면 모달을 닫히는 여부',
      },
    },
    preventBackgroundScroll: {
      table: {
        control: 'boolean',
        description: '모달이 열려 있을 때 배경 스크롤을 방지',
      },
    },
    ariaLabelledby: {
      table: {
        control: 'text',
        description: '모달의 라벨 요소 ID',
      },
    },
    ariaDescribedby: {
      table: {
        control: 'text',
        description: '모달의 설명 요소 ID',
      },
    },
  },
  args: {
    isOpen: false,
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: ModalProps) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  return (
    <div {...args}>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: 8,
            width: 300,
            height: 300,
            padding: 20,
          }}
        >
          <button type="button" onClick={() => setIsOpen(false)}>
            Close
          </button>
          <p>Modal Content</p>
        </div>
      </Modal>
    </div>
  );
};

export const Primary: Story = {
  render: (args) => <Template {...args} />,
  args: {
    isOpen: false,
    onClose: fn(),
  },
};

export const NoEscapeClose: Story = {
  render: (args) => <Template {...args} />,
  args: {
    isOpen: false,
    shouldCloseOnEsc: false,
  },
};

export const NoDimClickClose: Story = {
  render: (args) => <Template {...args} />,
  args: {
    isOpen: false,
    shouldCloseOnDimClick: false,
  },
};

export const WithCustomMountPoint: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);

    return (
      <div>
        <button type="button" onClick={() => setIsOpen(true)}>
          Open Modal
        </button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} mountNode={{ current: mountNode }}>
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: 8,
              width: 300,
              height: 300,
              padding: 20,
            }}
          >
            <button type="button" onClick={() => setIsOpen(false)}>
              Close
            </button>
            <p>Modal Content</p>
          </div>
        </Modal>
      </div>
    );
  },
};

export const OverflowHiddenBody: Story = {
  render: (args) => <Template {...args} />,
  args: {
    isOpen: false,
    preventBackgroundScroll: true,
  },
};

export const CustomAriaLabels: Story = {
  render: (args) => <Template {...args} />,
  args: {
    isOpen: false,
    ariaLabelledby: 'custom-title',
    ariaDescribedby: 'custom-description',
  },
};
