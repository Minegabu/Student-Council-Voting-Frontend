import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import '../styles/styles.css';

const App = ({
    Component, pageProps: { session, ...pageProps },
}: AppProps) => (
    <SessionProvider session={session}>
        <Component {...pageProps} />
    </SessionProvider>
);

export default App;
