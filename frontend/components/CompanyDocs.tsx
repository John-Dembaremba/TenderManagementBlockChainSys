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

} from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'

import DocumentUpload from './forms/DocumentUpload';
import { ArrowForwardIcon } from '@chakra-ui/icons'
import docIdGenerator from '../utils/docIdGenerator';
import { useState, useEffect } from 'react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import abi from '../utils/contractAbi.json' assert {type: "json"};

function CompanyDocs({ userAddress }: any) {
    // if page re-render dont update 'rfqNum', use that previo
    const [docNumber, setdocNumber] = useState(1)
    const documentId = docIdGenerator(userAddress, docNumber);

    type LoadedFormData = {
        docId?: string,
        name?: string,
        docAddress?: string
    }



    // hook that grabs data on form submission
    const [formData, setFormData] = useState({ docId: '', name: '', docAddress: '' })

    const [isformSubmited, setformSubmited] = useState(false)

    // call contract method for creating tender
    const { config } = usePrepareContractWrite({
        address: '0x9Cb6a5Bd38664dF4ae72d3da4aAEBfEf62145897',
        abi: abi.abi,
        functionName: 'createCompanyDocs',
        args: [formData.docId!, formData.name!, formData.docAddress!]
    })

    // hook that listens for wait for transaction

    const { write, data } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })


    useEffect(() => {
        if (isformSubmited) {
            // write?.(); // the method for posting transactions to blockchain
            console.log()
            setformSubmited(!isformSubmited)
        }
    }, [isformSubmited])


    const handleSubmit = (event: any) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        try {
            // Get data from the form.
            const formData = {
                docId: event.target.docId.value,
                name: event.target.name.value,
                docAddress: event.target.docAddress.value
            }

            setFormData({
                docId: formData.docId,
                name: formData.name,
                docAddress: formData.docAddress
            })

            // Increase the stagenumber suffix
            setdocNumber(docNumber + 1)

            setformSubmited(!isformSubmited)


        } catch (error) {
            console.log("Error==>>", error)
        }
    }




    return (
        <div>

            <br />

            <br />

            <Container maxW='550px'>
                {
                    isSuccess ?
                        <>

                        </>

                        :
                        <form onSubmit={handleSubmit}>

                            <FormControl>
                                <Stack spacing={3}>
                                    <SimpleGrid columns={2} spacing={3}>
                                        <Box>
                                            <InputGroup>
                                                <InputLeftAddon children='Document Id' />

                                                <Input htmlSize={12} width='auto' isDisabled type='text' value={documentId} name="docId" id="docId" />
                                            </InputGroup>
                                        </Box>
                                        <Box overflow='hidden'>



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
                }



            </Container>

        </div>
    )
}

export default CompanyDocs