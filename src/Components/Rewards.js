import React, { Component } from 'react'
import { ethers } from 'ethers'
const abi = require('../abi')

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
        let eth = window.ethereum;
        await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();

        let address = '0x3f963cb27e5e706a5bbca900d8e3d81075ee0e4c'
        let contract = new ethers.Contract(address, abi, signer);
        await contract.trigger()
    }
    handleButton2 = async (e) => {
        e.preventDefault();


        let eth = window.ethereum;
        await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();

        let address = '0x3f963cb27e5e706a5bbca900d8e3d81075ee0e4c'
        let contract = new ethers.Contract(address, abi, signer);
        await contract.withdraw()
    }

    //Mint
    handlesubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.Account, this.state.Amount)
        let eth = window.ethereum;
        await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();

        let address = '0x3f963cb27e5e706a5bbca900d8e3d81075ee0e4c'
        let contract = new ethers.Contract(address, abi, signer);
        let newid = await contract.mint(this.state.Account, this.state.Amount)
        console.log(newid)


    }

    render() {

        return (
            <div className="flex flex-col justify-center align-items-center">
                <p className="border-b-4 border-red-800 text-center p-4 my-2 font-bold uppercase">Rewards Information can be found here</p>
                
                <form onSubmit={this.handlesubmit} className="flex flex-col">
                    <div className="flex my-2 justify-center">
                        <label htmlFor="Account" className="pr-2">Enter Account:</label>
                        <input type="text" name="Account" className="px-2 border-2 border-gray-800 rounded-lg mx-2" onChange={this.handlechange} value={this.state.Account} />
                    </div>
                    <div className="flex my-2 justify-center">
                        <label htmlFor="Amount" className="pr-2">Enter Amount:</label>
                        <input type="text" name="Amount" className="px-2 border-2 border-gray-800 rounded-lg mx-2" onChange={this.handlechange} value={this.state.Amount} />
                    </div>

                    <button 
                        className="my-2 px-8 py-2 bg-green-800 rounded-full uppercase tracking-wide font-bold text-white" 
                        type="submit"
                    >
                        Mint
                    </button>
                </form>

                <button 
                    className="my-2 px-8 py-2 bg-green-800 rounded-full uppercase tracking-wide font-bold text-white" 
                    onClick={this.handleButton}
                >
                    Triger
                </button>

                <button
                    className="my-2 px-8 py-2 bg-green-800 rounded-full uppercase tracking-wide font-bold text-white" 
                    onClick={this.handleButton2}
                >
                    Withdraw
                </button>
            </div>
        )
    }
}
