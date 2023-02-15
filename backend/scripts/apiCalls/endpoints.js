import { ethers } from "ethers";
import abi from '../../artifacts/contracts/TenderManagementSystem.sol/TenderManagementSystem.json' assert {type: "json"};
import { config } from 'dotenv';

config({ path: ".env" })

const contractObject = () => {
    try {
        const provider = new ethers.JsonRpcProvider(process.env.INFURA_API_KEY_URL)
        const contractAddress = process.env.SEPOLIA_CONTRACT_ADDRESS
        const contractAbi = abi.abi
        const contract = new ethers.Contract(contractAddress, contractAbi, provider)
        return contract
    } catch (error) {
        console.log("Contract Initialize failed with error: ", error)
        return null
    }

}


export class ContractApi {

    constructor(callerAddress) {
        this.contract = contractObject();
        this.callerAddress = callerAddress;
    }

    getArray() {
        console.log(this.contract.getAddress())
    }



}

const cxt = new ContractApi("1234")
cxt.getArray()
