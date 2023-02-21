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
    SimpleGrid,
    Box,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
} from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'

import { ArrowForwardIcon } from '@chakra-ui/icons'
import rfqGenerator from '../../utils/rfqGenerator';
import { useState, useEffect } from 'react';
import { useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import TenderStages from '../../components/forms/TenderStages'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import abi from '../../utils/contractAbi.json' assert {type: "json"};


export default function createTender() {

    const rfqNum = rfqGenerator();
    // if page re-render dont update 'rfqNum', use that previo
    const [rfqNumber, setRfqNumber] = useState(rfqNum)

    type LoadedFormData = {
        requestForQuotaion?: string,
        openDate?: string,
        closingDate?: string,
        requirements?: string
    }

    // hook that grabs data on form submission
    const [formData, setFormData] = useState({ requestForQuotaion: '', openDate: '', closingDate: '', requirements: '' })

    const [isformSubmited, setformSubmited] = useState(false)

    // call contract method for creating tender
    const { config } = usePrepareContractWrite({
        address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        abi: abi.abi,
        functionName: 'createTenderAdvert',
        args: [formData.requestForQuotaion!, formData.openDate!, formData.closingDate!, formData.requirements]
    })

    const { data, isLoading, isSuccess, write } = useContractWrite(config)

    // if (isformSubmited) {
    //     const postTransaction = async () => {
    //         return 
    //     }

    //     postTransaction().then((e) => {
    //         console.log(e)
    //     })
    //     // console.log("Loading...: ", isLoading)
    //     // console.log("FData=>", formData)
    //     // console.log("Poted? : ", isSuccess)
    //     console.log("data: ", formData)
    //     setformSubmited(!isformSubmited)
    // }

    useEffect(() => {
        console.log("Mounted==>>", isformSubmited)
        if (isformSubmited) {
            write?.(); // the method for posting transactions to blockchain
            setformSubmited(!isformSubmited)
        }
    }, [isformSubmited])





    const handleSubmit = (event: any) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        try {
            // Get data from the form.
            const formData = {
                requestForQuotaion: event.target.requestForQuotaion.value,
                openDate: event.target.openDate.value,
                closingDate: event.target.closingDate.value,
                requirements: event.target.requirements.value
            }

            setFormData({
                requestForQuotaion: formData.requestForQuotaion,
                openDate: formData.openDate,
                closingDate: formData.closingDate,
                requirements: formData.requirements
            })

            setformSubmited(!isformSubmited)


        } catch (error) {
            console.log("Error==>>", error)
        }
    }


    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)



    return (
        <div>

            <br />
            {
                isSuccess &&
                <>
                    <Button
                        onClick={() => {
                            setOverlay(<OverlayOne />)
                            onOpen()
                        }}
                    >
                        Create Tender Stages
                    </Button>
                    <Modal isCentered isOpen={isOpen} onClose={onClose} size='3xl'>
                        {overlay}
                        <ModalContent>
                            <ModalHeader>Modal Title</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <TenderStages rfqNum={rfqNumber} />
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onClose}>Close</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                </>
            }
            <br />
            <Container maxW='550px'>
                <form onSubmit={handleSubmit}>

                    <FormControl>
                        <Stack spacing={3}>
                            <SimpleGrid columns={2} spacing={3}>
                                <Box>
                                    <InputGroup>
                                        <InputLeftAddon children='RFQ number' />

                                        <Input onChange={(e) => { setRfqNumber(e.target.value) }} htmlSize={12} width='auto' isDisabled type='text' value={rfqNumber} name="requestForQuotaion" id="requestForQuotaion" />
                                    </InputGroup>
                                </Box>
                                <Box overflow='hidden'>
                                    <InputGroup>
                                        <InputLeftAddon children='Address' />
                                        <Input isDisabled type='text' value="0x9982g5528" name="user" id="user" />
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
                                    />
                                </Box>

                            </SimpleGrid>
                            <br />
                            <Text mb='8px'>Requirements:</Text>
                            <Textarea
                                placeholder='Write your requirements here, clearly indicating importan details.'
                                size='sm'
                                isRequired
                                name="requirements"
                                id="requirements"
                            />
                            <br />
                            {
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

                                >
                                    Post Tender
                                </Button>
                            }

                        </Stack>

                    </FormControl>
                </form>


            </Container>

        </div>
    )
}
