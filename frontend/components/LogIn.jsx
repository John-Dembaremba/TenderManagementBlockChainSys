import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
    RadioGroup,
    Radio,
    Card,
    CardBody,
    CardHeader,
    StackDivider,

} from '@chakra-ui/react';

import { ConnectButton } from "@rainbow-me/rainbowkit";


export default function LogIn() {
    return (
        <Center py={6}>
            <Box
                maxW={'720px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>

                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    Blockchain based Tender Management System
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    in Ethereum Sepolia Network
                </Text>

                <Card>
                    <CardHeader>
                        <Heading size='md'>To begin follow instructions below: </Heading>
                    </CardHeader>

                    <CardBody>
                        <RadioGroup defaultValue='1'>
                            <Stack>
                                <Radio value='1' isDisabled>
                                    Checked
                                </Radio>
                                <Radio value='2'>Unchecked</Radio>
                                <Radio value='3'>Unchecked</Radio>
                            </Stack>
                        </RadioGroup>
                    </CardBody>
                </Card>

                <Stack mt={8} direction={'row'} spacing={4}>
                    <ConnectButton />
                    <Button
                        flex={1}
                        fontSize={'sm'}
                        // rounded={'full'}
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
            </Box>
        </Center>
    );
}