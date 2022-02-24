import * as React from 'react';
import './RepositoryItem.scss';
import { IRepository } from '../../../../interfaces/repository.interface';

interface IProps {
  repository: IRepository;
}

export const RepositoryItem = ({ repository }: IProps) => (
  <article className="repository">
    <section className="repository__info">
      <p>
        <strong>Name:</strong>{' '}
        <a href={repository.html_url}>
          {repository.name}
        </a>
      </p>
      <p>
        <strong>Stars: </strong>{' '}
        {repository.stargazers_count}
      </p>
    </section>
    <section className="repository__description">
      <p>{repository.description}</p>
      <button data-tooltip="Add to the favorites">
        <i className="fa fa-heart" />
      </button>
    </section>
  </article>
);
