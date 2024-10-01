"use client";
 
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { styleText } from 'util';
import styles from '../../styles/Home.module.css';
import Head from 'next/head'
 

export default function Home() {
    const { publicKey } = useWallet();

    return (
        <div className={styles.App}>
            <h1>Welcome to QUANTA</h1>
            <WalletMultiButton />
            {publicKey && <p>Connected as {publicKey.toBase58()}</p>}
        </div>
    );
}
