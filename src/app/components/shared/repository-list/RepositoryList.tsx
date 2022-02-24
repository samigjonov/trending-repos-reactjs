import { RepositoryItem } from './repository-item/RepositoryItem';
import * as React from 'react';
import { IRepository } from '../../../interfaces/repository.interface';
import { useRepositoryContext } from '../../../contexts/repository.context';

interface IProps {
  repositories: IRepository[];
}

export const RepositoryList = ({ repositories }: IProps) => {
  const { addToFavorite, removeFromFavorite } = useRepositoryContext();
  return (
    <>
      {repositories.map((repository, index) =>
        (<RepositoryItem
          key={index}
          repository={repository}
          onFavorite={addToFavorite}
          onUnfavorite={removeFromFavorite}
        />)
      )}
    </>
  )
};
