import React from 'react';
import Info from './Components/Info';
import Transactions from './Components/Transactions';
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
        <Transactions />
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