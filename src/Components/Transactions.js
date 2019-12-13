import React, { Component } from 'react'
//import { ethers } from 'ethers'
//const abi = require('../abi')

export default class Transactions extends Component {
    constructor() {
        super()
        this.state = {
            Address: "",
            Amount: "",
            SAddress: "",
            SAmount: "",
            SAddress1: "",
            SAmount1: "",
            RAddress: ""
        }
        this.handlesubmit = this.handlesubmit.bind(this)

    }
    handlechange = e => {
        this.setState({
            [e.target.name]: e.target.value

        })

    }
    //Transfer
    handlesubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.Address);
        console.log(this.state.Amount);

        // let eth = window.ethereum;
        // await eth.enable()
        // let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        // const signer = provider.getSigner();

        // let address = '0xb64a38d37d3a45dbb5337f32980c08b5e07651cf'
        // let contract = new ethers.Contract(address, abi, signer);
        // let newid2 = await contract.balanceOf(this.state.Address)

        // this.setState({
        //     balance: newid2.toString()
        // })

    }
    //Approve
    handlesubmit2 = async (e) => {
        e.preventDefault();
        console.log(this.state.SAddress);
        console.log(this.state.SAmount);

        // let eth = window.ethereum;
        // await eth.enable()
        // let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        // const signer = provider.getSigner();

        // let address = '0xb64a38d37d3a45dbb5337f32980c08b5e07651cf'
        // let contract = new ethers.Contract(address, abi, signer);
        // let newid2 = await contract.balanceOf(this.state.Address)

        // this.setState({
        //     balance: newid2.toString()
        // })

    }
    //Transferfrom

    handlesubmit3 = async (e) => {
        e.preventDefault();
        console.log(this.state.SAddress1);
        console.log(this.state.RAddress);
        console.log(this.state.SAmount1);

        // let eth = window.ethereum;
        // await eth.enable()
        // let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        // const signer = provider.getSigner();

        // let address = '0xb64a38d37d3a45dbb5337f32980c08b5e07651cf'
        // let contract = new ethers.Contract(address, abi, signer);
        // let newid2 = await contract.balanceOf(this.state.Address)

        // this.setState({
        //     balance: newid2.toString()
        // })

    }


    render() {
        return (
            <div>
                <form onSubmit={this.handlesubmit}  >
                    Enter Recipient Address:
                <input type="text" name="Address" className="input" onChange={this.handlechange} value={this.state.Address} />
                    <br />
                    Enter Amount:
                    <input type="text" name="Amount" className="input" onChange={this.handlechange} value={this.state.Amount} />
                    <br />
                    <button type="submit"> Transfer!!</button>

                </form>
                <br />
                <form onSubmit={this.handlesubmit2}  >
                    Enter Spender Address:
                <input type="text" name="SAddress" className="input" onChange={this.handlechange} value={this.state.SAddress} />
                    <br />
                    Enter Amount:
                    <input type="text" name="SAmount" className="input" onChange={this.handlechange} value={this.state.SAmount} />
                    <br />
                    <button type="submit"> Approve!!</button>

                </form>
                <br />
                <form onSubmit={this.handlesubmit3}  >
                    Enter Spender Address:
                <input type="text" name="SAddress1" className="input" onChange={this.handlechange} value={this.state.SAddress1} />
                    <br />
                    Enter Recipient Address:
                <input type="text" name="RAddress" className="input" onChange={this.handlechange} value={this.state.RAddress} />
                    <br />
                    Enter Amount:
                    <input type="text" name="SAmount1" className="input" onChange={this.handlechange} value={this.state.SAmount1} />
                    <br />
                    <button type="submit"> Transferfrom!!</button>

                </form>
            </div>
        )
    }
}
