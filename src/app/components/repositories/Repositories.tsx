import * as React from 'react';
import { useRepositoryContext } from '../../contexts/repository.context';
import { useEffect, useState } from 'react';
import { RepositoryList } from '../shared/repository-list/RepositoryList';
import { LanguageFilter } from '../shared/language-filter/LanguageFilter';

export const Repositories = () => {
  const { repositories, fetchRepositories, loading } = useRepositoryContext();
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    fetchRepositories();
  }, []);

  if (loading) {
    return (
      <a href="#" aria-busy="true">Loading repositories, please wait…</a>
    );
  }

  const filteredRepositories = activeFilter ?
    repositories.filter(repository => repository.language === activeFilter) :
    repositories;

  return (
    <section>
      <h6>List of trending repositories</h6>
      <LanguageFilter activeFilter={activeFilter} onFilter={setActiveFilter} />
      <RepositoryList repositories={filteredRepositories} />
    </section>
  )
};
