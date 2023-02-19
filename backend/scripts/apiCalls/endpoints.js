import abi from '../../artifacts/contracts/TenderManagementSystem.sol/TenderManagementSystem.json' assert {type: "json"};
import { config } from 'dotenv';
import pkg from 'web3';
const Web3 = pkg;

config({ path: ".env" })

export class ContractApi {

    constructor(callerAddress) {
        this.contractAddress = process.env.SEPOLIA_CONTRACT_ADDRESS;
        this.contractAbi = abi.abi
        this.callerAddress = callerAddress;
    }

    async getProviderObject() {
        const provider = await new Web3(new Web3.providers.HttpProvider(process.env.INFURA_API_KEY_URL));
        return provider
    }

    async getContractObject() {
        const provider = await new Web3(new Web3.providers.HttpProvider(process.env.INFURA_API_KEY_URL));
        const contract = await new provider.eth.Contract(this.contractAbi, this.callerAddress);
        return contract
    }

    async createCompanyProfile(companyName, companyAddress, contactInfo, email) {
        const receipt = await this.getContractObject().then((contract) =>
            contract.methods.createCompanyProfile(companyName, companyAddress, contactInfo, email).send({ from: this.callerAddress })
        );
        return receipt
    }

}

const companyName = "JDsys"
const companyAddress = "1st harare drive"
const contactInfo = "26378199"
const email = "jd@gmail.com"

const contract = new ContractApi("0x04F6eDA1D741Cbe86DC15d67eF2F8113486CFdc9")
const txt = contract.createCompanyProfile(companyName, companyAddress, contactInfo, email)
txt.then((rec) => console.log(rec))


