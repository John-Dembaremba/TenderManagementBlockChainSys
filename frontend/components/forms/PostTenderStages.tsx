import React from 'react'
import { useState } from 'react';
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
    Card, CardHeader, CardBody, CardFooter, Heading

} from '@chakra-ui/react'
import { ArrowForwardIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useAccount } from 'wagmi'
import abi from '../../../backend/artifacts/contracts/TenderManagementSystem.sol/TenderManagementSystem.json' assert {type: "json"}

function PostTenderStages({ rfqNumber }: any) {
    type TenderStagesFormData = {
        requestForQuotation?: string,
        stageId?: string,
        stageName?: string,
        requirements?: string,
    }

    const [tenderStagesFormData, setTenderStagesFormData] = useState([{ requestForQuotation: '', stageId: '', stageName: '', requirements: '' }])

    // try {
    //     const entries = Object.entries(data)
    //     return (
    //         <div>
    //             {entries.map(item => (
    //                 <ol className="items-center sm:flex">
    //                     {rfqNumber === item[1]["requestForQuotaion"] &&
    //                         <li className="relative mb-6 sm:mb-0">
    //                             <div className="flex items-center">
    //                                 <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
    //                                     <svg aria-hidden="true" className="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
    //                                 </div>
    //                                 <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
    //                             </div>

    //                             <div className="mt-3 sm:pr-8">

    //                                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item[1]["requestForQuotaion"]}</h3>
    //                                 <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 2, 2021</time>
    //                                 <p className="text-base font-normal text-gray-500 dark:text-gray-400">{item[1]["requirements"]}</p>
    //                             </div>
    //                         </li>
    //                     }

    //                 </ol>
    //             ))}
    //         </div>
    //     )
    // } catch (error) {
    //     console.log(error)
    //     return (
    //         <></>
    //     )
    // }
    const { config } = usePrepareContractWrite({
        address: "0x2F1c27d74db0eBD02A880f4A7334637AB85dEc82",
        abi: abi.abi,
        functionName: 'createTenderStages',
        args: [tenderStagesFormData[tenderStagesFormData.length - 1]['requestForQuotation'], tenderStagesFormData[tenderStagesFormData.length - 1]['stageId'], tenderStagesFormData[tenderStagesFormData.length - 1]['stageName'], tenderStagesFormData[tenderStagesFormData.length - 1]['requirements']]
    })


    const { data, isLoading, write } = useContractWrite(config)
    const { isSuccess, status, isIdle } = useWaitForTransaction({
        hash: data?.hash,
    })

    const handleTenderStagesFormChange = (index?: any, event?: any) => {
        let data = [...tenderStagesFormData];
        let stageNumber = index + 1
        data[index][event.target.name] = event.target.value;
        data[index]["stageId"] = stageNumber.toString()
        data[index]["requestForQuotation"] = rfqNumber
        setTenderStagesFormData(data)

    }

    const handleAddTenderStagesChange = (index?: number, addStage = false, postTenderStage = false) => {
        { postTenderStage && write?.(); }

        if (addStage) {
            setTenderStagesFormData([...tenderStagesFormData, { requestForQuotation: '', stageId: '', stageName: '', requirements: '' }]);
        }
        // setTenderStagesFormData([...tenderStagesFormData, { requestForQuotation: '', stageId: '', stageName: '', requirements: '' }]);
        // console.log(tenderStagesFormData[index])
    }

    const handleRemoveTenderStagesChange = (index?: any) => {
        let tenderStages = [...tenderStagesFormData];
        {
            tenderStagesFormData.length > 1 && tenderStages.splice(index, 1)
            setTenderStagesFormData(tenderStages)
        }

    }

    return (
        <div>
            <br />
            {tenderStagesFormData.map((input, index) => {
                return (
                    <div key={index}>


                        <SimpleGrid columns={3} spacing={3}>
                            <Box>

                                <Text mb='8px'>Stage {index + 1} Name:</Text>
                                <Input variant='outline' isRequired placeholder='The name of this stage.' id="stageName" name="stageName" value={input.stageName} onChange={event => handleTenderStagesFormChange(index, event)} />
                            </Box>
                            <Box>
                                <Grid templateColumns='repeat(2, 1fr)' gap={2}>
                                    <Box width='400px'>

                                        <Text mb='8px'>Requirements:</Text>
                                        <Textarea
                                            placeholder='Write your requirements here, clearly indicating important details.'
                                            size='sm'
                                            isRequired
                                            name="requirements"
                                            id="requirements"
                                            value={input.requirements}
                                            onChange={event => handleTenderStagesFormChange(index, event)}
                                        />
                                    </Box>
                                    <Box>

                                        <ButtonGroup mt={9} p={3} size='md' isAttached variant='outline'>
                                            <Tooltip label='Post Stage'>
                                                <Button
                                                    aria-label='Add stage'
                                                    height='48px'
                                                    width='50px'
                                                    onClick={() => handleAddTenderStagesChange(index, false, true)}
                                                >Post</Button>
                                            </Tooltip>
                                            <Tooltip label='Add Stage'>
                                                <IconButton
                                                    aria-label='Add stage'
                                                    height='48px'
                                                    width='20px'
                                                    icon={<AddIcon />}
                                                    onClick={() => handleAddTenderStagesChange(index, true, false)} />
                                            </Tooltip>
                                        </ButtonGroup>
                                    </Box>
                                </Grid>
                            </Box>

                        </SimpleGrid>

                        <br />
                        <Divider borderWidth={2} borderRadius={8} />
                        <br />
                    </div>)
            })}
        </div>
    )

}

export default PostTenderStages

