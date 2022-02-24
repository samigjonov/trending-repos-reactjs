import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders proper header text', () => {
    render(<Header />);
    const linkElement = screen.getByText(/Trending Repositories in Github/i);
    expect(linkElement).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
