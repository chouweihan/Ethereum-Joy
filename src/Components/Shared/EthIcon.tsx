import React from 'react'
import { ReactComponent as EthereumIcon } from "../../Assets/Icon/ethereum.svg"
import { useColorMode } from '../../Contexts/ColorModeContext'
import { Box } from '@mui/system'
const EthIcon = ({style} : { style?: React.CSSProperties}) => {

  const {mode} = useColorMode();

  return (
      <EthereumIcon style={{marginRight: "4px", width: "12px", height: '17px', ...(mode === "dark" && { filter: "invert(100%)"}), ...style}}/>
  )
}

export default EthIcon