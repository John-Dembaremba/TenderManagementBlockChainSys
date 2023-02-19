import React from 'react'
import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';






function Footer() {
    return (
        <div>
            <footer className="text-center lg:text-left">
                <div className="text-center p-4">
                    © 2023 Copyright:
                    <a href="#">Tender Management System</a>
                </div>
            </footer>
        </div>
    )
}

export default Footer