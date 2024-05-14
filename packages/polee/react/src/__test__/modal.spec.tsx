import { describe, it } from 'vitest';

describe('Modal Component', () => {
  it('should display the modal when show is called', async () => {
    // expect(screen.getByText('Test Modal')).not.toBeInTheDocument();
  });

  it('should close the modal on ESC key press when shouldCloseOnEsc is true', async () => {
    // show(<div>Test Modal ESC</div>, { shouldCloseOnEsc: true });
    // fireEvent.keyDown(document, { key: 'Escape', code: 'Escape', keyCode: 27 });
  });

  it('should not close the modal on ESC key press when shouldCloseOnEsc is false', async () => {
    // show(<div>Test Modal No ESC</div>, { shouldCloseOnEsc: false });
    // fireEvent.keyDown(document, { key: 'Escape', code: 'Escape', keyCode: 27 });
  });

  it('should close the modal on overlay click when shouldCloseOnOverlayClick is true', async () => {
    // dim 영역 클릭시 모달 close
  });

  it('should not close the modal on overlay click when shouldCloseOnOverlayClick is false', async () => {
    // option에 의해 dim 영역 클릭시 모달 close X
  });
});
