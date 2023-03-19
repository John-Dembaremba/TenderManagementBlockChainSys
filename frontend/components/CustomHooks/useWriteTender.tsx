import React from 'react'
import { useContractRead } from 'wagmi'
import abi from '../../utils/contractAbi.json' assert {type: "json"};
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useAccount } from 'wagmi'


function useWriteTender({ requestForQuotation, openDate, closingDate, tenderRequirements, tenderStagesArray }: any) {


    // const { config } = usePrepareContractWrite({
    //     address: "0x18b5Af6F8fc4800C74ef7682f28B97d6e0Dc126b",
    //     abi: abi,
    //     functionName: 'createTenderAdvert',
    //     args: [requestForQuotation, openDate, closingDate, tenderRequirements]
    // })


    const { write, data, isLoading } = useContractWrite(
        {
            mode: 'recklesslyUnprepared',
            address: "0x18b5Af6F8fc4800C74ef7682f28B97d6e0Dc126b",
            abi: abi,
            functionName: 'createTenderAdvert',
            args: [requestForQuotation, openDate, closingDate, tenderRequirements, tenderStagesArray]
        }
    )


    const { isSuccess, status, isIdle } = useWaitForTransaction({
        hash: data?.hash,
    })

    return { write, data, isLoading, isSuccess, status, isIdle }

}




export default useWriteTender