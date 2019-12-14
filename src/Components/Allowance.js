import React, { Component } from 'react'
import { ethers } from 'ethers'
const abi = require('../abi')

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

    //Allowance:
    handlesubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.OAddress, this.state.SAddress)
        // let eth = window.ethereum;
        // await eth.enable()
        // let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        // const signer = provider.getSigner();

        // let address = '0x3f963cb27e5e706a5bbca900d8e3d81075ee0e4c'
        // let contract = new ethers.Contract(address, abi, signer);
        //  await contract.allowance(this.state.OAddress,this.state.SAddress)

        // this.setState({
        //     totalsupply: newid.toString()
        // })
    }

    handlesubmit2 = async (e) => {
        e.preventDefault();
        console.log(this.state.SAddress1, this.state.Amount)
        let eth = window.ethereum;
        await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();

        let address = '0x3f963cb27e5e706a5bbca900d8e3d81075ee0e4c'
        let contract = new ethers.Contract(address, abi, signer);
        let newid = await contract.increaseAllowance(this.state.SAddress1, this.state.Amount)

        console.log(newid)
    }

    handlesubmit3 = async (e) => {
        e.preventDefault();
        console.log(this.state.SAddress2, this.state.Amount2)
        let eth = window.ethereum;
        await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();

        let address = '0x3f963cb27e5e706a5bbca900d8e3d81075ee0e4c'
        let contract = new ethers.Contract(address, abi, signer);
        let newid = await contract.decreaseAllowance(this.state.SAddress2, this.state.Amount2)

        console.log(newid)

    }

    render() {
        return (
            <div className="flex flex-col justify-center align-items-center">
                <p className="border-b-4 border-red-800 text-center p-4 my-2 font-bold uppercase">Allowance Information can be found here</p>
                
                <form onSubmit={this.handlesubmit} className="flex flex-col">
                    <div className="flex my-2 justify-center">
                        <label htmlFor="OAddress" className="pr-2">Enter Owner Address:</label>
                        <input type="text" name="OAddress" className="px-2 border-2 border-gray-800 rounded-lg mx-2" onChange={this.handlechange} value={this.state.OAddress} />
                    </div>

                    <div className="flex my-2 justify-center"> 
                        <label htmlFor="SAddress" className="pr-2">Enter Spender Address:</label>
                        <input type="text" name="SAddress" className="px-2 border-2 border-gray-800 rounded-lg mx-2" onChange={this.handlechange} value={this.state.SAddress} />
                    </div>

                    <button
                        className="my-2 px-8 py-2 bg-green-800 rounded-full uppercase tracking-wide font-bold text-white"
                        type="submit"
                    >
                        Check Allowance
                    </button>
                </form>

                <form onSubmit={this.handlesubmit2} className="flex flex-col">
                    <div className="flex my-2 justify-center">
                        <label htmlFor="SAddress1" className="pr-2">Enter Spender Address:</label>
                        <input type="text" name="SAddress1" className="px-2 border-2 border-gray-800 rounded-lg mx-2" onChange={this.handlechange} value={this.state.SAddress1} />
                    </div>
                    
                    <div className="flex my-2 justify-center"> 
                        <label htmlFor="Amount" className="pr-2">Enter  Amount:</label>
                        <input type="text" name="Amount" className="px-2 border-2 border-gray-800 rounded-lg mx-2" onChange={this.handlechange} value={this.state.Amount} />
                    </div>
                    
                    <button 
                        className="my-2 px-8 py-2 bg-green-800 rounded-full uppercase tracking-wide font-bold text-white"
                        type="submit"
                    >
                        Increase
                    </button>
                </form>

                <form onSubmit={this.handlesubmit3} className="flex flex-col">
                    <div className="flex my-2 justify-center">
                        <label htmlFor="SAddress2" className="pr-2">Enter Spender Address:</label>
                        <input type="text" name="SAddress2" className="px-2 border-2 border-gray-800 rounded-lg mx-2" onChange={this.handlechange} value={this.state.SAddress2} />
                    </div>

                    <div className="flex my-2 justify-center">
                        <label htmlFor="Amount2" className="pr-2">Enter  Amount:</label>
                        <input type="text" name="Amount2" className="px-2 border-2 border-gray-800 rounded-lg mx-2" onChange={this.handlechange} value={this.state.Amount2} />
                    </div>

                    <button
                        className="my-2 px-8 py-2 bg-green-800 rounded-full uppercase tracking-wide font-bold text-white"
                        type="submit"
                    >
                        Decrease
                    </button>
                </form>
            </div>
        )
    }
}
