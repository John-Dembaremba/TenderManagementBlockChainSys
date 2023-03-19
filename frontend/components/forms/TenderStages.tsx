import React from 'react'
import stageIdGenerator from '../../utils/stageIdGenerator';
import {
    FormControl,
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
import { useState, useEffect } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useConnect } from 'wagmi'
import abi from '../../utils/contractAbi.json' assert {type: "json"};



export default function TenderStages({ rfqNum, disConnected }: any) {

    // Get Company name
    const [stageNumber, setStageNumber] = useState(1)
    const stageId = stageIdGenerator(rfqNum, stageNumber);

    type LoadedFormData = {
        rfqNumber?: string
        tenderStageId?: string,
        stageName?: string,
        requirements?: string,
    }

    // hook that grabs data on form submission
    const [formData, setFormData] = useState({ tenderStageId: '', stageName: '', requirements: '', rfqNumber: '' })

    const [isformSubmited, setformSubmited] = useState(false)


    // call contract method for creating tender

    const { config } = usePrepareContractWrite({
        address: '0xdA2474Fa84A6e56AF0435aB7d0FB06F3562EF285',
        abi: abi.abi,
        functionName: 'createTenderStages',
        args: [formData.rfqNumber!, formData.tenderStageId!, formData.stageName!, formData.requirements!]
    })

    const { write, data, isLoading } = useContractWrite(config)
    const { connect, connectors, error } = useConnect()

    const { isSuccess, status, isIdle } = useWaitForTransaction({
        hash: data?.hash,
    })

    const isMining = () => {
        if (status === "loading") {
            return true
        } else {
            return false
        }
    }



    useEffect(() => {

        if (isformSubmited) {
            write?.()
            // Increase the stagenumber suffix
            {
                isSuccess &&
                    setStageNumber(stageNumber + 1)
            }

            setformSubmited(!isformSubmited)
        }
    }, [isformSubmited])


    const handleSubmit = (event: any) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        const payload = {
            tenderStageId: event.target.tenderStageId.value,
            user: event.target.user.value,
            stageName: event.target.stageName.value,
            requirements: event.target.requirements.value
        }

        setFormData({
            rfqNumber: rfqNum,
            tenderStageId: payload.tenderStageId,
            stageName: payload.stageName,
            requirements: payload.requirements
        })



        // indicator for successful form submission 
        setformSubmited(!isformSubmited)

    }

    return (
        <div>

            <br />

            <form onSubmit={handleSubmit}>

                <FormControl>
                    <Stack spacing={3}>
                        <SimpleGrid columns={2} spacing={3}>
                            <Box>
                                <InputGroup>
                                    <InputLeftAddon children='StageId' />
                                    <Input htmlSize={12} width='auto' isDisabled type='text' value={stageId} name="tenderStageId" id="tenderStageId" />
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
                        <Text mb='8px'>Stage Name:</Text>
                        <Input variant='outline' placeholder='The name of this stage.' id="stageName" />


                        <Text mb='8px'>Requirements:</Text>
                        <Textarea
                            placeholder='Write your requirements here, clearly indicating importan details.'
                            size='sm'
                            isRequired
                            name="requirements"
                            id="requirements"
                        />
                        <br />
                        <p>
                            {status}
                        </p>
                        {
                            isLoading ? <Button
                                isLoading
                                loadingText='Transaction Signing'
                                variant='outline'
                            />
                                :
                                { isMining } && !isSuccess && !isIdle ?
                                    <Button
                                        isLoading
                                        loadingText='Mining Transaction'
                                        variant='outline'
                                    /> :
                                    <Button
                                        size='md'
                                        height='48px'
                                        width='400px'
                                        border='2px'
                                        type='submit'
                                        rightIcon={<ArrowForwardIcon />}

                                    > Post Tender Stages
                                    </Button>
                        }

                    </Stack>

                </FormControl>
            </form>


            <br />
        </div>
    )
}
