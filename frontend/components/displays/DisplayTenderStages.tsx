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
    Button
} from '@chakra-ui/react'
import useGetContractData from '../CustomHooks/useGetContractData';
import BiddingDocuments from '../forms/BiddingDocuments';


function DisplayTenderStages({ rfqNumber }: any) {
    const tenderStages = useGetContractData({ isStages: true }).filter(stage => stage.requestForQuotation === rfqNumber)
    // console.log(tenderStages.filter(stage => stage.requestForQuotation === rfqNumber))
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
                        {tenderStages.map((stage, index) => (

                            <Tr>
                                <Td>{stage['stageId']}</Td>
                                <Td>{stage['stageName']}</Td>
                                <Td>{stage['requirements']}</Td>
                                <Td>
                                    <BiddingDocuments rfqNumber={stage.requestForQuotation} stageNumber={stage.stageId} />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default DisplayTenderStages