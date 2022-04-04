import React, { useState, useEffect } from 'react'
import { INFT } from '../../Interfaces/INFT'
import { Pagination, Box, Grid, Stack, TextField, useTheme } from '@mui/material';
import NFTCard from './NFTCard';
import { useColorMode } from '../../Contexts/ColorModeContext';

const NFTContainer = ({ nfts } : { nfts: Array<INFT> }) => {
  const limit: number = 24;
  const { mode } = useColorMode();
  const theme = useTheme();
  const [page, setPage] = useState<number>(1);  
  const [totalPages, setTotalPages] = useState<number>(1);
  const [paginatedNFTs, setPaginatedNFTs] = useState<INFT[]>([]);  
  const [searchedNfts, setSearchedNfts] = useState<INFT[]>([]);  
  const [search, setSearch] = useState<string>("");

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
  }

  useEffect(() => {
    if(searchedNfts) {
        if(searchedNfts.length < limit) {
            setPaginatedNFTs(searchedNfts);
            setTotalPages(1);
        } else {
            setTotalPages(Math.ceil(searchedNfts.length / limit));
            setPaginatedNFTs(searchedNfts.slice((page - 1) * limit, (page * limit)));
        }
    }
  }, [searchedNfts, page])

  useEffect(() => {
    if(nfts) {
        setSearchedNfts(nfts);
    }
  }, [nfts])
  
  useEffect(() => {
    if(!search) {
        if(nfts.length !== searchedNfts.length)
            setSearchedNfts(nfts);

    } else {
      const copy = [...nfts.filter((nft) => nft.name.toLowerCase().replace(/ /g, "").includes(search.toLowerCase().replace(/ /g, "")))]  
      setSearchedNfts(copy);
    }
    //eslint-disable-next-line
  }, [search])

  return (
    <Stack spacing={3}>
        <Box sx={{ pt: 3 }}>
            <TextField
                label="Search NFTs" value={search} onChange={(e) => setSearch(e.target.value)}
                size="small"
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                            borderColor: mode === "light" ?'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: theme.palette.primary.main,
                            },
                            '&.MuiInputBase-adornedEnd': {
                                paddingRight: "4px"
                            }
                        },
                    }}
                    />
        </Box>
        <Grid container display="grid" gridTemplateColumns={"repeat(auto-fill, minmax(220px, 1fr))"} gap={2}>
            {
                paginatedNFTs.map((nft, index) => {
                    return (
                        <Grid key={index} item height={1}>
                            <NFTCard nft={nft}/>
                        </Grid>
                    )
                })
            }
        </Grid>
        <Box width={1} display="flex" justifyContent="center" sx={{ mt: 1 }}>
            {
                totalPages > 1 &&
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            }
        </Box>
    </Stack>
  )
}

export default NFTContainer