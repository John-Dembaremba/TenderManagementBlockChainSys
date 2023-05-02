import React from 'react'
import {
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
    Badge,
    Text,
    HStack
} from '@chakra-ui/react'
import useGetContractData from '../CustomHooks/useGetContractData';
import { useState, useEffect } from 'react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useAccount } from 'wagmi'
import { CheckIcon, CloseIcon, ArrowBackIcon } from '@chakra-ui/icons'


function DisplayBidResult({ rfqNumber, stageId }: any) {
    const biddersResultsData = useGetContractData({ isTenderProcess: true })

    // function getBiddersResults(data?: any) {
    //     if (data === 'undefined') {
    //         getBiddersResults(biddersResultsData)
    //     } else {
    //         return data
    //     }
    // }
    const data = () => {
        for (let i = 0; i < 8; i++) {
            if (biddersResultsData != 'undefined') {
                return biddersResultsData
            }
        }
    }
    console.log(biddersResultsData)

    const [biddersResults, setBiddersResults] = useState(data)
    const [bidderResult, setBidderResult] = useState({})
    const [isBidderResultAvailable, setBidderResultAvailable] = useState(false)
    const { isConnected, address } = useAccount()

    // console.log(getBiddersResults(biddersResults))

    useEffect(() => {

        biddersResults.forEach((result?: any) => {
            let applicationId = result.application
            const data = applicationId.split(":")
            console.log("=======>>>>>>>", rfqNumber, stageId)
            console.log("RFQ:", rfqNumber === data[0])
            // console.log("Stage:", dataProps.stageId === data[1])
            console.log("Acc:", address === data[2])
            if (stageId === data[1] && address === data[2] && rfqNumber.rfqNumber === data[0]) {
                setBidderResult(result)
                setBidderResultAvailable(true)
            }
        });
    })



    console.log(isBidderResultAvailable)



    return (
        <div>
            {isBidderResultAvailable ?
                <>
                    <HStack spacing='24px'>
                        {
                            bidderResult.acceptApplication! ?
                                <>
                                    <Tag
                                        size='md'
                                        borderRadius='full'
                                        variant='solid'
                                        colorScheme='green'
                                    ><TagLeftIcon boxSize='12px' as={CheckIcon} />
                                        <TagLabel>Accepted</TagLabel>

                                    </Tag>

                                </> :
                                <Tag
                                    size='md'
                                    borderRadius='full'
                                    variant='solid'
                                    colorScheme='red'
                                ><TagLeftIcon boxSize='12px' as={CloseIcon} />
                                    <TagLabel>Rejected</TagLabel>

                                </Tag>

                        }
                        <Text as='b'>
                            with reason: {bidderResult.reasons}
                        </Text>

                    </HStack>

                </> :
                <Badge colorScheme='red'>Pending Results</Badge>
            }
        </div>
    )
}

export default DisplayBidResult