import React from 'react'
import stageIdGenerator from '../../utils/stageIdGenerator';
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
import { useState } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons'

export default function TenderStages({ rfqNum }) {


    // if page re-render dont update 'rfqNum', use that previo
    const [stageNumber, setStageNumber] = useState(1)
    const stageId = stageIdGenerator(rfqNum, stageNumber);
    // const [isPosted, setIsPosted] = useState(false)

    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        console.log(isPosted)
        const data = {
            stageNumber: event.target.stageNumber.value,
            user: event.target.user.value,
            stageName: event.target.stageName.value,
            requirements: event.target.requirements.value
        }


        // Data is posted to blockchain
        

        setStageNumber(stageNumber+1)
       

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
                                    <Input htmlSize={12} width='auto' isDisabled type='text' value={stageId} name="stageNumber" id="stageNumber" />
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
                        <Input variant='Stage Name' placeholder='The name of this stage.' id="stageName" />


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
                            width='400px'
                            border='2px'
                            type='submit'
                            rightIcon={<ArrowForwardIcon />}

                        >
                            Post Tender Stages
                        </Button>
                    </Stack>

                </FormControl>
            </form>


            <br />
        </div>
    )
}
