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

import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import abi from '../../utils/contractAbi.json' assert {type: "json"};


export default function createTender() {

    type LoadedFormData = {
        companyName?: string,
        companyAddress?: string,
        contactInfo?: string,
        email?: string
    }



    // hook that grabs data on form submission
    const [formData, setFormData] = useState({ companyName: '', companyAddress: '', contactInfo: '', email: '' })

    const [isformSubmited, setformSubmited] = useState(false)

    // call contract method for creating tender
    const { config } = usePrepareContractWrite({
        address: '0x9Cb6a5Bd38664dF4ae72d3da4aAEBfEf62145897',
        abi: abi.abi,
        functionName: 'createCompanyProfile',
        args: [formData.companyName!, formData.companyAddress!, formData.contactInfo!, formData.email]
    })

    // hook that listens for wait for transaction

    const { write, data } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })


    useEffect(() => {
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
                companyName: event.target.companyName.value,
                companyAddress: event.target.companyAddress.value,
                contactInfo: event.target.contactInfo.value,
                email: event.target.email.value
            }

            setFormData({
                companyName: formData.companyName,
                companyAddress: formData.companyAddress,
                contactInfo: formData.contactInfo,
                email: formData.email
            })

            setformSubmited(!isformSubmited)


        } catch (error) {
            console.log("Error==>>", error)
        }
    }




    return (
        <div>

            <br />

            <br />

            <Container maxW='700px'>
                {
                    isSuccess ?
                        <>

                        </>

                        :
                        <form onSubmit={handleSubmit}>

                            <FormControl>
                                <Stack spacing={6}>
                                    <SimpleGrid columns={2} spacing={2}>
                                        <Box>
                                            <Text mb='8px'>Company Name:</Text>
                                            <Input htmlSize={20} width='auto' type='text' name="companyName" id="companyName" />

                                        </Box>
                                        <Box overflow='hidden'>
                                            <Text mb='8px'>Physical Address:</Text>
                                            <Input htmlSize={20} width='auto' type='text' name="companyAddress" id="companyAddress" />

                                        </Box>
                                    </SimpleGrid>
                                    <br />
                                    <SimpleGrid columns={2} spacing={2}>
                                        <Box >
                                            <Text mb='8px'>Contacts:</Text>
                                            <Input htmlSize={20} width='auto' type='text' name="contactInfo" id="contactInfo" />

                                        </Box>
                                        <Box >
                                            <Text mb='8px'>Email:</Text>
                                            <Input htmlSize={20} width='auto' type='text' name="email" id="email" />
                                        </Box>

                                    </SimpleGrid>

                                    <br />
                                    {
                                        isLoading ? <Button
                                            isLoading
                                            loadingText='Mining Transaction'
                                            variant='outline'
                                        /> : <Button
                                            size='md'
                                            height='48px'
                                            width='580px'
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
