import React from 'react'
import { Card, CardBody, Table, TableContainer, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import useGetContractData from '../CustomHooks/useGetContractData'

const TenderDetails = ({ rfqNumber }: any) => {


    const tenderAdvert = Object.entries(useGetContractData({ isAdverts: true }))
    const tenderStages = Object.entries(useGetContractData({ isStages: true }))
    console.log(tenderStages)

    return (
        <div>

            {/* <Card>
                <CardBody>
                    <Text>View a summary of all your customers over the last month.</Text>
                    <TableContainer>
                        <Table variant='striped'>
                            <Thead>
                                <Tr>
                                    <Th>RFQ Number</Th>
                                    <Th>Start Date</Th>
                                    <Th>End Date</Th>
                                    <Th>Requirements</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>{tenderAdvert[0][1]["requestForQuotation"]}</Td>
                                    <Td>{tenderAdvert[0][1]["openDate"]}</Td>
                                    <Td>{tenderAdvert[0][1]["closingDate"]}</Td>
                                    <Td>{tenderAdvert[0][1]["requirements"]}</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>

            <br />
            <br />

            <ol
                className="border-l border-neutral-300 dark:border-neutral-500 md:flex md:justify-center md:gap-6 md:border-l-0 md:border-t">

                <li>
                    <div className="flex-start flex items-center pt-2 md:block md:pt-0">
                        <div
                            className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500 md:-mt-[5px] md:ml-0 md:mr-0"></div>
                        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                            Stage Number:
                        </p>
                    </div>
                    <div className="ml-4 mt-2 pb-5 md:ml-0">
                        <h4 className="mb-1.5 text-xl font-semibold">Stage Name</h4>
                        <p className="mb-3 text-neutral-500 dark:text-neutral-300">
                            requirements.....
                        </p>
                    </div>
                </li>


            </ol> */}
        </div>
    )
}

export default TenderDetails