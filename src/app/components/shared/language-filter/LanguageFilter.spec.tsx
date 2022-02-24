import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { LanguageFilter } from './LanguageFilter';

describe('LanguageFilter', () => {
  const activeFilter = 'activeFilter';
  const onFilter = jest.fn();
  const languages = ['filter1', 'filter2', 'filter3'];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correct number of filters', async () => {
    render(
      <LanguageFilter
        activeFilter={activeFilter}
        languages={languages}
        onFilter={onFilter}
      />
    );
    const items = await screen.findAllByRole('button');
    expect(items).toHaveLength(3);
  });

  it('should emit clicked filter', async () => {
    const clickedFilter = languages[1];
    render(
      <LanguageFilter
        activeFilter={activeFilter}
        languages={languages}
        onFilter={onFilter}
      />
    );
    const filter = await screen.findByText(clickedFilter);
    fireEvent.click(filter);
    expect(onFilter).toHaveBeenCalledWith(clickedFilter);
  });

  afterEach(() => {
    cleanup();
  });
});
