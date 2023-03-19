import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import Tenders from './Tenders'
import Bidders from './Bidders'
import { SimpleGrid } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { ConnectButton } from "@rainbow-me/rainbowkit";

function MainBody() {
    return (
        <>
            <Card align='center'>

                <CardBody>
                </CardBody>
                <CardFooter>
                    <ConnectButton />
                </CardFooter>
            </Card>
            <br />
            <div className="flex-row">
                <SimpleGrid columns={2} spacing={10}>
                    <Box borderWidth='2px' borderRadius='lg'><Tenders /></Box>

                    <Box borderWidth='2px' borderRadius='lg'><Bidders /></Box>
                </SimpleGrid>
            </div>
        </>


    )
}

export default MainBody