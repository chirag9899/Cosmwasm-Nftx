"use client";
import React from "react";
import { createContext, useState } from "react";
import { setupWebKeplr, GasPrice } from "cosmwasm";
import { useRouter } from "next/navigation";

export const appState = createContext();

const GlobalStateProvider = ({ children }) => {
  const router = useRouter();

  const smartContractAddress =
    "osmo1upaq0t2ut5qpnt3puus8f4dm8e3u728we39kpcy7qpf463au9cks3vcvdk";

  const ipfsGateway = "https://cloudflare-ipfs.com/ipfs/";

  /* 
    1. signer state defines the account of user.
    2. clientSigner state contain signature of user.
    3. vaultDataList contains list of vaults provide by smart-contract.
    4. vaultNftsData contains data of particular vault.
    5. userNftsData contains user's Nft image & id
    6. vaultNftsImage contains Nfts images & Ids of particular vault 
  */
  const [signer, setSigner] = useState(null);
  const [clientSigner, setClientSigner] = useState(null);
  const [vaultDataList, setVaultDataList] = useState(null);
  const [vaultNftsData, setVaultNftsData] = useState(null);
  const [userNftsData, setUserNftsData] = useState([]);
  const [vaultNftsImage, setVaultNftsImage] = useState([]);
  const [userNftPopUp, setUserNftPopUp] = useState(false);

  const addChain = async () => {
    try {
      console.log("Hello")

      const data = await window.keplr.experimentalSuggestChain({
        chainId: "osmo-test-5",
        chainName: "Osmosis Testnet 5",
        rpc: "https://rpc.osmotest5.osmosis.zone:443",
        rest: "https://lcd.osmotest5.osmosis.zone:1317",
        bip44: {
          coinType: 118,
        },
        bech32Config: {
          bech32PrefixAccAddr: "osmo",
          bech32PrefixAccPub: "osmo" + "pub",
          bech32PrefixValAddr: "osmo" + "valoper",
          bech32PrefixValPub: "osmo" + "valoperpub",
          bech32PrefixConsAddr: "osmo" + "valcons",
          bech32PrefixConsPub: "osmo" + "valconspub",
        },
        currencies: [
          {
            coinDenom: "OSMO",
            coinMinimalDenom: "uosmo",
            coinDecimals: 6,
            coinGeckoId: "osmosis",
          },
        ],
        feeCurrencies: [
          {
            coinDenom: "OSMO",
            coinMinimalDenom: "uosmo",
            coinDecimals: 6,
            coinGeckoId: "osmosis",
            gasPriceStep: {
              low: 0.01,
              average: 0.025,
              high: 0.04,
            },
          },
        ],
        stakeCurrency: {
          coinDenom: "OSMO",
          coinMinimalDenom: "uosmo",
          coinDecimals: 6,
          coinGeckoId: "osmosis",
        },
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  /* 
   1. connectWallet function is used to connect wallet.
 */
  const connectWallet = async () => {
    try {

      addChain();

      if (!window.keplr) {
        throw new Error("Keplr Wallet extension not found");
      }

      await window.keplr.enable("osmo-test-5");

      const offlineSigner = await window.keplr.getOfflineSigner("osmo-test-5");

      const signingClient = await setupWebKeplr({
        rpcEndpoint: "https://rpc.osmotest5.osmosis.zone",
        chainId: "osmo-test-5",
        prefix: "osmosis",
        gasPrice: GasPrice.fromString("0.250uosmo"),
      });

      const account = await offlineSigner.getAccounts();
      setSigner(account[0].address);

      setClientSigner(signingClient);
    } catch (error) {
      console.log(error);
    }
  };

  /* 
    1. fetchVaultList function is fetching VaultList from Contract
  */
  const fetchVaultList = async () => {
    try {
      const vaultData = await clientSigner.queryContractSmart(
        smartContractAddress,
        {
          get_vault_array: {},
        }
      )

      setVaultDataList(vaultData?.Ok?.vault_array);
    } catch (error) {
      console.log(error);
    }
  }

  /* 
    1. fetchUserNfts function fetch particular User's NFts [nft id and nft image].
  */
  const fetchUserNfts = async (nftContractAddress) => {
    console.log(nftContractAddress)
    try {
      const data = await clientSigner.queryContractSmart(nftContractAddress, {
        tokens: {
          owner: signer,
          start_after: "",
          limit: 10,
        },
      });

      await data?.tokens?.map(async (item) => {
        let imageData = await clientSigner.queryContractSmart(nftContractAddress, {
          nft_info: {
            token_id: item,
          },
        });

        let image = imageData?.extension ? imageData?.extension?.image.replace("ipfs://", ipfsGateway) : "https://ipfs-gw.stargaze-apis.com/ipfs/bafybeiekar32u5m2i2dulzuyyj5azmm7ffvsljoomx7b35vaojtif4uh3a/2057.png";
        const nftTokenData = { tokenId: item, nftImage: image };
        if (imageData) {

          setUserNftsData((prev) => [...prev, nftTokenData]);
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  /*  
    1. fetchVaultNftImage function fetch particular NFT images of vault
  */
  const fetchVaultNftImage = async (nftContractAddress, tokenId) => {
    console.log(nftContractAddress, tokenId)
    try {
      let imageData = await clientSigner.queryContractSmart(nftContractAddress, {
        nft_info: {
          token_id: tokenId,
        },
      });

      if (imageData) {
        console.log(imageData)

        let image = imageData?.extension ? imageData?.extension?.image.replace("ipfs://", ipfsGateway) : "https://ipfs-gw.stargaze-apis.com/ipfs/bafybeiekar32u5m2i2dulzuyyj5azmm7ffvsljoomx7b35vaojtif4uh3a/2057.png";
        const nftTokenData = { tokenId: tokenId, nftImage: image };
        setVaultNftsImage((prev) => [...prev, nftTokenData]);
      }

    } catch (error) {
      console.log(error)
    }
  }

  /*  
    1. sendUserNft function send nft to vault.
  */
  const sendUserNft = async (nftAddress, tokenId, message) => {
    try {
      let transaction = await clientSigner.execute(
        signer,
        nftAddress,
        {
          send_nft: {
            contract: smartContractAddress,
            token_id: tokenId,
            msg: btoa(JSON.stringify(message)),
          },
        },
        "auto"
      );

      if (transaction && message.message === "Create Vault") {
        const data = await clientSigner.queryContractSmart(
          smartContractAddress,
          {
            get_vault_array: {},
          }
        );
        setVaultDataList(data?.Ok?.vault_array);
        router.push("/");
      } else if (transaction && message.message === "NFt Transfer") {
        fetchVaultList();
        fetchVaultNftImage(nftAddress, tokenId);
        setUserNftPopUp(false)
        // const data = await clientSigner.queryContractSmart(
        //   smartContractAddress,
        //   {
        //     get_vault_array: {},
        //   }
        // );

        // for (let i = 0; data?.Ok?.vault_array.length; i++) {
        //   if (data?.Ok?.vault_array[i].vault_nft_address === nftAddress) {
        //     // setVaultDataList(data?.Ok?.vault_array);
        //     // setVaultNftData(data?.Ok?.vault_array[i]);
        //     // setSidebar(false);
        //   }
        // }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <appState.Provider
      value={{
        /* Constant variable provide by context */
        smartContractAddress,
        /* Function provide by context */
        connectWallet,
        fetchVaultList,
        fetchUserNfts,
        fetchVaultNftImage,
        sendUserNft,

        /* State provide by context */
        signer,
        clientSigner,
        vaultDataList,
        vaultNftsData,
        userNftsData,
        vaultNftsImage,
        userNftPopUp,

        /* State update provide by context */
        setVaultNftsData,
        setVaultNftsImage,
        setUserNftPopUp,
        setUserNftsData,
      }}
    >
      {children}
    </appState.Provider>
  );
};

export default GlobalStateProvider;

// fetchNftImage,
// fetchUserNft,
// sendUserNft,
// contractAddress,
// signer,
// osmosisClientSigner,
// setVaultNftData,
// vaultNftData,

// vaultData,
// setVaultData,

// userNftData,
// setUserNftData,
// sidebar,
// setSidebar,
// image,
// setImage,


// const [vaultNftData, setVaultNftData] = useState(null);
// const [vaultData, setVaultData] = useState(null);
// const [sidebar, setSidebar] = useState(false);
// const [image, setImage] = useState(null);

// const [userNftData, setUserNftData] = useState(null);

const fetchNftImage = async (tokenId, nftAddress) => {
  // let imageData = await osmosisClientSigner.queryContractSmart(nftAddress, {
  //   nft_info: {
  //     token_id: tokenId,
  //   },
  // });

  // let image =
  //   "https://ipfs-gw.stargaze-apis.com/ipfs/bafybeiekar32u5m2i2dulzuyyj5azmm7ffvsljoomx7b35vaojtif4uh3a/2057.png";

  // if (imageData?.extension) {
  //   image = imageData?.extension?.image.replace("ipfs://", ipfsGateway);
  // }
  // return image;
};

const fetchUserNft = async (contractAddress) => {
  // try {
  //   let data = await osmosisClientSigner.queryContractSmart(contractAddress, {
  // tokens: {
  //   owner: osmosisSigner,
  //   start_after: "",
  //   limit: 10,
  // },
  //   });
  //   let tokens = {};
  //   await data.tokens.map(async (item) => {
  // let imageData = await osmosisClientSigner.queryContractSmart(
  //   contractAddress,
  //   {
  //     nft_info: {
  //       token_id: item,
  //     },
  //   }
  // );
  //     tokens[item] = {
  //       image: imageData.extension.image.replace("ipfs://", ipfsGateway),
  //     };
  //   });
  //   return tokens;
  // } catch (err) {
  //   console.log(err);
  // }
};

const sendUserNft = async (nftAddress, tokenId, message) => {
  // try {
  //   let transaction = await osmosisClientSigner.execute(
  //     osmosisSigner,
  //     nftAddress,
  //     {
  //       send_nft: {
  //         contract: contractAddress,
  //         token_id: tokenId,
  //         msg: btoa(JSON.stringify(message)),
  //       },
  //     },
  //     "auto"
  //   );

  //   if (transaction && message.message === "Create Vault") {
  //     const data = await osmosisClientSigner.queryContractSmart(
  //       contractAddress,
  //       {
  //         get_vault_array: {},
  //       }
  //     );
  //     setVaultData(data?.Ok?.vault_array);
  //     router.push("/");
  //   } else if (transaction && message.message === "NFt Transfer") {
  //     const data = await osmosisClientSigner.queryContractSmart(
  //       contractAddress,
  //       {
  //         get_vault_array: {},
  //       }
  //     );

  //     for (let i = 0; data?.Ok?.vault_array.length; i++) {
  //       if (data?.Ok?.vault_array[i].vault_nft_address === nftAddress) {
  //         setVaultData(data?.Ok?.vault_array);
  //         setVaultNftData(data?.Ok?.vault_array[i]);
  //         setSidebar(false);
  //       }
  //     }
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
};