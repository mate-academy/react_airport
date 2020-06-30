import React from 'react';
import Nav from './components/Nav/Nav';
import Main from './components/Main';
import BackgroundAnimation from './components/common/BackgroundAnimation';
import './App.scss';

const App = () => (
  <div className="App">
    <Nav />
    <Main />

    <footer className="App-Footer">
      &copy;Andreas Just 2020
    </footer>

    <BackgroundAnimation />
  </div>
);

export default App;
