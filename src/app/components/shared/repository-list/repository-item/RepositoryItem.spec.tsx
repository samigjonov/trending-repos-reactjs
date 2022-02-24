import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { RepositoryItem } from './RepositoryItem';
import { IRepository } from '../../../../interfaces/repository.interface';

describe('RepositoryItem', () => {
  const repository: IRepository = {
    id: 1,
    name: 'name',
    description: 'description',
    stargazers_count: 2,
    language: 'language',
    html_url: 'html_url'
  };
  const onFavorite = jest.fn();
  const onUnfavorite = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correct name',  () => {
    render(
      <RepositoryItem
        repository={repository}
        onFavorite={onFavorite}
        onUnfavorite={onUnfavorite}
      />
    );
    const repoName = screen.getByText(repository.name);
    expect(repoName).toBeInTheDocument();
  });

  it('should render correct description', () => {
    render(
      <RepositoryItem
        repository={repository}
        onFavorite={onFavorite}
        onUnfavorite={onUnfavorite}
      />
    );
    const repoDescription = screen.getByText(repository.description);
    expect(repoDescription).toBeInTheDocument();
  });

  it('should render correct number of stars',  () => {
    render(
      <RepositoryItem
        repository={repository}
        onFavorite={onFavorite}
        onUnfavorite={onUnfavorite}
      />
    );
    const repoStars = screen.getByText(repository.stargazers_count);
    expect(repoStars).toBeInTheDocument();
  });


  it('should have correct link to the repo',  () => {
    render(
      <RepositoryItem
        repository={repository}
        onFavorite={onFavorite}
        onUnfavorite={onUnfavorite}
      />
    );
    const repoLink = screen.getByRole('link', { name: repository.name });
    expect(repoLink.getAttribute('href')).toBe(repository.html_url);
  });

  afterEach(() => {
    cleanup();
  });
});
