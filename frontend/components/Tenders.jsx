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
    Skeleton, SkeletonCircle, SkeletonText
} from '@chakra-ui/react'
import Image from 'next/image';
import Link from 'next/link';
import { ViewIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import useGetContractData from './CustomHooks/useGetContractData'
import useGetCompanyProfile from './CustomHooks/useGetCompanyProfile';
import DisplayTenderStages from './displays/DisplayTenderStages';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi'
import dynamic from "next/dynamic";


const isSSREnabled = () => typeof window === 'undefined';


function Tenders() {
    const advertData = useGetContractData({ isAdverts: true })
    const [isAdvertsDataAvailable, setIsAdvertsDataAvailable] = useState(false)
    const [isTenderAdverts, setTenderAdverts] = useState(true)
    const [isApplyTender, setApplyTender] = useState(false)
    const [RfqNumber, setRfqNumber] = useState('')
    const { isConnected, address } = useAccount()
    console.log(address)
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
                                                            <Button rightIcon={<ViewIcon />} colorScheme='blue' variant='outline'>
                                                                View applications
                                                            </Button>
                                                        </> :
                                                        <Button rightIcon={<ViewIcon />} colorScheme='blue' variant='outline'>
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
            {isTenderAdverts ? <TenderAdvert /> : isApplyTender ? <DisplayTenderStages rfqNumber={RfqNumber} /> : null}

        </div>
    )



}

export default Tenders