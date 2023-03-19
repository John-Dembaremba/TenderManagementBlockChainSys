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
    Button
} from '@chakra-ui/react'
import Image from 'next/image';
import Link from 'next/link';
import { LockIcon, UnlockIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import useGetContractData from './CustomHooks/useGetContractData'

function Tenders() {
    // console.log(useGetContractData({ isAdverts: true }))
    return (
        <div>
            <TableContainer>
                <h2 className="text-center font-medium text-xl leading-tight align-middle mt-0 mb-2">Tenders</h2>
                <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline'>
                    <Link href='forms/tender/create-tender'>Create New Tender</Link>
                </Button>
                <br />
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Block Hash</Th>
                            <Th>Tender</Th>
                            <Th>Company</Th>
                            <Th>State</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>
                                <Flex>
                                    <Box>
                                        <Image src="/cube.png" width="20" height="20" />
                                    </Box>
                                    <Box>0x099872345</Box>
                                </Flex>
                            </Td>
                            <Td>Laptops</Td>
                            <Td>HP</Td>
                            <Td>
                                <Tag size='lg' colorScheme='red' borderRadius='full'>
                                    <LockIcon />
                                    <TagLabel>Closed</TagLabel>
                                </Tag>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td><Flex>
                                <Box>
                                    <Image src="/cube.png" width="20" height="20" />
                                </Box>
                                <Box>0x099872345</Box>
                            </Flex></Td>
                            <Td>Phones</Td>
                            <Td>Itel</Td>
                            <Td>
                                <Tag size='lg' colorScheme='green' borderRadius='full'>
                                    <UnlockIcon />
                                    <TagLabel>Open</TagLabel>
                                </Tag>
                            </Td>

                        </Tr>

                    </Tbody>

                </Table>


            </TableContainer>
        </div>
    )
}

export default Tenders