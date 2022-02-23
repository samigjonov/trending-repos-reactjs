import React, { useEffect } from 'react';
import { useRepositoryContext } from '../../contexts/repository.context';
import './Home.scss';

export const Home = () => {

  const { repositories, fetchRepositories } = useRepositoryContext();

  useEffect(() => {
    fetchRepositories();
  }, []);

  console.log(repositories);

  return (
    <section>
      <h6>List of trending repositories</h6>
    </section>
  )
};
