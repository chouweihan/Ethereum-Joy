import React, { useEffect } from "react";
import { useWallet } from "../../Contexts/WalletContext";
import { Button,  Link } from "@mui/material";
import { ReactComponent as MetamaskIcon } from "../../Assets/Icon/metamask.svg";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { formatAddress } from "../../Utility/formatter"

declare var window: any;

const Metamask = () => {
  const {
    wallet: { address },
    setAddress,
    setCurAddress,
    setInputAddress
  } = useWallet();
  const { enqueueSnackbar } = useSnackbar();

  async function checkIfWalletIsConnected() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        const account = accounts[0];
        setAddress(account);
        enqueueSnackbar("Succesfully connected", {
          variant: "success",
          autoHideDuration: 3000,
        });
        return;
      }
    }
  }

  async function connect() {
    if (!window.ethereum) {
      enqueueSnackbar("Metamask extension is required", {
        variant: "warning",
        action
      });
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]);
      enqueueSnackbar("Succesfully connected", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (err: any) {
      console.log(err);
      if(err.code === -32002) {
        enqueueSnackbar("Pending connection, check metamask", {
          autoHideDuration: 3000,
          variant: "warning"
        });
      }

      if(err.code === 4001) {
        enqueueSnackbar("Connection rejected by user", {
          autoHideDuration: 3000,
          variant: "error"
        });
      }
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    // eslint-disable-next-line
  }, []);

  const handleConnectClick = async () => {
    if (!address) {
      enqueueSnackbar("Connection initiated", {
        variant: "info",
        autoHideDuration: 2500
      });
      connect();
    } else {
      setCurAddress(address);
      setInputAddress(address);
      enqueueSnackbar(`Address set to ${address}`, {
        variant: "info",
        autoHideDuration: 3000
      });
    }
  };

  return (
    <Box sx={{ width: 180, ml: 2 }}>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{
          fontSize: "16px",
        }}      
        onClick={() => handleConnectClick()}
      >
        <MetamaskIcon
          style={{ width: "25px", height: "25px", marginRight: "10px" }}
        />
        {address
          ? formatAddress(address)
          : "connect"}
      </Button>
    </Box>
  );
};

export const action = () => (
  <>
    <Link
      target="_blank"
      href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
      underline="none"
      sx={{color: "white"  }}
    >
      <Button color="inherit">
        CHROME
      </Button>
    </Link>
    <Link
      target="_blank"
      href="https://addons.mozilla.org/en-CA/firefox/addon/ether-metamask"
      underline="none"
      sx={{ color: "white" }}
    >
      <Button color="inherit">
        FIREFOX
      </Button>
    </Link>
  </>
);

export default Metamask;
