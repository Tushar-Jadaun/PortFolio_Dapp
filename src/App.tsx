import React, { FC, useEffect, useMemo, useState } from 'react';
import { ConnectionProvider, useConnection, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl,GetBalanceConfig } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

const Topkbar: FC = () => {
  const { publicKey } = useWallet();

  return (
    <div style={{display:'flex',justifyContent:'flex-end'}}>
      {!publicKey && <WalletMultiButton />}
      {publicKey && <WalletDisconnectButton />}
    </div>
  );
};

export function App(){
  const endpoint ="https://mainnet.helius-rpc.com/?api-key=fb7bdd9b-b48d-4919-bbbe-b13482e1afc8";
      return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                  <Topkbar />                  
                  <Portfolio /> 
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

function Portfolio(){
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance,setBalance] = useState<null | number>(null);

  useEffect(()=>{
    if(publicKey){
      connection.getBalance(publicKey)
      .then(b=>setBalance(b))
    }
  },[publicKey, connection]);

  // console.log("hii");

  return <div>
    Address - { publicKey?.toString()} <br/>
    SOL Balance - {balance ? balance/1000_000_000 : 0}
  </div>
}

export default App;