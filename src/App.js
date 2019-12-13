import React from 'react';
import Info from './Components/Info'
import './index';

class App extends React.Component {

  render() {
    return (
      <div className="App" id="root">
        <Info />
        <br />
      </div>
    );
  }
}

export default App;