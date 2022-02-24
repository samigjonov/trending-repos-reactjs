import * as React from 'react';
import { useRepositoryContext } from '../../contexts/repository.context';
import { useEffect, useState } from 'react';
import { RepositoryList } from '../shared/repository-list/RepositoryList';
import { LanguageFilter } from '../shared/language-filter/LanguageFilter';

import './Repositories.scss';

export const Repositories = () => {
  const { repositories, fetchRepositories, loading, languages } = useRepositoryContext();
  const [activeFilter, setActiveFilter] = useState('');
  const [onlyFavorite, setOnlyFavorite] = useState(false);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  if (loading) {
    return (
      <a href="/" aria-busy="true">Loading repositories, please wait…</a>
    );
  }

  let filteredRepositories = activeFilter ?
    repositories.filter(repository => repository.language === activeFilter) :
    repositories;

  if (onlyFavorite) {
    filteredRepositories = filteredRepositories.filter(repository => repository.favorite);
  }

  return (
    <section className="repositories">
      <div className="repositories__header">
        <h6>
          <i className="fa-solid fa-rocket" />{' '}
          List of trending repositories
        </h6>
        <fieldset>
          <label htmlFor="switch">
            <input
              aria-label="Show only favorite switcher"
              aria-required="true"
              type="checkbox"
              id="switch"
              name="switch"
              role="switch"
              onChange={setOnlyFavorite.bind(null, !onlyFavorite)}
            />
            Show only favorite
          </label>
        </fieldset>
      </div>
      <LanguageFilter activeFilter={activeFilter} onFilter={setActiveFilter} languages={languages} />
      <RepositoryList repositories={filteredRepositories} />
    </section>
  )
};
