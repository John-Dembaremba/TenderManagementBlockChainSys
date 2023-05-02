import React, { useState } from 'react'
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
    Card, CardHeader, CardBody, CardFooter, Heading, AlertIcon, Alert

} from '@chakra-ui/react'
import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_API_KEY;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_SECRETE_KEY;
const encoder = Buffer.from(projectId + ":" + projectSecret).toString('base64')
const authorization = "Basic " + encoder
import abi from '../../../backend/artifacts/contracts/TenderManagementSystem.sol/TenderManagementSystem.json' assert {type: "json"}
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useAccount } from 'wagmi'


console.log("Daa=======================>>>>", projectId)
const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/",
    headers: {
        authorization,
    },
});


function BiddingDocuments({ rfqNumber, stageNumber }: any) {

    type LoadedData = {
        stageNumber?: string,
        file?: object
    }

    const [uploadedfile, setUploadedfile] = useState({ stageNumber: stageNumber, file: {} })
    const [imagePath, setImagePath] = useState([])
    const [ipfsStatus, setIpfsStatus] = useState('')


    const { config } = usePrepareContractWrite({
        address: "0x2F1c27d74db0eBD02A880f4A7334637AB85dEc82",
        abi: abi.abi,
        functionName: 'createBidTender',
        args: [rfqNumber, stageNumber, imagePath]
    })

    const { data, isLoading, write } = useContractWrite(config)
    const { isSuccess, status, isIdle } = useWaitForTransaction({
        hash: data?.hash,
    })


    const handleFileChange = (event?: any) => {
        console.log(event.target.files)
        if (event.target.files) {
            const fileObject = event.target.files

            console.log(fileObject)

            // console.log("=====>>>>", Object.keys(fileObject))
            setUploadedfile({ stageNumber: stageNumber, file: fileObject })
        }
    }


    const onSubmitHandler = async (event?: any) => {
        event.preventDefault();

        if (uploadedfile.file.length === undefined) {
            return alert("No files selected");
        }

        setIpfsStatus("Initializing")

        // for (const index in list) {
        //     // Get each file and upload to IPFS
        //     console.log("=====>>>>", uploadedfile.file[index])
        //     const file = uploadedfile.file[index]

        //     const ipfs_result = await ipfs?.add(file)
        //     setImagePath([...imagePath, ipfs_result.path])
        // }
        const file = uploadedfile.file[0]
        const ipfs_result = await ipfs?.add(file)
        setImagePath([ipfs_result.path])

        if (imagePath.length === 0) {
            setIpfsStatus("")
            alert("Something went wrong. Please Resubmit your file!")
        } else {
            if (ipfs_result.path) {
                setIpfsStatus("Posting")
            }
            setIpfsStatus("Posted")
            write?.();
        }
        setIpfsStatus("")
        event.target.reset();
    }


    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <>
                    <SimpleGrid columns={2} spacing={3}>

                        <Box >
                            <div className="mb-3">
                                <label
                                    htmlFor="formFileMultiple"
                                    className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                                >Upload Documents</label
                                >
                                <input
                                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                    type="file"
                                    id="formFileMultiple"
                                    name="file"
                                    multiple
                                    onChange={event => handleFileChange(event)}
                                />
                            </div>
                        </Box>
                        <Box>
                            <Tooltip label='Apply Stage'>
                                {ipfsStatus === 'Initializing' ?
                                    <>
                                        <Button
                                            isLoading
                                            mt='6'
                                            flex={1}
                                            fontSize={'sm'}
                                            rounded={'full'}
                                            loadingText='Initializing IPFS'
                                            variant='outline' />

                                    </> :
                                    ipfsStatus === 'Posting' ?
                                        <>
                                            <Button
                                                isLoading
                                                mt='6'
                                                flex={1}
                                                fontSize={'sm'}
                                                rounded={'full'}
                                                loadingText='Posting to IPFS'
                                                variant='outline' />
                                        </> :
                                        ipfsStatus === 'Posted' ?
                                            <>
                                                <Button
                                                    isLoading
                                                    mt='6'
                                                    flex={1}
                                                    fontSize={'sm'}
                                                    rounded={'full'}
                                                    loadingText='Documents uploaded'
                                                    variant='outline' />
                                            </> :
                                            isLoading ? <Button
                                                isLoading
                                                mt='6'
                                                flex={1}
                                                fontSize={'sm'}
                                                rounded={'full'}
                                                bg={'red.400'}
                                                loadingText='Mining Transaction'
                                                variant='outline'
                                            /> :
                                                <Button
                                                    mt='6'
                                                    flex={1}
                                                    fontSize={'sm'}
                                                    rounded={'full'}
                                                    bg={'blue.400'}
                                                    color={'white'}
                                                    type="submit"
                                                    boxShadow={
                                                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                                    }
                                                    _hover={{
                                                        bg: 'blue.500',
                                                    }}
                                                    _focus={{
                                                        bg: 'blue.500',
                                                    }}>
                                                    Submit Document(s)
                                                </Button>


                                }

                            </Tooltip>
                        </Box>

                    </SimpleGrid>
                </>

            </form>
        </div>

    )
}

export default BiddingDocuments