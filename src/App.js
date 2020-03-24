import React from 'react';
import Board from '../src/containers/Board/Board';
import styles from './App.scss';
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Board />
      </div>
    </BrowserRouter>
  );
}

export default App;
