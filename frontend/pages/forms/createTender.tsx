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
    Box
} from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'

import { ArrowForwardIcon } from '@chakra-ui/icons'
import rfqGenerator from '../../utils/rfqGenerator';
import { useState } from 'react';
import { useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import TenderStages from '../../components/forms/TenderStages'

export default function createTender() {

    const rfqNum = rfqGenerator();
    // if page re-render dont update 'rfqNum', use that previo
    const [rfqNumber, setRfqNumber] = useState(rfqNum)

    // hook that listens for tender txt is added to the blockchain
    const [isPosted, setPosted] = useState(false)

    const handleSubmit = async (event: any) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        try {
            // Get data from the form.
            const data = {
                requestForQuotaion: event.target.requestForQuotaion.value,
                openDate: event.target.openDate.value,
                closingDate: event.target.closingDate.value,
                requirements: event.target.requirements.value
            }

            // call contract method for creating tender

            // if submitted correctly, pop modal with stages form
            if (rfqNumber === data.requestForQuotaion) {
                console.log("PostedB", isPosted)
                setPosted(true)
                console.log("PostedB", isPosted)
                // const [openModal, setOpenModel] = useState(< ModalHandler />);




            } else {
                console.log("No")
            }



        } catch (error) {

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
                            <Button
                                size='md'
                                height='48px'
                                width='500px'
                                border='2px'
                                type='submit'
                                rightIcon={<ArrowForwardIcon />}


                            >
                                Post Tender
                            </Button>
                        </Stack>

                    </FormControl>
                </form>


            </Container>
        </div>
    )
}
