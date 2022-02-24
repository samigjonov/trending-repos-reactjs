import axios from 'axios';
import dayjs from 'dayjs';
import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { IRepository } from '../interfaces/repository.interface';
import { environment } from '../../environments/environment';

interface IContext {
  repositories: IRepository[];
  fetchRepositories: () => void;
  loading: boolean;
  languages: string[];
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
}

interface IProps {
  children: ReactNode;
}

const RepositoryContext = createContext<IContext>({} as IContext);

const FAVORITES_KEY = 'favoriteRepositories';

export const useRepositoryContext = () => useContext(RepositoryContext);

export const RepositoryContextProvider: FC<IProps> = ({ children }) => {
  const date = dayjs().subtract(7, 'days').format('YYYY-MM-DD');
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);

  const fetchRepositories = () => {
    setLoading(true);
    const favorites = getFavorites();
    axios.get(`${environment.API.GITHUB_REPOS_URL}?q=created:%3E${date}&sort=stars&order=desc`)
      .then(({ data: { items } }) => {
        setRepositories(
          items.map((item: IRepository) => ({
            ...item,
            favorite: favorites.includes(item.id)
          }))
        );
        retrieveUniqueLanguages(items);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateRepositories = () => {
    const favorites = getFavorites();
    setRepositories(
      repositories.map((item: IRepository) => ({
        ...item,
        favorite: favorites.includes(item.id)
      }))
    );
  };

  const getFavorites = () => {
    const items = localStorage.getItem(FAVORITES_KEY);
    return items ? JSON.parse(items) : [];
  };

  const setFavorites = (ids: number[]) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  };

  const retrieveUniqueLanguages = (items: IRepository[]) => {
    const uniqueLanguages = Array.from<string>(new Set(
      items
        .filter((item: IRepository) => item.language)
        .map((item: IRepository) => item.language)
    ));
    setLanguages(uniqueLanguages);
  };

  const addToFavorite = (id: number) => {
    const items = getFavorites();
    setFavorites([...items, id]);
    updateRepositories();
  };

  const removeFromFavorite = (id: number) => {
    const items = getFavorites();
    setFavorites(items.filter((item: number) => item !== id));
    updateRepositories();
  };


  const value = {
    repositories,
    fetchRepositories,
    loading,
    languages,
    addToFavorite,
    removeFromFavorite,
  };

  return (
    <RepositoryContext.Provider value={value}>
      {children}
    </RepositoryContext.Provider>
  )

};
