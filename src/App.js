import React from 'react';
import Info from './Components/Info';
import Txs from './Components/txs';
import Allowance from './Components/Allowance';
import Rewards from './Components/Rewards';
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
        <br />
        Rewards:
        <Rewards />
        <br />
      </div>
    );
  }
}

export default App;