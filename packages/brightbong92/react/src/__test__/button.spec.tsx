import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../button';

describe('Button component', () => {
  beforeEach(() => {
    window.alert = () => {};
  });

  it('should correctly display button text', () => {
    render(<Button appName="button-text">button-test</Button>);
    const testButton = screen.getByRole('button', { name: /button-test/i });

    expect(testButton.textContent).toContain('button-test');
  });

  it('should trigger onClick function when clicked', async () => {
    const mockAlert = vi.spyOn(window, 'alert');
    render(<Button appName="button-test">button-test</Button>);

    await userEvent.click(screen.getByRole('button', { name: /button-test/i }));

    expect(mockAlert).toHaveBeenCalledWith('Hello from your button-test app!');

    mockAlert.mockRestore();
  });
});
