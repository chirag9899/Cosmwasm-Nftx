"use client";
import React, { useContext, useState, useEffect } from "react";
import DiamondIcon from "@mui/icons-material/Diamond";
import CloseIcon from "@mui/icons-material/Close";
import NftCard from "./NftCard";
import { appState } from "../context/store";

const NftList = () => {

  const {
    /* Constant variable provide by context */
    smartContractAddress,

    /* Function provide by context */
    fetchUserNfts,
    sendUserNft,
    fetchVaultList,
    fetchVaultNftImage,

    /* State provide by context */
    signer,
    clientSigner,
    vaultNftsData,
    vaultNftsImage,
    userNftsData,
    userNftPopUp,
    vaultDataList,

    /* State update provide by context */
    setUserNftPopUp,
    setVaultNftsImage,
    setUserNftsData,
  } = useContext(appState);


  /* 
    1. 
  */
  const [redeemPopup, setRedeemPopup] = useState(false);
  const [tokenId, setTokenId] = useState(null);
  const [vtokenAddress, setVtokenAddress] = useState(null);
  const [userVToken, setUserVToken] = useState(null);
  const [reedemNft, setReedemNft] = useState(null);
  const [selectNft, setSelectNft] = useState(false);

  console.log(vaultNftsImage)


  /*  */ 
  const message = {
    message: "NFt Transfer",
    vault_id: vaultNftsData?.vault_id,
  };

  /*  */ 
  const redeemMessage = {
    vault_id: vaultNftsData?.vault_id,
    nft_asset_address: vaultNftsData?.vault_nft_address,
    nft_id: reedemNft,
    vtoken_address: vtokenAddress,
  };

  /* 
    1. 
  */
  const queryVtokenAddress = async () => {
    let dataVtokenAddress = await clientSigner?.queryContractSmart(
      smartContractAddress,
      {
        get_v_token_address: {
          vault_id: vaultNftsData?.vault_id,
        },
      }
    );

    let balanceData = await clientSigner?.queryContractSmart(
      dataVtokenAddress?.Ok?.vtoken_address,
      {
        balance: {
          address: signer,
        },
      }
    );

    setVtokenAddress(dataVtokenAddress?.Ok?.vtoken_address);
    setUserVToken(balanceData?.balance);
  };


  /*  */
  const transferCw20 = async () => {
    console.log(redeemMessage);
    try {
      let transaction = await clientSigner.execute(
        signer,
        vtokenAddress,
        {
          send: {
            contract: smartContractAddress,
            amount: "1",
            msg: btoa(JSON.stringify(redeemMessage)),
          },
        },
        "auto"
      );

      if (transaction) {
        const data = await clientSigner.queryContractSmart(
          smartContractAddress, 
          {
            get_vault_array: {}, 
          }
        )
        console.log(data?.Ok?.vault_array);

        for (let i = 0; i < data?.Ok?.vault_array.length; i++) {
          if (data?.Ok?.vault_array[i]?.vault_id === vaultNftsData?.vault_id) {
            setVaultNftsImage([]);

            data?.Ok?.vault_array[i]?.vault_user_nft_data.map((item) => {
              fetchVaultNftImage(vaultDataList[i]?.vault_nft_address, item.nft_id);
            })

            setRedeemPopup(false);
            fetchVaultList();
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* 1. First Div contains vault Name, symbol & Mint button. */}
      <div className="flex justify-between">
        <div className="flex gap-5 p-10 ">
          <div className="flex justify-end items-center">
            <img className="h-10 " src="https://images.nftx.io/cdn-cgi/image/anim=false,width=150,height=150,format=auto/https://assets.nftx.io/vaults-v2/241/256x256.png" alt="" />
          </div>
          <div className="">
            <h3 className="text-lg font-semibold text-slate-200">{vaultNftsData?.vault_symbol}</h3>
            <h4 className="text-sm font-light text-gray-200">{vaultNftsData?.vault_name}</h4>
          </div>
        </div>
        <div className="flex gap-10 p-10">
          <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
            onClick={() => {
              setUserNftsData([])
              fetchUserNfts(vaultNftsData?.vault_nft_address);
              setUserNftPopUp(true);
            }}
          >
            Mint NFT
          </button>
        </div>
      </div>

      {/* 2. Second Div contains vault's NFTs data */}
      <div className="flex flex-wrap gap-4 ml-6">
        {
          vaultNftsImage?.map((item) => {
            return (
              <div key={item.tokenId} onClick={() => {
                console.log(item);
                queryVtokenAddress();
                setReedemNft(item.tokenId)
                setRedeemPopup(true);
              }}>
                <NftCard tokenId={item.tokenId} image={item.nftImage} />
              </div>
            )
          })
        }

        {/* 3. Third contain user nfts box */}
        {userNftPopUp && (
          <div className="relative ">
            <div className="fixed top-0 left-0 w-full h-full backdrop-filter backdrop-blur-sm bg-black bg-opacity-50 z-40"></div>
            <div className=" fixed  p-2 m-2 rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
              <div className="flex justify-end p-2">
                <CloseIcon
                  className=" rounded-full bg-red-600 hover:bg-red-400 p-1 "
                  onClick={() => {
                    setUserNftPopUp(false);
                    setSelectNft(false);
                  }}
                />
              </div>
              <div className="gap-6 flex flex-wrap justify-center item-center py-4 px-1 overflow-y-scroll no-scrollbar min-h-[50%] max-h-[500px]">
                {
                  userNftsData?.map((item) => {
                    return (
                      <div
                        tabIndex="1"
                        className="flex flex-col justify-center border focus:ring-4 focus:ring-gray-200 border-gray-800 bg-zinc-900 p-2 rounded-md"
                        onClick={() => {
                          console.log(item);
                          setSelectNft(true);
                          setTokenId(item.tokenId);
                        }}
                        key={item.tokenId}
                      >
                        <div className="flex justify-between gap-3 items-center  text-slate-300 ">
                          <h3 className="text-sm font-semibold p-2">#{item.tokenId}</h3>
                          <p>
                            <span>1</span>
                            <DiamondIcon className="h-5" />
                          </p>
                        </div>
                        <div className="flex justify-center items-center">

                          <img
                            className="h-48 w-48 object-cover rounded-lg   focus:outline-none  "
                            src={item.nftImage}
                            alt=""
                          />
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>

            {selectNft && (

              <button
                className="fixed bottom-0 right-0 left-0 mx-[90vh] focus:outline-none  text-gray-900 bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-6 py-2.5 m-6 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 z-40 "
                onClick={() => {
                  sendUserNft(vaultNftsData?.vault_nft_address, tokenId, message);

                }}
              >
                Send NFT
              </button>

            )}
          </div>
        )}
      </div>

      {/*  */}

      {redeemPopup && (
        <div className="relative">
          <div className="fixed top-0 left-0 w-screen h-screen backdrop-filter backdrop-blur-sm bg-black bg-opacity-50 z-50"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <CloseIcon
              className=" absolute -right-6 -top-8 rounded-full p-1 bg-red-600 hover:bg-red-400 "
              onClick={() => setRedeemPopup(false)}
            />
            <div className="bg-zinc-800 rounded-md p-8 flex">
              <span>User Balance : {userVToken} Vtoken</span>
            </div>

            <div className="flex justify-center m-2">
              <button
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg mt-10 text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600  "
                onClick={() => {
                  transferCw20();
                }}
              >
                Redeem
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default NftList;