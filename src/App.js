import React from 'react';
import Info from './Components/Info';
import Transactions from './Components/Transactions';
import Allowance from './Components/Allowance';
import Rewards from './Components/Rewards';
import Header from './Components/Header';
import './index';

class App extends React.Component {
  render() {
    return (
      <div className="flex flex-col h-full" id="root">
        <Header />

        <div id="main" className="flex">
          <div className="px-4 py-2 w-full md:w-1/2">
        <Info />

        <Transactions />

        <Allowance />

        <Rewards />
          </div>

          <div id="hero" className="hidden md:block w-1/2">
          </div>
        </div>
      </div>
    );
  }
}

export default App;