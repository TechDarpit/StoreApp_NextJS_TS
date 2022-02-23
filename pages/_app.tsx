import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Fragment } from 'react';
import Layout from '../components/layout/Layout';
import Head from '../components/Head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head />
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  );
}

export default MyApp;
