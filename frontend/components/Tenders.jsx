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
    Skeleton, SkeletonCircle, SkeletonText,

} from '@chakra-ui/react'
import Image from 'next/image';
import Link from 'next/link';
import { ViewIcon, ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'
import useGetContractData from './CustomHooks/useGetContractData'
import useGetCompanyProfile from './CustomHooks/useGetCompanyProfile';
import DisplayTenderStages from './displays/DisplayTenderStages';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi'
import dynamic from "next/dynamic";
import DisplayBids from './displays/DisplayBids';


const isSSREnabled = () => typeof window === 'undefined';


function Tenders() {
    const advertData = useGetContractData({ isAdverts: true })
    const [isAdvertsDataAvailable, setIsAdvertsDataAvailable] = useState(false)
    const [isTenderAdverts, setTenderAdverts] = useState(true)
    const [isApplyTender, setApplyTender] = useState(false)
    const [isViewApplicants, setViewApplicants] = useState(false)
    const [isTrackApplication, setTrackApplication] = useState(false)
    const [RfqNumber, setRfqNumber] = useState('')
    const { isConnected, address } = useAccount()
    // const companyName = (address) => {
    //     const data = useGetCompanyProfile({ address: address })
    //     console.log("Data====================>>>>>", data)
    //     return data.companyName
    // }

    useEffect(() => {

        function getAdvertData(_data) {

            if (advertData == 'undefined') {
                getAdvertData(advertData)
                console.log("Hit")
            }
            else {
                setIsAdvertsDataAvailable(true)
            }
        }
        getAdvertData(advertData)
        console.log("Available", advertData)
        console.log("Data", advertData)
        // setTenderAdverts(false)
    }, [isAdvertsDataAvailable])
    // console.log("====>>>>TenderAdvert", useGetContractData({ isAdverts: true }))
    // console.log("====>>>>T", useGetCompanyProfile({ address: '' }))

    // console.log(data.map((tender, index) => (tender['requestForQuotation'])))
    // console.log("======>>>>S", useGetContractData({ isStages: true }))
    // const entries = Object.entries(data)

    const handleApply = (event, rfqNumber) => {
        setRfqNumber(rfqNumber)
        setTenderAdverts(!isTenderAdverts)
        setApplyTender(true)

    }


    const handleViewApplications = (event, rfqNumber) => {
        setRfqNumber(rfqNumber)
        setTenderAdverts(!isTenderAdverts)
        setApplyTender(true)
        setViewApplicants(true)
    }

    const handleTrackApplications = (event, rfqNumber) => {
        setRfqNumber(rfqNumber)
        setTenderAdverts(!isTenderAdverts)
        setApplyTender(true)
        setTrackApplication(true)
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
                                <Th>RFQ Number</Th>
                                <Th>Start Date</Th>
                                <Th>End Date</Th>
                                <Th>Requirements</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {isAdvertsDataAvailable ?
                                <>
                                    {advertData.map((tender, index) => (
                                        <Tr>
                                            <Td>
                                                <Flex>
                                                    <Box>
                                                        <Image src="/cube.png" width="20" height="20" />
                                                    </Box>

                                                </Flex>
                                            </Td>
                                            {/* <Td>{companyName(tender['account'])}</Td> */}
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
                                                    {address === tender.account ?
                                                        <>
                                                            <Button
                                                                rightIcon={<ViewIcon />}
                                                                colorScheme='blue'
                                                                variant='outline'
                                                                onClick={(event) => handleViewApplications(event, tender['requestForQuotation'])}
                                                            >
                                                                View applications
                                                            </Button>
                                                        </> :
                                                        <Button
                                                            rightIcon={<ViewIcon />}
                                                            colorScheme='blue'
                                                            variant='outline'
                                                            onClick={(event) => handleTrackApplications(event, tender['requestForQuotation'])}

                                                        >
                                                            Track application
                                                        </Button>
                                                    }


                                                </Stack>
                                            </Td>

                                        </Tr>


                                    )
                                    )
                                    }
                                </>
                                :
                                <Stack>
                                    <Skeleton height='20px' />
                                    <Skeleton height='20px' />
                                    <Skeleton height='20px' />
                                </Stack>
                            }


                        </Tbody>

                    </Table>

                </TableContainer>

            </>

        )
    }

    return (
        <div>
            {isTenderAdverts ? <TenderAdvert /> : isApplyTender ?
                <>
                    <Button
                        leftIcon={<ArrowBackIcon />}
                        colorScheme='pink'
                        variant='solid'
                        onClick={event => {
                            setTenderAdverts(true)
                        }}
                    >Home</Button>
                    <DisplayTenderStages
                        rfqNumber={RfqNumber}
                        viewApplication={isViewApplicants}
                        trackApplication={isTrackApplication}
                    />
                </> :
                null}

        </div>
    )



}

export default Tenders
