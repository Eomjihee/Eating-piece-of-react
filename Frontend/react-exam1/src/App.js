import './App.css';
import MyHeader from './common/Header'
import MyFooter from './common/Footer'
import React from 'react'

function App() {
  return (
    <>
      <div className="App">
        <MyHeader />
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <MyFooter />
      </div>
    </>
  );
}

export default App;
