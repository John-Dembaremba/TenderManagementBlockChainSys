import React, { useState, useEffect } from 'react';
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    Link,
    Divider,
    Stack
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';
import TenderAdvert from '../../../components/forms/TenderAdvert';
import PostTenderStages from '../../../components/forms/PostTenderStages';
import TenderDetails from '../../../components/displays/TenderDetails';
import rfqGenerator from '../../../utils/rfqGenerator';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'
import dynamic from "next/dynamic";

function createTender() {
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(33.33);
    const [rfqNumber, setRfqNumber] = useState(rfqGenerator());

    useEffect(() => {
        if (step === 1) {
            setRfqNumber(rfqNumber)
        }
    }, [])

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
                <TenderDetails rfqNumber={rfqNumber} />

            </>
        );
    };

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
                    <>
                        <Divider orientation='horizontal' />
                        <br />
                        <Stack direction='row' spacing={4}>

                            <Button
                                onClick={() => {
                                    setStep(step + 1);
                                }}
                                rightIcon={<ArrowForwardIcon />}
                                colorScheme='pink'
                                variant='solid'
                            >
                                Create Tender Stages
                            </Button>
                            <Button
                                leftIcon={<ArrowBackIcon />}
                                colorScheme='pink'
                                variant='solid'
                            >
                                <Link href='../..'>Home</Link>
                            </Button>
                        </Stack>
                    </> :
                    <div>

                        <Flex h="10vh" justifyContent="center" alignItems="center">
                            <>
                                {step === 2 &&
                                    // ======= Step 3 ==============
                                    // <Button

                                    //     size='lg'
                                    //     width='500px'
                                    //     px={4}
                                    //     fontSize={'sm'}
                                    //     rounded={'full'}
                                    //     bg={'blue.400'}
                                    //     color={'white'}
                                    //     boxShadow={
                                    //         '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                    //     }
                                    //     _hover={{
                                    //         bg: 'blue.500',
                                    //     }}
                                    //     _focus={{
                                    //         bg: 'blue.500',
                                    //     }}
                                    //     onClick={() => handlePostedStages()}
                                    // >
                                    //     Done Tender Stages Process
                                    // </Button>
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
                                    >
                                        <Link href='../..'>Home</Link>
                                    </Button>

                                }
                            </>



                            {step === 3 ? (

                                <Button
                                    colorScheme="red"
                                    variant="solid"
                                    onClick={() => {
                                        toast({
                                            title: 'Tender created.',
                                            description: "Your Tender was successfully posted.",
                                            status: 'success',
                                            duration: 3000,
                                            isClosable: true,
                                        });
                                        setRfqNumber(rfqGenerator());
                                        setStep(1);

                                    }}>
                                    Create New Tender
                                </Button>
                            ) : null}
                        </Flex>

                    </div>
                }


            </Box>
        </>
    );
}

export default dynamic(() => Promise.resolve(createTender), { ssr: false })