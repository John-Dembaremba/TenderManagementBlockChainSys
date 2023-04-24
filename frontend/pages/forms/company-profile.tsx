import React from 'react'

import {
    FormControl,
    FormErrorMessage,
    Input,
    Text,
    Textarea,
    Stack,
    InputLeftAddon,
    InputGroup,
    Button,
    ButtonGroup,
    IconButton,
    SimpleGrid,
    Box,
    Divider,
    Tooltip,
    Grid,
    Card, CardHeader, CardBody, CardFooter, Heading, Flex

} from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'

import { ArrowForwardIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useAccount } from 'wagmi'
import abi from '../../../backend/artifacts/contracts/TenderManagementSystem.sol/TenderManagementSystem.json' assert {type: "json"}


export default function TenderAdvert({ rfqNumber }: any) {

    type LoadedFormData = {
        companyName?: string,
        companyAddress?: string,
        contactInfo?: string,
        email?: string,
    }

    // hook that grabs data on form submission
    const [companyProfileFormData, setCompanyProfileFormData] = useState({ companyName: '', companyAddress: '', contactInfo: '', email: '' })

    const [isCompanyProfileDataReady, CompanyProfileDataReady] = useState(false)
    const [isCompanyFormDataSubmitted, setCompanyFormDataSubmitted] = useState(false)

    const { config } = usePrepareContractWrite({
        address: "0x2F1c27d74db0eBD02A880f4A7334637AB85dEc82",
        abi: abi.abi,
        functionName: 'createCompanyProfile',
        args: [companyProfileFormData.companyName!, companyProfileFormData.companyAddress!, companyProfileFormData.contactInfo!, companyProfileFormData.email!]
    })



    const { data, isLoading, write } = useContractWrite(config)
    const { isSuccess, status, isIdle } = useWaitForTransaction({
        hash: data?.hash,
    })

    const { address, isConnecting, isDisconnected } = useAccount()


    useEffect(() => {

        if (isCompanyFormDataSubmitted) {
            // console.log("AD--->>", companyProfileFormData)
            write?.(); // the method for posting transactions to blockchain
            // console.log(companyProfileFormData)
            setCompanyFormDataSubmitted(!isCompanyFormDataSubmitted)
            CompanyProfileDataReady(!isCompanyProfileDataReady)


        }
    }, [isCompanyFormDataSubmitted])

    const handleTenderAdvertsFormChange = (event?: any) => {
        if (event.target.name === 'companyAddress') {
            companyProfileFormData.companyAddress = event.target.value
        } else if (event.target.name === 'contactInfo') {
            companyProfileFormData.contactInfo = event.target.value
        } else if (event.target.name === 'email') {
            companyProfileFormData.email = event.target.value
        } else if (event.target.name === 'companyName') {
            companyProfileFormData.companyName = event.target.value
        }

        setCompanyProfileFormData(companyProfileFormData)
        CompanyProfileDataReady(!isCompanyProfileDataReady)
    }

    const handleSubmit = (event?: any) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
        setCompanyFormDataSubmitted(true)
    }


    return (
        <div>
            <form>
                <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%" pt={40}>
                    Create Company Profile
                </Heading>
                <FormControl>
                    <Box borderWidth="1px"
                        rounded="lg"
                        shadow="1px 1px 3px rgba(0,0,0,0.3)"
                        maxWidth={800}
                        p={6}
                        m="10px auto"
                        as="form">
                        <br />
                        <Stack spacing={3}>
                            <SimpleGrid columns={2} spacing={3}>
                                <Box>
                                    <InputGroup>
                                        <InputLeftAddon children='Company Name' />

                                        <Input
                                            htmlSize={12} width='auto'
                                            type='text'
                                            name="companyName"
                                            id="companyName"
                                            onChange={event => handleTenderAdvertsFormChange(event)}
                                        />
                                    </InputGroup>
                                </Box>
                                <Box overflow='hidden'>
                                    <InputGroup>
                                        <InputLeftAddon children='Email Address' />
                                        <Input type='text'
                                            name="user"
                                            id="user"
                                            onChange={event => handleTenderAdvertsFormChange(event)}
                                        />
                                    </InputGroup>
                                </Box>
                            </SimpleGrid>
                        </Stack>
                        <br />
                        <br />
                        <Stack spacing={3}>
                            <SimpleGrid columns={2} spacing={3}>
                                <Box>
                                    <InputGroup>
                                        <InputLeftAddon children='Contacts' />

                                        <Input
                                            htmlSize={12} width='auto'
                                            type='text'
                                            name="contactInfo"
                                            id="contactInfo"
                                            onChange={event => handleTenderAdvertsFormChange(event)}
                                        />
                                    </InputGroup>
                                </Box>
                                <Box overflow='hidden'>
                                    <InputGroup>
                                        <InputLeftAddon children='Physical Address' />
                                        <Input type='text'
                                            name="companyAddress"
                                            id="companyAddress"
                                            onChange={event => handleTenderAdvertsFormChange(event)}
                                        />
                                    </InputGroup>
                                </Box>
                            </SimpleGrid>
                        </Stack>


                        <br />
                        <br />
                        <Flex h="10vh" justifyContent="center" alignItems="center">
                            {
                                isLoading ? <Button
                                    isLoading
                                    loadingText='Mining Transaction'
                                    variant='outline'
                                /> :
                                    !isSuccess ?
                                        <Button

                                            size='lg'
                                            width='500px'
                                            px={4}
                                            fontSize={'sm'}
                                            rounded={'full'}
                                            bg={'blue.400'}
                                            color={'white'}
                                            boxShadow={
                                                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                            }
                                            _hover={{
                                                bg: 'blue.500',
                                            }}
                                            _focus={{
                                                bg: 'blue.500',
                                            }}
                                            onClick={event => handleSubmit(event)}
                                            type='submit'
                                        >
                                            Post Tender
                                        </Button> : status === 'loading' ?
                                            <Button
                                                isLoading
                                                loadingText='Waiting for Transaction Receipt'
                                                variant='outline'
                                            /> : null
                            }

                        </Flex>
                    </Box>
                </FormControl>
            </form>
        </div>
    )
}