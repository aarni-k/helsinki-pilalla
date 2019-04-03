import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';

class App extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
         <h1>Upper nav page</h1>
        </header>
        <h2>The main web page with information</h2>
        <Main/>
        
      </div>
    );
  }
}

export default App;
