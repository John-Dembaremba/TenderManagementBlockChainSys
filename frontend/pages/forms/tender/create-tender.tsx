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
    Card, CardHeader, CardBody, CardFooter, Heading

} from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'

import { ArrowForwardIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'
import rfqGenerator from '../../../utils/rfqGenerator';
import { useState, useEffect } from 'react';
import TenderStages from '../../../components/forms/TenderStages'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useAccount } from 'wagmi'
import abi from '../../../utils/contractAbi.json' assert {type: "json"};
import TimeLineTenderStages from '../../../components/TimeLineTenderStages';
import useGetContractData from '../../../components/CustomHooks/useGetContractData';

export default function createTender() {
    const rfqNum = rfqGenerator();
    // if page re-render dont update 'rfqNum', use that previo
    const [rfqNumber, setRfqNumber] = useState(rfqNum)

    type StagesFormData = {
        stageId?: string,
        stageName?: string,
        requirements?: string,
    }


    type LoadedFormData = {
        requestForQuotation?: string,
        openDate?: string,
        closingDate?: string,
        requirements?: string,
    }

    // hook that grabs data on form submission
    const [tenderAdvertFormData, setTenderAdvertFormData] = useState({ requestForQuotation: '', openDate: '', closingDate: '', tenderRequirements: '' })
    const [tenderStagesFormData, setTenderStagesFormData] = useState([{ stageId: '', stageName: '', requirements: '' }])
    const [isTenderAdvertDataReady, setTenderAdvertDataReady] = useState(false)
    const [isTenderStagesDataReady, setTenderStagesDataReady] = useState(false)
    const [isTenderFormSubmitted, setTenderFormSubmitted] = useState(false)



    // hook that listens for wait for transaction
    // if (isTenderFormSubmitted) {
    //     console.log("==============Hit============")
    //     const { write, data, isLoading, isSuccess, status, isIdle } = useWriteTender({ requestForQuotation: tenderAdvertFormData.requestForQuotation!, openDate: tenderAdvertFormData.openDate!, closingDate: tenderAdvertFormData.closingDate!, tenderRequirements: tenderAdvertFormData.tenderRequirements!, tenderStagesArray: tenderStagesFormData })
    //     write?.();
    //     console.log("LOading: ", isLoading)
    //     console.log("Status:", status)
    // }

    // call contract method for creating tender
    // const { config } = usePrepareContractWrite({
    //     address: "0x18b5Af6F8fc4800C74ef7682f28B97d6e0Dc126b",
    //     abi: abi,
    //     functionName: 'createTenderAdvert',
    //     args: [tenderAdvertFormData.requestForQuotation!, tenderAdvertFormData.openDate!, tenderAdvertFormData.closingDate!, tenderAdvertFormData.tenderRequirements!, tenderStagesFormData]
    // })


    const { write, data, isLoading } = useContractWrite({
        mode: "recklesslyUnprepared",
        address: "0x18b5Af6F8fc4800C74ef7682f28B97d6e0Dc126b",
        abi: abi,
        functionName: 'createTenderAdvert',
        args: [tenderAdvertFormData.requestForQuotation!, tenderAdvertFormData.openDate!, tenderAdvertFormData.closingDate!, tenderAdvertFormData.tenderRequirements!, tenderStagesFormData]
    })


    const { isSuccess, status, isIdle } = useWaitForTransaction({
        hash: data?.hash,
    })

    const { address, isConnecting, isDisconnected } = useAccount()


    useEffect(() => {

        if (isTenderFormSubmitted) {
            console.log("AD--->>", tenderAdvertFormData)
            console.log("st--->>", tenderStagesFormData)
            write?.(); // the method for posting transactions to blockchain

            console.log("=====>>>>", status)
            console.log("Data>>>>", data, "LD..", isLoading)
            console.log("Func", write?.())
            setTenderFormSubmitted(!isTenderFormSubmitted)
            setTenderAdvertDataReady(!isTenderAdvertDataReady)
            setTenderStagesDataReady(!isTenderStagesDataReady)
        }
        console.log("Form submitted: ", isTenderFormSubmitted)
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


    const handleTenderStagesFormChange = (index?: any, event?: any) => {
        let data = [...tenderStagesFormData];
        let stageNumber = index + 1
        data[index][event.target.name] = event.target.value;
        data[index]["stageId"] = stageNumber.toString()

        setTenderStagesFormData(data)
        setTenderStagesDataReady(true)

    }

    const handleAddTenderStagesChange = () => {
        setTenderStagesFormData([...tenderStagesFormData, { stageId: '', stageName: '', requirements: '' }]);
        setTenderStagesDataReady(true)
    }

    const handleRemoveTenderStagesChange = (index?: any) => {
        let tenderStages = [...tenderStagesFormData];
        {
            tenderStagesFormData.length > 1 && tenderStages.splice(index, 1)
            setTenderStagesFormData(tenderStages)
            setTenderStagesDataReady(true)
        }

    }

    const handleSubmit = (event?: any) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
        setTenderFormSubmitted(true)
    }




    return (
        <div>

            <br />
            <Card align='center'>

                <CardBody>
                </CardBody>
                <CardFooter>

                    {/* <TimeLineTenderStages rfqNumber={rfqNumber} /> */}

                </CardFooter>
            </Card>
            <br />

            <form onSubmit={handleSubmit}>
                <FormControl>
                    <SimpleGrid p={7} columns={2} spacing={2} borderWidth={2} borderRadius={8} boxShadow='lg'>


                        <Box p={8} maxHeight='500px' overflow='hidden' borderWidth={2} borderRadius={8} boxShadow='lg'>
                            <Heading textAlign='center'>Tender Advert</Heading>
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
                        <Box p={8} width='900px' maxHeight='500px' overflow='scroll' borderWidth={2} borderRadius={8} boxShadow='lg' >

                            <Heading textAlign='center'>Tender Stages</Heading>
                            <br />
                            {tenderStagesFormData.map((input, index) => {
                                return (
                                    <div key={index}>


                                        <SimpleGrid columns={3} spacing={3}>
                                            <Box>

                                                <Text mb='8px'>Stage {index + 1} Name:</Text>
                                                <Input variant='outline' isRequired placeholder='The name of this stage.' id="stageName" name="stageName" value={input.stageName} onChange={event => handleTenderStagesFormChange(index, event)} />
                                            </Box>
                                            <Box>
                                                <Grid templateColumns='repeat(2, 1fr)' gap={2}>
                                                    <Box width='450px'>

                                                        <Text mb='8px'>Requirements:</Text>
                                                        <Textarea
                                                            placeholder='Write your requirements here, clearly indicating important details.'
                                                            size='sm'
                                                            isRequired
                                                            name="requirements"
                                                            id="requirements"
                                                            value={input.requirements}
                                                            onChange={event => handleTenderStagesFormChange(index, event)}
                                                        />
                                                    </Box>
                                                    <Box>
                                                        <ButtonGroup mt={9} p={3} size='md' isAttached variant='outline' alignContent='center'>
                                                            <Tooltip label='Add new stage'>
                                                                <IconButton aria-label='Add stage' height='48px' width='50px' icon={<AddIcon />} onClick={() => handleAddTenderStagesChange()} />
                                                            </Tooltip>
                                                            <Tooltip label='Remove stage'>
                                                                <IconButton aria-label='Remove stage' height='48px' width='50px' icon={<DeleteIcon />} onClick={() => handleRemoveTenderStagesChange(index)} />
                                                            </Tooltip>
                                                        </ButtonGroup>
                                                    </Box>
                                                </Grid>
                                            </Box>

                                        </SimpleGrid>

                                        <br />
                                        <Divider borderWidth={2} borderRadius={8} />
                                        <br />
                                    </div>)
                            })}
                        </Box>

                        <Button
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
                    </SimpleGrid>
                </FormControl>
            </form>

        </div >
    )
}
