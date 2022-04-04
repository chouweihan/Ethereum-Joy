import React from 'react'
import { Card, CardContent, Typography, useTheme, CardActions, Link, IconButton, Box } from '@mui/material'
import NFTImage from './NFTImage'
import { INFT } from '../../Interfaces/INFT'
import { useColorMode } from '../../Contexts/ColorModeContext'
import { ReactComponent as OpenSeaIcon } from "../../Assets/Icon/opensea.svg"
import { ReactComponent as LooksRareIcon } from "../../Assets/Icon/looksrare.svg"
import { ReactComponent as LooksRareDarkIcon } from "../../Assets/Icon/looksrare-dark.svg"
import { ReactComponent as NftNerdsIcon } from "../../Assets/Icon/nftnerds.svg"

const NFTCard = ({ nft } : { nft: INFT }) => {
  const { mode } = useColorMode();
  const theme = useTheme();  

  return (
    <Card sx={{ height: "100%" }}>
        <NFTImage uri={nft.token_uri} name={ nft.name } metadata={nft.metadata}/>
        <CardContent>
            <Typography variant="h6" component="div" fontSize={16}>
                {nft.name}
            </Typography>
            <Typography variant="subtitle1" fontSize={14} gutterBottom sx={{ color: mode === "dark" ? theme.palette.grey[500] : theme.palette.grey[700] }}>
                {parseInt(nft.token_id!) > 100000 ? "N/A" : `#${nft.token_id}`}
            </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
                <Link href={`https://opensea.io/assets/${nft.token_address}/${nft.token_id}` } target="_blank">
                    <IconButton sx={{ width: 35, height: 35 }}>
                        <OpenSeaIcon />
                    </IconButton>
                </Link>
                <Link href={`https://looksrare.org/collections/${nft.token_address}/${nft.token_id}` } target="_blank">
                    <IconButton sx={{ width: 35, height: 35 }}>
                        {
                            mode === "dark" ?
                            <LooksRareIcon />
                            :
                            <LooksRareDarkIcon />
                        }
                    </IconButton>
                </Link>
                <Link href={`https://nftnerds.ai/collection/${nft.token_address}` } target="_blank">
                    <IconButton sx={{ width: 35, height: 35 }}>
                        <NftNerdsIcon />
                    </IconButton>
                </Link>
            </Box>
            <Typography fontSize={14}>
                {nft.contract_type}
            </Typography>
        </CardActions>
    </Card>
  )
}

export default NFTCard