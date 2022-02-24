import { RepositoryItem } from './repository-item/RepositoryItem';
import * as React from 'react';
import { IRepository } from '../../../interfaces/repository.interface';

interface IProps {
  repositories: IRepository[];
}

export const RepositoryList = ({ repositories }: IProps) => {
  return (
    <>
      {repositories.map((repository, index) =>
        (<RepositoryItem
          key={index}
          repository={repository}
        />)
      )}
    </>
  )
};
