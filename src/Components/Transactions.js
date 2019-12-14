import React, { Component } from 'react'
import { ethers } from 'ethers'
const abi = require('../abi')

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

        let eth = window.ethereum;
        await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();

        let address = '0x3f963cb27e5e706a5bbca900d8e3d81075ee0e4c'
        let contract = new ethers.Contract(address, abi, signer);
        await contract.transfer(this.state.Address, this.state.Amount)
    }

    //Approve
    handlesubmit2 = async (e) => {
        e.preventDefault();
        console.log(this.state.SAddress);
        console.log(this.state.SAmount);

        let eth = window.ethereum;
        await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();

        let address = '0x3f963cb27e5e706a5bbca900d8e3d81075ee0e4c'
        let contract = new ethers.Contract(address, abi, signer);
        let newid2 = await contract.approve(this.state.SAddress, this.state.SAmount)
        console.log(newid2);
    }

    //Transferfrom
    handlesubmit3 = async (e) => {
        e.preventDefault();
        console.log(this.state.SAddress1);
        console.log(this.state.RAddress);
        console.log(this.state.SAmount1);

        let eth = window.ethereum;
        await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();

        let address = '0x3f963cb27e5e706a5bbca900d8e3d81075ee0e4c'
        let contract = new ethers.Contract(address, abi, signer);
        let newid2 = await contract.transferFrom(this.state.SAddress1, this.state.RAddress, this.state.SAmount1)
        console.log(newid2)
    }

    render() {
        return (
            <div className="flex flex-col justify-center align-items-center">
                <p className="border-b-4 border-red-800 text-center p-4 my-2 font-bold uppercase">Transaction Information can be found here</p>
                
                <form onSubmit={this.handlesubmit} className="flex flex-col">
                    <div className="flex my-2 justify-center">
                        <label htmlFor="Address" className="pr-2">Enter Recipient Address:</label>
                        <input type="text" name="Address" className="px-2 border-2 border-gray-800 rounded-lg mx-2" onChange={this.handlechange} value={this.state.Address} />
                    </div>

                    <div className="flex my-2 justify-center">
                        <label htmlFor="Amount" className="pr-2">Enter Amount:</label>
                        <input type="text" name="Amount" className="px-2 border-2 border-gray-800 rounded-lg mx-2" onChange={this.handlechange} value={this.state.Amount} />
                    </div>

                    <button
                        className="my-2 px-8 py-2 bg-green-800 rounded-full uppercase tracking-wide font-bold text-white"
                        type="submit"
                    >
                        Transfer
                    </button>
                </form>

                <form onSubmit={this.handlesubmit2} className="flex flex-col">
                    <div className="flex my-2 justify-center">
                        <label htmlFor="SAddress" className="pr-2">Enter Spender Address:</label>
                        <input type="text" name="SAddress" className="px-2 border-2 border-gray-800 rounded-lg mx-2" onChange={this.handlechange} value={this.state.SAddress} />
                    </div>

                    <div className="flex my-2 justify-center">
                        <label htmlFor="SAmount" className="pr-2">Enter Amount:</label>
                        <input type="text" name="SAmount" className="px-2 border-2 border-gray-800 rounded-lg mx-2" onChange={this.handlechange} value={this.state.SAmount} />
                    </div>

                    <button
                        className="my-2 px-8 py-2 bg-green-800 rounded-full uppercase tracking-wide font-bold text-white"
                        type="submit"
                    >
                        Approve
                    </button>

                </form>

                <form onSubmit={this.handlesubmit3} className="flex flex-col">
                    <div className="flex my-2 justify-center">
                        <label htmlFor="SAddress1" className="pr-2">Enter Spender Address:</label>
                        <input type="text" name="SAddress1" className="px-2 border-2 border-gray-800 rounded-lg mx-2" onChange={this.handlechange} value={this.state.SAddress1} />
                    </div>

                    <div className="flex my-2 justify-center">
                        <label htmlFor="RAddress" className="pr-2">Enter Recipient Address:</label>
                        <input type="text" name="RAddress" className="px-2 border-2 border-gray-800 rounded-lg mx-2" onChange={this.handlechange} value={this.state.RAddress} />
                    </div>

                    <div className="flex my-2 justify-center">
                        <label htmlFor="SAmount1" className="pr-2">Enter Amount:</label>
                        <input type="text" name="SAmount1" className="px-2 border-2 border-gray-800 rounded-lg mx-2" onChange={this.handlechange} value={this.state.SAmount1} />
                    </div>

                    <button
                        className="my-2 px-8 py-2 bg-green-800 rounded-full uppercase tracking-wide font-bold text-white"
                        type="submit"
                    >
                        Transfer From
                    </button>

                </form>
            </div>
        )
    }
}
