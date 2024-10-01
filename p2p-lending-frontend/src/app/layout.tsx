"use client"; // This marks the file as a Client Component

import React, { createContext, useContext } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo, ReactNode } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css'; // For wallet modal styles
import AppWalletProvider from './components/WalletProvider';

type LayoutProps = {
    children: ReactNode;
};

type WalletContextType = {
    network: WalletAdapterNetwork;
    wallets: any[];
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const Layout = ({ children }: LayoutProps) => {
    const network = WalletAdapterNetwork.Devnet; // You can switch to 'Mainnet' for production
    const endpoint = `https://api.${network}.solana.com`;
    const wallets = useMemo(() => [new SolflareWalletAdapter()], [network]);

    return (
        <html>
            <body>
                <AppWalletProvider>
                    {children}
                </AppWalletProvider>
            </body>
        </html>
    );
};


export default Layout;
