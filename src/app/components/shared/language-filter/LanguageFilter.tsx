import * as React from 'react';
import { useRepositoryContext } from '../../../contexts/repository.context';

import './LanguageFilter.scss';

interface IProps {
  activeFilter: string;
  onFilter: (language: string) => void;
}

export const LanguageFilter = ({ activeFilter, onFilter }: IProps) => {
  const { languages } = useRepositoryContext();

  const languageFilters = languages.map((language, index) => {
    const extraClass = activeFilter === language ? '' : 'outline';
    return (
      <button
        key={index}
        className={`language-filter__button ${extraClass}`}
        onClick={onFilter.bind(null, language)}
      >
        {language}
      </button>
    );
  });

  return (
    <div className="language-filter">
      {languageFilters}
    </div>
  )
};
