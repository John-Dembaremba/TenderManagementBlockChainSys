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


function TenderAdvert({ rfqNumber }: any) {

    type LoadedFormData = {
        requestForQuotation?: string,
        openDate?: string,
        closingDate?: string,
        requirements?: string,
    }

    // hook that grabs data on form submission
    const [tenderAdvertFormData, setTenderAdvertFormData] = useState({ requestForQuotation: '', openDate: '', closingDate: '', tenderRequirements: '' })

    const [isTenderAdvertDataReady, setTenderAdvertDataReady] = useState(false)
    const [isTenderStagesDataReady, setTenderStagesDataReady] = useState(false)
    const [isTenderFormSubmitted, setTenderFormSubmitted] = useState(false)

    const { config } = usePrepareContractWrite({
        address: "0x2F1c27d74db0eBD02A880f4A7334637AB85dEc82",
        abi: abi.abi,
        functionName: 'createTenderAdvert',
        args: [tenderAdvertFormData.requestForQuotation!, tenderAdvertFormData.openDate!, tenderAdvertFormData.closingDate!, tenderAdvertFormData.tenderRequirements!]
    })



    const { data, isLoading, write } = useContractWrite(config)
    const { isSuccess, status, isIdle } = useWaitForTransaction({
        hash: data?.hash,
    })

    const { address, isConnecting, isDisconnected } = useAccount()


    useEffect(() => {

        if (isTenderFormSubmitted) {
            // console.log("AD--->>", tenderAdvertFormData)
            write?.(); // the method for posting transactions to blockchain

            setTenderFormSubmitted(!isTenderFormSubmitted)
            setTenderAdvertDataReady(!isTenderAdvertDataReady)
            setTenderStagesDataReady(!isTenderStagesDataReady)


        }
    }, [isTenderFormSubmitted])

    const handleTenderAdvertsFormChange = (event?: any) => {
        if (event.target.name === 'openDate') {
            tenderAdvertFormData.openDate = event.target.value
        } else if (event.target.name === 'closingDate') {
            tenderAdvertFormData.closingDate = event.target.value
        } else if (event.target.name === 'tenderRequirements') {
            tenderAdvertFormData.tenderRequirements = event.target.value
        }

        tenderAdvertFormData.requestForQuotation = rfqNumber
        setTenderAdvertFormData(tenderAdvertFormData)
        setTenderAdvertDataReady(!isTenderAdvertDataReady)
    }

    const handleSubmit = (event?: any) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
        setTenderFormSubmitted(true)
    }


    return (
        <div>

            <form >
                <FormControl>

                    <Box p={8} maxHeight='500px' overflow='hidden' borderWidth={2} borderRadius={8} boxShadow='lg'>

                        <br />
                        <Stack spacing={3}>
                            <SimpleGrid columns={2} spacing={3}>
                                <Box>
                                    <InputGroup>
                                        <InputLeftAddon children='RFQ number' />

                                        <Input
                                            htmlSize={12} width='auto'
                                            isDisabled
                                            type='text'
                                            value={rfqNumber}
                                            name="requestForQuotation"
                                            id="requestForQuotation"
                                            onChange={event => handleTenderAdvertsFormChange(event)}
                                        />
                                    </InputGroup>
                                </Box>
                                <Box overflow='hidden'>
                                    <InputGroup>
                                        <InputLeftAddon children='Address' />
                                        <Input isDisabled type='text' value={address} name="user" id="user" onChange={event => handleTenderAdvertsFormChange(event)} />
                                    </InputGroup>
                                </Box>
                            </SimpleGrid>
                            <br />
                            <SimpleGrid columns={2} spacing={3}>
                                <Box >
                                    <Text mb='8px'>Opening Date:</Text>
                                    <Input
                                        placeholder="Select start date for bidding"
                                        size="md"
                                        type="datetime-local"
                                        isRequired
                                        name="openDate"
                                        id="openDate"
                                        onChange={event => handleTenderAdvertsFormChange(event)}
                                    />
                                </Box>
                                <Box >
                                    <Text mb='8px'>Closing Date:</Text>
                                    <Input
                                        placeholder="Select end date for bidding"
                                        size="md"
                                        type="datetime-local"
                                        isRequired
                                        name="closingDate"
                                        id="closingDate"
                                        onChange={event => handleTenderAdvertsFormChange(event)}
                                    />
                                </Box>

                            </SimpleGrid>
                            <br />
                            <Text mb='8px'>Requirements:</Text>
                            <Textarea
                                placeholder='Write your requirements here, clearly indicating important details.'
                                size='sm'
                                isRequired
                                name="tenderRequirements"
                                id="tenderRequirements"
                                onChange={event => handleTenderAdvertsFormChange(event)}
                            />
                        </Stack>

                    </Box>

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

                    {/* {
                            isLoading ? <Button
                                isLoading
                                loadingText='Mining Transaction'
                                variant='outline'
                            /> : <Button
                                size='md'
                                height='48px'
                                width='500px'
                                border='2px'
                                type='submit'
                                rightIcon={<ArrowForwardIcon />}
                                disabled={true}
                                onClick={event => handleSubmit}
                            >
                                Post Tender
                            </Button>
                        } */}
                </FormControl>
            </form>

        </div >
    )
}

export default TenderAdvert