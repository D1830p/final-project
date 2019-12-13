import React, { Component } from 'react'
//import { ethers } from 'ethers'
//const abi = require('../abi')

export default class Allowance extends Component {
    constructor() {
        super()
        this.state = {
            OAddress: "",
            SAddress: "",
            SAddress1: "",
            Amount: "",
            SAddress2: "",
            Amount2: ""
        }
        this.handlesubmit = this.handlesubmit.bind(this)
        this.handlesubmit2 = this.handlesubmit2.bind(this)
        this.handlesubmit3 = this.handlesubmit3.bind(this)
    }
    handlechange = e => {
        this.setState({
            [e.target.name]: e.target.value

        })

    }
    handlesubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.OAddress, this.state.SAddress)
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
    handlesubmit2 = async (e) => {
        e.preventDefault();
        console.log(this.state.SAddress1, this.state.Amount)
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
    handlesubmit3 = async (e) => {
        e.preventDefault();
        console.log(this.state.SAddress2, this.state.Amount2)
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
                    Enter Owner Address:
                <input type="text" name="OAddress" className="input" onChange={this.handlechange} value={this.state.OAddress} />
                    <br />
                    Enter Spender Address:
                <input type="text" name="SAddress" className="input" onChange={this.handlechange} value={this.state.SAddress} />
                    <br />
                    <button type="submit"> Check Allowance!!</button>

                </form>
                <br />
                <form onSubmit={this.handlesubmit2}  >
                    Enter Spender Address:
                <input type="text" name="SAddress1" className="input" onChange={this.handlechange} value={this.state.SAddress1} />
                    <br />
                    Enter  Amount:
                <input type="text" name="Amount" className="input" onChange={this.handlechange} value={this.state.Amount} />
                    <br />
                    <button type="submit"> Increase!!</button>

                </form>
                <br />
                <form onSubmit={this.handlesubmit3}  >
                    Enter Spender Address:
                <input type="text" name="SAddress2" className="input" onChange={this.handlechange} value={this.state.SAddress2} />
                    <br />
                    Enter  Amount:
                <input type="text" name="Amount2" className="input" onChange={this.handlechange} value={this.state.Amount2} />
                    <br />
                    <button type="submit"> Decrease!!</button>

                </form>

            </div>
        )
    }
}
