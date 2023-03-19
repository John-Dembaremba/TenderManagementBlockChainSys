import React from 'react'
import {
    useDisclosure,
    Button,
    Collapse,
    Box,

} from '@chakra-ui/react'


function Drawer({ open, data }: any) {

    const { isOpen, onToggle } = useDisclosure()

    return (
        <>
            {open && onToggle()
            }
            <Collapse in={isOpen} animateOpacity>
                <Box
                    p='40px'
                    color='white'
                    mt='4'
                    bg='teal.500'
                    rounded='md'
                    shadow='md'
                >
                    {data}
                </Box>
            </Collapse>
        </>
    )
}


export default Drawer