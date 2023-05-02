import React from 'react'
import { useRouter } from 'next/router'
import useGetContractData from '../../../components/CustomHooks/useGetContractData'
import useGetCompanyProfile from '../../../components/CustomHooks/useGetCompanyProfile'
import companyProfile from '../../../utils/companyProfile';
import { useState, useEffect } from 'react'
import dynamic from "next/dynamic";
import {
    Button,
    SimpleGrid,
    Card,
    CardHeader,
    Heading,
    CardBody,
    CardFooter,
    Divider,
    Text,
    List,
    ListItem,
    ListIcon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Radio,
    RadioGroup,
    Stack,
    Link,
    Textarea,
    Image,
    Box

} from '@chakra-ui/react'
import { InfoIcon, EmailIcon, PhoneIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useAccount } from 'wagmi'
import abi from '../../../../backend/artifacts/contracts/TenderManagementSystem.sol/TenderManagementSystem.json' assert {type: "json"}

function bidAssessment() {
    const biddersApplications = useGetContractData({ isBidders: true })

    const getBiddersData = (data?: any) => {
        if (data === 'undefined') {
            getBiddersData(data);
        } else {
            return data
        }
    }

    type LoadedFormData = { applicationId?: string, isAccepted?: boolean, reasons?: string }

    const [biddersData, setBiddersData] = useState(getBiddersData(biddersApplications))
    const [dataReady, setDataReady] = useState(false)
    const [FormData, setFormData] = useState({ applicationId: '', isAccepted: false, reasons: '' })
    const router = useRouter()
    const { stageId, rfqNumber } = router.query




    const { config } = usePrepareContractWrite({
        address: "0x2F1c27d74db0eBD02A880f4A7334637AB85dEc82",
        abi: abi.abi,
        functionName: 'createTenderProcess',
        args: [FormData.applicationId!, FormData.isAccepted!, FormData.reasons!]
    })

    const { data, isLoading, write } = useContractWrite(config)
    const { isSuccess, status, isIdle } = useWaitForTransaction({
        hash: data?.hash,
    })

    const handleFormChange = (event?: any) => {
        if (event.target.name === 'accept') {
            FormData.isAccepted = true
        } else if (event.target.name === 'reject') {
            FormData.isAccepted = false
        } else if (event.target.name === 'reasons') {
            FormData.reasons = event.target.value
        }
        setFormData(FormData)


    }

    const applicationsArray = biddersApplications.filter((bid?: any) =>
        bid.applicationId === rfqNumber
    ).filter((bid?: any) =>
        bid.tenderStage === stageId
    )

    const handleSubmit = (event?: any, bidderAccount?: any) => {
        event.preventDefault()

        FormData.applicationId = rfqNumber + ":" + stageId + ":" + bidderAccount
        setFormData(FormData)
        setDataReady(true)
        console.log(FormData)
        console.log(dataReady)
        // if (FormData.applicationId)
        { dataReady && write?.(); }
        // setDataReady(false)
        // write?.();
    }


    return (
        <div>
            <SimpleGrid mt='5' spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
                {applicationsArray.map((bid?: any, index?: any) => (
                    <Card>
                        <CardHeader>
                            <Heading size='md'> Accept/Reject Application</Heading>
                        </CardHeader>
                        <CardBody>
                            <List spacing={3}>
                                <ListItem>
                                    <ListIcon as={InfoIcon} color='green.500' />
                                    Company Name: {companyProfile(bid.account).companyName}
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={InfoIcon} color='green.500' />
                                    Company Physical Address: {companyProfile(bid.account).companyAddress}
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={PhoneIcon} color='green.500' />
                                    Contact Details: {companyProfile(bid.account).contactInfo}
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={EmailIcon} color='green.500' />
                                    Email: {companyProfile(bid.account).email}
                                </ListItem>
                            </List>
                            <Divider />
                            <br />

                            <>
                                <Button
                                    variant='solid'
                                >
                                    <Link href={"https://skywalker.infura-ipfs.io/ipfs/" + bid.biddingDocs}>View Document</Link>
                                </Button>

                                <form>
                                    <br />
                                    <RadioGroup>
                                        <Stack spacing={5} direction='row'>
                                            <Radio
                                                colorScheme='green'
                                                value='1'
                                                name='accept'
                                                id='accept'
                                                onChange={event => handleFormChange(event)}
                                            >
                                                Accept
                                            </Radio>
                                            <Radio
                                                colorScheme='red'
                                                value='2'
                                                name='reject'
                                                id='reject'
                                                onChange={event => handleFormChange(event)}
                                            >
                                                Reject
                                            </Radio>
                                        </Stack>
                                    </RadioGroup>
                                    <br />
                                    <Text mb='8px'>Reasons:</Text>
                                    <Textarea
                                        placeholder='State reasons for accepting or rejecting this application'
                                        size='sm'
                                        isRequired
                                        name="reasons"
                                        id="reasons"
                                        onChange={event => handleFormChange(event)}
                                    />

                                    <br />
                                    <br />
                                    {
                                        isLoading ? <Button
                                            isLoading
                                            loadingText='Mining Transaction'
                                            variant='outline'
                                        /> :
                                            <Button
                                                size='lg'
                                                width='400px'
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
                                                onClick={event => handleSubmit(event, bid.account)}
                                                type='submit'
                                            >
                                                Post
                                            </Button>
                                    }
                                </form>

                            </>

                        </CardBody>
                        <CardFooter>
                            <Button
                                leftIcon={<ArrowBackIcon />}
                                colorScheme='pink'
                                variant='solid'
                            >
                                <Link href='../..'>Home</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                ))}

            </SimpleGrid>
        </div>
    )
}

export default dynamic(() => Promise.resolve(bidAssessment), { ssr: false })