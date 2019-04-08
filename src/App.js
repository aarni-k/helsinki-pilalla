import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';

class App extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
         <h1>HELSINKI-PILALLA</h1>
        </header>
        
         
       
        <Main/>
        <div className="BottomFiller">
        </div>
      </div>
    );
  }
}

export default App;
