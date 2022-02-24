import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { IRepository } from '../interfaces/repository.interface';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface IContext {
  repositories: IRepository[];
  fetchRepositories: () => void;
  loading: boolean;
  languages: string[];
}

interface IProps {
  children: ReactNode;
}

const RepositoryContext = createContext<IContext>({} as IContext);

export const useRepositoryContext = () => useContext(RepositoryContext);

export const RepositoryContextProvider: FC<IProps> = ({ children }) => {
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);

  const fetchRepositories = () => {
    setLoading(true);
    axios.get(`${environment.API.GITHUB_REPOS_URL}?q=created:%3E2017-01-10&sort=stars&order=desc`)
      .then(({ data: { items } }) => {
        setRepositories(items);
        const uniqueLanguages = Array.from<string>(new Set(
          items
            .filter((item: IRepository) => item.language)
            .map((item: IRepository) => item.language)
        ));
        setLanguages(uniqueLanguages)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const value = {
    repositories,
    fetchRepositories,
    loading,
    languages,
  };

  return (
    <RepositoryContext.Provider value={value}>
      {children}
    </RepositoryContext.Provider>
  )

};
