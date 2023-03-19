import React from 'react'
import { useContractRead } from 'wagmi'
import abi from '../../utils/contractAbi.json' assert {type: "json"};


function useGetContractData({ isAdverts = false, isStages = false, isCompanyProf = false, isCompanyDocs = false, isBidders = false, isTenderProcess = false }) {



    if (isAdverts) {
        const { data } = useContractRead({

            address: '0x18b5Af6F8fc4800C74ef7682f28B97d6e0Dc126b',
            abi: abi,
            functionName: 'getTenderAdvert',
            watch: true,
        })
        return data
    }
    if (isStages) {
        const { data } = useContractRead({

            address: '0x18b5Af6F8fc4800C74ef7682f28B97d6e0Dc126b',
            abi: abi,
            functionName: 'getTenderStages',
            watch: true,


        })
        return data

    }
    if (isCompanyProf) {
        const { data } = useContractRead({

            address: '0x18b5Af6F8fc4800C74ef7682f28B97d6e0Dc126b',
            abi: abi,
            functionName: 'getCompanyProfile',
            watch: true,

        })
        return data

    }
    if (isCompanyDocs) {
        const { data } = useContractRead({
            address: '0x18b5Af6F8fc4800C74ef7682f28B97d6e0Dc126b',
            abi: abi,
            functionName: 'getCompanyDocs',
            watch: true,

        })
        return data
    }
    if (isBidders) {
        const { data } = useContractRead({
            address: '0x18b5Af6F8fc4800C74ef7682f28B97d6e0Dc126b',
            abi: abi,
            functionName: 'getBidTender',
            watch: true,

        })
        return data
    }
    if (isTenderProcess) {
        const { data } = useContractRead({

            address: '0x18b5Af6F8fc4800C74ef7682f28B97d6e0Dc126b',
            abi: abi,
            functionName: 'getTenderProcess',
            watch: true,

        })
        return data
    }

}




export default useGetContractData