import React from 'react';
import Info from './Components/Info';
import Txs from './Components/txs';
import Allowance from './Components/Allowance';
import './index';

class App extends React.Component {

  render() {
    return (
      <div className="App" id="root">
        <Info />
        <br />
        Transfer Balance:
        <Txs />
        <br />
        Allowance:
        <Allowance />
      </div>
    );
  }
}

export default App;