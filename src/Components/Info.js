import React, { Component } from 'react'
import { ethers } from 'ethers'
const abi = require('../abi');

export default class Info extends Component {
    constructor() {
        super()
        this.state = {
            totalsupply: "",
            Address: "",
            balance: ""
        }
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

        let eth = window.ethereum;
        await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();

        let address = '0xb64a38d37d3a45dbb5337f32980c08b5e07651cf'
        let contract = new ethers.Contract(address, abi, signer);
        let newid = await contract.totalSupply()

        this.setState({
            totalsupply: newid.toString()
        })

    }

    handleButton2 = async (e) => {
        e.preventDefault();
        console.log(this.state.Address);


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
                <button onClick={this.handleButton}> TotalSupply!!</button>
                {this.state.totalsupply !== "" ? <p>{this.state.totalsupply}</p> : ""}
                <form onSubmit={this.handleButton2}  >
                    Enter Address:
                <input type="text" name="Address" className="input" onChange={this.handlechange} value={this.state.Address} />
                    <br />
                    <button type="submit"> Get The Balance!!</button>
                    {this.state.balance !== "" ? <p>{this.state.balance}</p> : ""}
                </form>
            </div>
        )
    }
}
