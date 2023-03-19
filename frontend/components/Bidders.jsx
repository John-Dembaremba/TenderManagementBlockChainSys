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
    TagLabel
} from '@chakra-ui/react'
import Image from 'next/image';
import { CheckCircleIcon, SmallCloseIcon, SpinnerIcon } from '@chakra-ui/icons'

function Tenders() {
    return (
        <div>
            <TableContainer>

                <h2 className="text-center font-medium text-xl leading-tight align-middle mt-0 mb-2">Bidders</h2>

                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Block Hash</Th>
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
                            <Td>HP</Td>
                            <Td>
                                <Tag size='lg' colorScheme='red' borderRadius='full'>
                                    <CheckCircleIcon />
                                    <TagLabel>Accepted</TagLabel>
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
                            <Td>Itel</Td>
                            <Td>
                                <Tag size='lg' colorScheme='green' borderRadius='full'>
                                    <SmallCloseIcon />
                                    <TagLabel>Rejected</TagLabel>
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
                            <Td>Itel</Td>
                            <Td>
                                <Tag size='lg' colorScheme='orange' borderRadius='full'>
                                    <SpinnerIcon />
                                    <TagLabel>Pending</TagLabel>
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