import React, { Component } from 'react'
//import { ethers } from 'ethers'
//const abi = require('../abi')

export default class Rewards extends Component {
    constructor() {
        super()
        this.state = {
            Account: "",
            Amount: ""
        }
        this.handlesubmit = this.handlesubmit.bind(this)
        this.handleButton = this.handleButton.bind(this)
        this.handleButton2 = this.handleButton2.bind(this)
    }
    handlechange = e => {
        this.setState({
            [e.target.name]: e.target.value

        })

    }
    handleButton = async (e) => {
        e.preventDefault();
        console.log("Done");
    }
    handleButton2 = async (e) => {
        e.preventDefault();
        console.log("Withdraw");
    }
    handlesubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.Account, this.state.Amount)
        // let eth = window.ethereum;
        // await eth.enable()
        // let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        // const signer = provider.getSigner();

        // let address = '0xb64a38d37d3a45dbb5337f32980c08b5e07651cf'
        // let contract = new ethers.Contract(address, abi, signer);
        // let newid = await contract.totalSupply()

        // this.setState({
        //     totalsupply: newid.toString()
        // })

    }

    render() {

        return (
            <div>
                <form onSubmit={this.handlesubmit}  >
                    Enter Account:
                <input type="text" name="Account" className="input" onChange={this.handlechange} value={this.state.Account} />
                    <br />
                    Enter Amount:
                <input type="text" name="Amount" className="input" onChange={this.handlechange} value={this.state.Amount} />
                    <br />
                    <button type="submit"> Mint!!</button>

                </form>
                <button onClick={this.handleButton}> Trigerr!!</button>
                <br />
                <button onClick={this.handleButton2}> Withdraw!!</button>
                <br />
            </div>
        )
    }
}
