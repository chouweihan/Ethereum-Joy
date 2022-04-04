import React, {useState, useEffect} from 'react'
import noImage from "../../Assets/Images/unavailable-image.jpg"
import blankImage from "../../Assets/Images/blank.jpg"
import { retIPFSorHTTPs } from "../../Utility/nft"
import { useMoralis } from "react-moralis";
import { Box, CardMedia, CircularProgress } from '@mui/material';


const NFTImage = ({uri, name, metadata } : {uri?: string, name: string, metadata?: string}) => {
  const  [imagePath, setImagePath] = useState<string>(blankImage);  
  const  [loading, setLoading] = useState<boolean>(true);
  const { Moralis } = useMoralis();

  async function getImageFromMetaData(): Promise<string> {
    setLoading(true);
    if(!uri)  {
        return noImage; 
    }
    let url = retIPFSorHTTPs(uri);
    let obj: any;

    const res = await Moralis.Cloud.run("fetchJSON", { theUrl: url }).catch(() => {});

    if(res?.data) {
      obj = res.data;
      return retIPFSorHTTPs(obj?.image ?? obj?.image_url ?? noImage)    
    } else {
      if(metadata) {
        obj = JSON.parse(metadata);
        return retIPFSorHTTPs(obj?.image ?? obj?.image_url ?? noImage); 
      }
      return noImage;
    }
  }

  useEffect(() => {
     getImageFromMetaData()
     .then((res) => { 
       setImagePath(res);
       setLoading(false);
      })
     .catch((err)=> { 
         console.log("err", err);
         setImagePath(noImage);
         setLoading(false);
      });
      // eslint-disable-next-line
  }, [uri])

  return (
    <Box position="relative" sx={{p: 0, m: 0}}>
        <CardMedia 
        component={imagePath.endsWith("mp4") ? "video" : "img"} 
        alt={name} 
        image={loading ? blankImage : imagePath} 
        height={180} 
        autoPlay
        onError={() => setImagePath(noImage)} />
        {
            loading &&
            <Box sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
            }}>
            <CircularProgress color="primary" />
        </Box>
        }
    </Box>
  )
}

export default NFTImage