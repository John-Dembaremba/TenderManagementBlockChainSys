import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    TableCaption,
    Flex,
    Box,
    Tag,
    TagLabel,
    Button,
    Skeleton,
    Stack,
    Link
} from '@chakra-ui/react'
import useGetContractData from '../CustomHooks/useGetContractData';
import BiddingDocuments from '../forms/BiddingDocuments';
import { useState, useEffect } from 'react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'
import DisplayBidResult from './DisplayBidResult';


function DisplayTenderStages(rfqNumber?: any, viewApplication?: boolean, trackApplication?: boolean) {
    const tenderStages = useGetContractData({ isStages: true })

    const [tenderStageData, setTenderStageData] = useState(tenderStages)
    const [isDataAvailable, setDataAvailable] = useState(false)


    useEffect(() => {
        console.log(tenderStages)
        function geTenderStagesData(data?: any) {
            if (tenderStageData === 'undefined') {
                console.log("Hit")
                setTenderStageData(tenderStages)
                geTenderStagesData(tenderStageData)
            }
            else {
                console.log("======>>>", rfqNumber.rfqNumber)
                // console.log(tenderStages.filter(stage => stage.requestForQuotation === rfqNumber))
                setTenderStageData(tenderStages.filter(stage => stage.requestForQuotation === rfqNumber.rfqNumber))
                setDataAvailable(true)
            }
        }

        geTenderStagesData(tenderStages)

        // setTenderAdverts(false)
    }, [])

    console.log("Track: ", rfqNumber.trackApplication, "View", rfqNumber.viewApplication)
    return (
        <div>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Apply per each Tender Stage</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Stage Number</Th>
                            <Th>stageName</Th>
                            <Th>requirements</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isDataAvailable ?
                            <>
                                {tenderStageData.map((stage, index) => (

                                    <Tr>
                                        <Td>{stage['stageId']}</Td>
                                        <Td>{stage['stageName']}</Td>
                                        <Td>{stage['requirements']}</Td>
                                        <Td>
                                            {rfqNumber.viewApplication ?
                                                <>
                                                    <Button
                                                        rightIcon={<ArrowForwardIcon />}
                                                        colorScheme='pink'
                                                        variant='solid'
                                                    >
                                                        <Link href={"./bids/" + stage.stageId + "/" + rfqNumber.rfqNumber}>Supplier Assessment</Link>
                                                    </Button>
                                                </> :
                                                rfqNumber.trackApplication ?
                                                    <>
                                                        <DisplayBidResult
                                                            rfqNumber={rfqNumber}
                                                            stageId={stage.stageId} />
                                                    </> :
                                                    <BiddingDocuments rfqNumber={stage.requestForQuotation} stageNumber={stage.stageId} />

                                            }
                                        </Td>
                                    </Tr>
                                ))}
                            </>
                            :
                            <Stack>
                                <Skeleton height='100px' />
                                <Skeleton height='100px' />
                                <Skeleton height='100px' />
                            </Stack>
                        }

                    </Tbody>
                </Table>
            </TableContainer>
        </div >
    )
}

export default DisplayTenderStages