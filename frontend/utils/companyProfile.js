import React from 'react'
import { useContractRead } from 'wagmi'
import abi from '../../backend/artifacts/contracts/TenderManagementSystem.sol/TenderManagementSystem.json'

function companyProfile(address) {

    const { data } = useContractRead({

        address: '0x2F1c27d74db0eBD02A880f4A7334637AB85dEc82',
        abi: abi.abi,
        functionName: 'companyProfile',
        args: [address],
        watch: true,

    })

    for (let i = 0; i < 8; i++) {
        if (data != 'undefined') {
            return data
        }
    }


}

export default companyProfile