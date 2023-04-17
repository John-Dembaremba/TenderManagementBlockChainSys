import React, { useState } from 'react';
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';
import TenderAdvert from '../../../components/TenderAdvert'
import PostTenderStages from '../../../components/PostTenderStages';
import rfqGenerator from '../../../utils/rfqGenerator';


const rfqNumber = rfqGenerator();
console.log("RFQ======>>>>", rfqNumber)

const TenderAdvertForm = () => {
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Initial Tender Details
            </Heading>
            <TenderAdvert rfqNumber={rfqNumber} />

        </>
    );
};

const TenderStagesForm = () => {
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Tender Stages Details
            </Heading>
            <PostTenderStages rfqNumber={rfqNumber} />
        </>
    );
};

const TenderInformationForm = () => {
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Tender Advert Details
            </Heading>

        </>
    );
};

export default function createTender() {
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(33.33);


    const handlePostedStages = () => {
        localStorage.setItem('Posted', JSON.stringify(false))
        setStep(3);
        setProgress(100);
    }

    const handlePostedTender = () => {
        setStep(2);
        setProgress(100);


    }


    return (
        <>
            <Box
                borderWidth="1px"
                rounded="lg"
                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                maxWidth={800}
                p={6}
                m="10px auto"
                as="form">
                <Progress
                    hasStripe
                    value={progress}
                    mb="5%"
                    mx="5%"
                    isAnimated></Progress>
                {step === 1 ? <TenderAdvertForm /> : step === 2 ? <TenderStagesForm /> : <TenderInformationForm />}

                {step === 1 ?
                    <Button
                        onClick={() => {
                            setStep(step + 1);
                        }}
                        colorScheme="teal"
                        variant="solid">
                        Post Tender Stages
                    </Button> :
                    <div>

                        <Flex h="10vh" justifyContent="center" alignItems="center">
                            {/* <Flex>
                            <Button
                                onClick={() => {
                                    setStep(step - 1);
                                    setProgress(progress - 33.33);
                                }}
                                isDisabled={step === 1}
                                colorScheme="teal"
                                variant="solid"
                                w="7rem"
                                mr="5%">
                                Back
                            </Button>
                            <Button
                                w="7rem"
                                isDisabled={step === 3}
                                onClick={() => handlePostedStages()}
                                colorScheme="teal"
                                variant="outline">
                                Next
                            </Button>
                        </Flex> */}

                            <>
                                {step === 2 &&
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
                                        onClick={() => handlePostedStages()}
                                    >
                                        Done Tender Stages Process
                                    </Button>

                                }
                            </>



                            {step === 3 ? (

                                <Button
                                    w="7rem"
                                    colorScheme="red"
                                    variant="solid"
                                    onClick={() => {
                                        toast({
                                            title: 'Account created.',
                                            description: "We've created your account for you.",
                                            status: 'success',
                                            duration: 3000,
                                            isClosable: true,
                                        });
                                    }}>
                                    Submit
                                </Button>
                            ) : null}
                        </Flex>

                    </div>
                }


            </Box>
        </>
    );
}