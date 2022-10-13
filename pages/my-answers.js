import Head from 'next/head';
import NavBar from '../components/Layout/NavBar';
// import Header from '../../components/Layout/Header';

const PremiumPage = () => {
  return (
    <>
      <Head>
        <title>SOLVE - Practicing makde easy</title>
        <meta
          name="description"
          content="SOLVE support your practicing journey"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/bacon.svg" />
      </Head>
      <main>
        <div className="blank-box">
          <h1>Answer Page</h1>
          <div>There is nothing here at the moment</div>
        </div>
      </main>
    </>
  );
};

export default PremiumPage;
