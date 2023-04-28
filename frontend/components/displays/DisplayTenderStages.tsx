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
    Stack
} from '@chakra-ui/react'
import useGetContractData from '../CustomHooks/useGetContractData';
import BiddingDocuments from '../forms/BiddingDocuments';
import { useState, useEffect } from 'react';

function DisplayTenderStages({ rfqNumber }: any) {
    const tenderStages = useGetContractData({ isStages: true })

    const [tenderStageData, setTenderStageData] = useState(tenderStages)
    const [isDataAvailable, setDataAvailable] = useState(false)
    // console.log(tenderStages.filter(stage => stage.requestForQuotation === rfqNumber))

    useEffect(() => {
        console.log(tenderStages)
        function geTenderStagesData(data?: any) {
            if (tenderStageData === 'undefined') {
                console.log("Hit")
                setTenderStageData(tenderStages)
                geTenderStagesData(tenderStageData)
            }
            else {
                setTenderStageData(tenderStages.filter(stage => stage.requestForQuotation === rfqNumber))
                setDataAvailable(true)
            }
        }

        geTenderStagesData(tenderStages)

        // setTenderAdverts(false)
    }, [tenderStageData])


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
                                            <BiddingDocuments rfqNumber={stage.requestForQuotation} stageNumber={stage.stageId} />
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
        </div>
    )
}

export default DisplayTenderStages