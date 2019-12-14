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

        let address = '0x3f963cb27e5e706a5bbca900d8e3d81075ee0e4c'
        let contract = new ethers.Contract(address, abi, signer);
        let newid = await contract.totalSupply()

        this.setState({
            totalsupply: newid.toString()
        })

    }

    handleButton2 = async (e) => {
        e.preventDefault();
        console.log(this.state.Address);
        let eth = window.ethereum;
        await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();

        let address = '0x3f963cb27e5e706a5bbca900d8e3d81075ee0e4c'
        let contract = new ethers.Contract(address, abi, signer);
        let newid2 = await contract.balanceOf(this.state.Address)

        this.setState({
            balance: newid2.toString()
        })

    }

    render() {
        return (
            <div className="flex flex-col justify-center align-items-center">
                <p className="border-b-4 border-red-800 text-center p-4 my-2 font-bold uppercase">Token Information can be found here</p>
                <button
                    className="px-8 py-2 my-2 bg-green-800 rounded-full uppercase tracking-wide font-bold text-white"
                    onClick={this.handleButton}
                >
                    Get Total Supply
                </button>

                {
                    this.state.totalsupply !== "" 
                    ? <p className="h-full w-full my-2 p-4 border border-green-900 bg-green-200 text-green-900 rounded-lg border-l-8">{this.state.totalsupply}</p>
                    : null
                }
                
                <form onSubmit={this.handleButton2} className="flex flex-col">
                    <div className="flex my-2 justify-center">
                        <label htmlFor="Address" className="pr-2">Enter Address:</label>
                        
                        <input
                            type="text"
                            name="Address"
                            className="px-2 border-2 border-gray-800 rounded-lg mx-2"
                            onChange={this.handlechange}
                            value={this.state.Address}
                        />
                    </div>
                    
                    <button
                        className="my-2 px-8 py-2 bg-green-800 rounded-full uppercase tracking-wide font-bold text-white"
                        type="submit"
                    >
                        Get The Balance
                    </button>
                    
                    {
                        this.state.balance !== ""
                        ? <p className="h-full w-full p-4 border border-green-900 bg-green-200 text-green-900 rounded-lg border-l-8">
                               {this.state.balance}
                           </p>
                        : null
                    }
                </form>
            </div>
        )
    }
}
