import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from "../components/NavBar";
import { ChakraProvider } from '@chakra-ui/react'
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from "wagmi/providers/public";
import { goerli, sepolia, mainnet } from 'wagmi/chains';


const { chains, provider } = configureChains(
  [
    mainnet,
    goerli,
    sepolia,
  ],
  [infuraProvider({ apiKey: process.env.INFURA_API_KEY! }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});



function MyApp({ Component, pageProps }: AppProps) {
  return (

    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider theme={darkTheme()} chains={chains}>
        <ChakraProvider>
          <NavBar />
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>


  )
}

export default MyApp

