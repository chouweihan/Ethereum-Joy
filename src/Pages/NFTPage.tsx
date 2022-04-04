import React, { useEffect, useState } from 'react'
import { useWallet } from '../Contexts/WalletContext'
import PleaseConnect from '../Components/Shared/PleaseConnect';
import Loader from '../Components/Shared/Loader';
import { useMoralisWeb3Api } from "react-moralis";
import { INFT } from '../Interfaces/INFT';
import { Stack, Alert } from '@mui/material';
import NFTContainer from '../Components/NFTS/NFTContainer';

const NFTPage = () => {
  const Web3Api = useMoralisWeb3Api();
  const [nfts, setNfts] = useState<Array<INFT>>([]);
  const [localLoading, setLocalLoading] = useState<boolean>(true);

  const {
    wallet: { curAddress },
  } = useWallet();

  const fetchAllTokens = async () => {
    await Web3Api.Web3API.account.getNFTs({chain: "eth", address: curAddress })
    .then(res => {
        setNfts(res.result!);
        setLocalLoading(false);
    }).catch(err => {
      console.log("err", err);
      setLocalLoading(false);
    });
  }


  useEffect(() => {
    if(curAddress) {
        setLocalLoading(true);
        fetchAllTokens();
    }
     // eslint-disable-next-line
  }, [curAddress])

  if(!curAddress) {
    return (
      <>
        <PleaseConnect />
      </>
    )
  }

  if(localLoading) {
    return (
      <>
        <Loader px={2} />
      </>
    )
  }

  return (
    <Stack spacing={1}>
      <Alert severity='info' variant='outlined'>
        NFT data is fetched from Moralis API. First 500 will be shown. (opensea won't give me an api key {" "}
        <span role="img" aria-label="sad emoji">
          {String.fromCodePoint(0x1F62D)}
        </span>)
      </Alert>
      {
        nfts.length === 0 &&
        <Alert severity='warning' variant='outlined'>
          No NFT returned from Moralis. This address may not have NFT on the ethereum blockchain.
        </Alert>
      }
      {
        nfts.length > 0 &&
        <NFTContainer nfts={nfts} />
      }
    </Stack>
  )
}

export default NFTPage