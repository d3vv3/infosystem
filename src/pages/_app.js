import Head from 'next/head';
import Layout from '../components/Layout';

import '../styles/styles.scss';

export default function App() {
  return (
    <div className="app">
      <Head>
        <title>Satelec 2023</title>
        <meta name="description" content="An infosystem display for Satelec 2023" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout />
      </main>
    </div>
  );
}
