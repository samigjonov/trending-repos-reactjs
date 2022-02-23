import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { IRepository } from '../interfaces/repository.interface';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface IContext {
  repositories: IRepository[];
  fetchRepositories: () => void;
}

interface IProps {
  children: ReactNode;
}

const RepositoryContext = createContext<IContext>({} as IContext);

export const useRepositoryContext = () => useContext(RepositoryContext);

export const RepositoryContextProvider: FC<IProps> = ({ children }) => {
  const [repositories, setRepositories] = useState<IRepository[]>([]);

  const fetchRepositories = () => {
    axios.get(`${environment.API.GITHUB_REPOS_URL}?q=created:%3E2017-01-10&sort=stars&order=desc`).then(response => {
      setRepositories(response.data.items);
    });
  };

  const value = {
    repositories,
    fetchRepositories
  };

  return (
    <RepositoryContext.Provider value={value}>
      {children}
    </RepositoryContext.Provider>
  )

};
