import * as React from 'react';

import './LanguageFilter.scss';

interface IProps {
  activeFilter: string;
  onFilter: (language: string) => void;
  languages: string[];
}

export const LanguageFilter = ({ activeFilter, onFilter, languages }: IProps) => {
  const onFilterSelect = (language: string) => {
    if (activeFilter === language) {
      onFilter('');
    } else {
      onFilter(language);
    }
  };

  const languageFilters = languages.map((language, index) => {
    const extraClass = activeFilter === language ? '' : 'outline';
    return (
      <button
        aria-label={`${language} filter`}
        key={index}
        className={`language-filter__button ${extraClass}`}
        onClick={onFilterSelect.bind(null, language)}
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
