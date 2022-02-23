import React from 'react';
import './App.scss';
import { Header } from './components/shared/header/Header';
import { Home } from './components/home/Home';
import { RepositoryContextProvider } from './contexts/repository.context';

const App = () => (
  <RepositoryContextProvider>
    <div className="container">
      <Header />
      <Home />
    </div>
  </RepositoryContextProvider>
);
export default App;
