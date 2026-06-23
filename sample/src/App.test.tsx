import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders header and default tab', () => {
    render(<App />);
    expect(screen.getByText('PeaceCoin SBT Manager')).toBeInTheDocument();
    expect(screen.getByText('Create SBT / NFT')).toBeInTheDocument();
  });

  it('switches tabs', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Batch Mint' }));
    expect(screen.getByText(/Select tokens already created in Supabase/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Get Balance' }));
    expect(screen.getByRole('heading', { name: 'Get Balance' })).toBeInTheDocument();
  });
});
