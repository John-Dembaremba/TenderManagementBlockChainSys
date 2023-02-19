import type { NextPage } from 'next';
import Head from 'next/head';
import MainBody from "../components/MainBody";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>TenderManager</title>
      </Head>
      <div>
        <MainBody />
        <br />
        <Footer />
      </div>
    </div>
  )
}

export default Home
