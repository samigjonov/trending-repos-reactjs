import * as React from 'react';
import './RepositoryItem.scss';
import { IRepository } from '../../../../interfaces/repository.interface';

interface IProps {
  repository: IRepository;
  onFavorite: (id: number) => void;
  onUnfavorite: (id: number) => void;
}

export const RepositoryItem = ({ repository, onFavorite, onUnfavorite }: IProps) => {

  const description = repository.description || 'No description is provided...';

  return (
    <article className="repository">
      <section className="repository__info">
        <p>
          <strong><i className="fa-solid fa-box-open" /> Name:</strong>{' '}
          <a href={repository.html_url}>
            {repository.name}
          </a>
        </p>
        <p>
          <strong><i className="fa-solid fa-star" /> Stars: </strong>{' '}
          {repository.stargazers_count}
        </p>
      </section>
      <section className="repository__description">
        <p>{description}</p>
        <button
          data-tooltip={repository.favorite ? 'Remove from the favorites' : 'Add to the favorites'}
          className={repository.favorite ? '' : 'outline'}
          onClick={repository.favorite ? onUnfavorite.bind(null, repository.id) : onFavorite.bind(null, repository.id)}
        >
          <i className="fa fa-heart" />
        </button>
      </section>
    </article>
  );
};
