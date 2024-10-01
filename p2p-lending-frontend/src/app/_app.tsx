import { AppProps } from 'next/app';
import Layout from './layout'; // Adjust the import path as needed

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

export default MyApp;
