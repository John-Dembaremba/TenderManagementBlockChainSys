import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Stack, Link } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import Tenders from './Tenders'
import Bidders from './Bidders'
import { SimpleGrid } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi'


function MainBody() {
    const { address, isConnected, isDisconnected } = useAccount()
    console.log(isConnected)
    return (
        <>
            <Card align='center'>

                <CardBody>
                    <Stack mt={8} direction={'row'} spacing={4}>
                        <ConnectButton />
                        <Button
                            flex={1}
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
                            }}>
                            <Link href='forms/company-profile'>Create Company profile</Link>

                        </Button>
                    </Stack>
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
            {isConnected &&
                <>
                    <br />
                    <div className="flex-row">
                        {/* <SimpleGrid columns={2} spacing={10}> */}
                        <Box borderWidth='2px' borderRadius='lg'><Tenders /></Box>

                        {/* <Box borderWidth='2px' borderRadius='lg'><Bidders /></Box> */}
                        {/* </SimpleGrid> */}
                    </div>
                </>

            }


        </>


    )
}

export default MainBody