import { Modal, type ModalProps } from '@polee/react-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';

const ModalContent = (
  <div style={{ padding: 10, borderRadius: 8, backgroundColor: '#fff' }}>Modal Test (polee)</div>
);
const meta: Meta<typeof Modal> = {
  title: 'Components/Modal_polee',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달의 열림/닫힘 상태를 제어',
    },
    shouldCloseOnEsc: {
      control: 'boolean',
      description: 'ESC 키를 누르면 모달 닫히는 여부',
    },
    shouldCloseOnDimClick: {
      control: 'boolean',
      description: '모달 외부를 클릭하면 모달을 닫히는 여부',
    },
    preventBackgroundScroll: {
      control: 'boolean',
      description: '모달이 열려 있을 때 배경 스크롤을 방지',
    },
    enterAnimation: {
      control: 'inline-radio',
      options: [
        'fade-in',
        'slide-up',
        'slide-down',
        'fade-in-slide-up',
        'fade-in-slide-down',
        'custom-enter',
      ],
      description: '모달 열기 애니메이션 CSS 클래스',
    },
    exitAnimation: {
      control: 'inline-radio',
      options: [
        'fade-out',
        'slide-up',
        'slide-down',
        'fade-out-slide-up',
        'fade-out-slide-down',
        'custom-exit',
      ],
      description: '모달 닫기 애니메이션 CSS 클래스',
    },
    ariaLabelledby: {
      control: 'text',
      description: '모달의 라벨 요소 ID',
    },
    ariaDescribedby: {
      control: 'text',
      description: '모달의 설명 요소 ID',
    },
  },
  args: {
    isOpen: false,
    children: ModalContent,
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: ModalProps) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  return (
    <div {...args}>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white w-32 h-32 rounded-lg p-4">
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
    children: ModalContent,
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
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} mountNode={{ current: mountNode }}>
          <div className="bg-white w-32 h-32 rounded-lg p-4">
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
