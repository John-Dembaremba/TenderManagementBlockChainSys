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
    ButtonGroup,
    IconButton,
    SimpleGrid,
    Box,
    Divider,
    Tooltip,
    Grid,
    Card, CardHeader, CardBody, CardFooter, Heading

} from '@chakra-ui/react'



function BiddingDocuments({ rfqNumber, stageNumber }: any) {
    return (
        <div>
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
                            multiple
                        />
                    </div>
                </Box>
                <Box>
                    <Tooltip label='Apply Stage'>
                        <Button
                            mt='6'
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'blue.400'}
                            color={'white'}
                            type='submit'
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
                    </Tooltip>
                </Box>
            </SimpleGrid>
        </div>
    )
}

export default BiddingDocuments