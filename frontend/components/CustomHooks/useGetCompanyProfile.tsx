import React from 'react'
import abi from '../../../backend/artifacts/contracts/TenderManagementSystem.sol/TenderManagementSystem.json' assert {type: "json"}
import { useContractRead } from 'wagmi'


function useGetCompanyProfile({ address }: any) {

    const { data } = useContractRead({

        address: '0x2F1c27d74db0eBD02A880f4A7334637AB85dEc82',
        abi: abi.abi,
        functionName: 'companyProfile',
        args: [address],
        watch: true,

    })
    return data
}

export default useGetCompanyProfile