import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Flex,
    Box,
    Tag,
    TagLabel,
    Button,
    useDisclosure,
    Stack,
    Collapse,
    Lorem
} from '@chakra-ui/react'
import Image from 'next/image';
import Link from 'next/link';
import { ViewIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import useGetContractData from './CustomHooks/useGetContractData'
import useGetCompanyProfile from './CustomHooks/useGetCompanyProfile';
import DisplayTenderStages from './displays/DisplayTenderStages';
import { useState, useEffect } from 'react';
// import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'


function Tenders() {
    const { isOpen, onToggle } = useDisclosure()
    const [isTenderAdverts, setTenderAdverts] = useState(true)
    const [isApplyTender, setApplyTender] = useState(false)
    const [isTrackApplication, setTrackApplication] = useState(false)
    const [RfqNumber, setRfqNumber] = useState('')

    useEffect(() => {
        console.log("TenderAdvert?: ", isTenderAdverts)
        console.log("RFQNumber?: ", RfqNumber)
        // setTenderAdverts(false)
    }, [isTenderAdverts])

    const data = useGetContractData({ isAdverts: true })
    // console.log("====>>>>TenderAdvert", useGetContractData({ isAdverts: true }))
    // console.log("====>>>>T", useGetCompanyProfile({ address: '' }))

    // console.log(data.map((tender, index) => (tender['requestForQuotation'])))
    // console.log("======>>>>S", useGetContractData({ isStages: true }))
    // const entries = Object.entries(data)

    const handleApply = (event, rfqNumber) => {
        console.log("======>>>>", rfqNumber)
        setRfqNumber(rfqNumber)
        setTenderAdverts(!isTenderAdverts)
        setApplyTender(true)

    }

    const TenderAdvert = () => {
        return (
            <>
                <TableContainer>
                    <h2 className="text-center font-medium text-xl leading-tight align-middle mt-0 mb-2">Tenders</h2>
                    <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline'>
                        <Link href='forms/tender/create-tender'>Create New Tender</Link>
                    </Button>
                    <br />
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th></Th>
                                <Th>Company Name</Th>
                                <Th>RFQ Number</Th>
                                <Th>Start Date</Th>
                                <Th>End Date</Th>
                                <Th>Requirements</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((tender, index) => (
                                <Tr>
                                    <Td>
                                        <Flex>
                                            <Box>
                                                <Image src="/cube.png" width="20" height="20" />
                                            </Box>

                                        </Flex>
                                    </Td>
                                    <Td>{companyName(tender['account'])}</Td>
                                    <Td>{tender['requestForQuotation']}</Td>
                                    <Td>{tender['openDate']}</Td>
                                    <Td>{tender['closingDate']}</Td>
                                    <Td>{tender['requirements']}</Td>
                                    <Td>
                                        <Stack direction='row' spacing={4}>
                                            <Button
                                                leftIcon={<ArrowForwardIcon />}
                                                colorScheme='pink'
                                                variant='solid'
                                                onClick={(event) => handleApply(event, tender['requestForQuotation'])}
                                            >
                                                Apply
                                            </Button>


                                            <Button rightIcon={<ViewIcon />} colorScheme='blue' variant='outline'>
                                                Track application
                                            </Button>
                                        </Stack>
                                    </Td>

                                </Tr>


                            )
                            )
                            }


                        </Tbody>

                    </Table>


                </TableContainer>
            </>
        )
    }

    const companyName = (address) => {
        return useGetCompanyProfile({ address: address })['companyName']
    }






    return (
        <div>
            {isTenderAdverts ? <TenderAdvert /> : isApplyTender ? <DisplayTenderStages rfqNumber={RfqNumber} /> : null}

        </div>
    )
}

export default Tenders