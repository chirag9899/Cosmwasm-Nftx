"use client";
import React, { useContext, useState, useEffect } from "react";
import DiamondIcon from "@mui/icons-material/Diamond";
import CloseIcon from "@mui/icons-material/Close";
import NftCard from "./NftCard";
import { appState } from "../context/store";

const NftList = () => {

  const {
    /* Function provide by context */
    fetchUserNfts,

    /* State provide by context */
    vaultNftsData,

    /* State update provide by context */
  } = useContext(appState);

  const [userNftPopUp, setUserNftPopUp] = useState(false);

  return (
    <div>
      {/* 1. First Div contains vault Name, symbol & Mint button   */}
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
              fetchUserNfts(vaultNftsData?.vault_nft_address);
              setUserNftPopUp(true);
            }}
          >
            Mint NFT
          </button>
        </div>
      </div>
      

    </div>
  )
}

// const Nfts = () => {
//   const {
//     vaultNftData,
//     setVaultNftData,
//     connectWallet,
//     userNftData,
//     sendUserNft,
//     setUserNftData,
//     fetchNftImage,
//     fetchUserNft,
//     osmosisClientSigner,
//     contractAddress,
//     osmosisSigner,
//     setVaultData,
//     sidebar,
//     setSidebar,
//     image, setImage
//   } = useContext(appState);

//   const [redeemPopup, setRedeemPopup] = useState(false);
//   const [tokenId, setTokenId] = useState(null);
//   const [vtokenAddress, setVtokenAddress] = useState(null);
//   const [userVToken, setUserVToken] = useState(null);
//   const [reedemNft, setReedemNft] = useState(null);
//   const [selectNft, setSelectNft] = useState(false);
//   const [userNftImageData, setUserNftImageData] = useState({})
//   const message = {
//     message: "NFt Transfer",
//     vault_id: vaultNftData?.vault_id,
//   };

//   useEffect(() => {
//     connectWallet();
//   }, []);

//   // useEffect(async () => {
//   //   if(sidebar == false) {
//   //     const data = await osmosisClientSigner.queryContractSmart(
//   //       contractAddress,
//   //       {
//   //         get_vault_array: {}
//   //       }
//   //     );
//   //     setVaultData(data?.Ok?.vault_array)
//   //   }
//   // }, [sidebar])

//   //   vault_id
//   // :
//   // "1"
//   // vault_name
//   // :
//   // "cryptopunck"
//   // vault_nft_address
//   // :
//   // "osmo1k3j435f0pkla0tvgv20g73zm86aftg37surzndceex6any89qkvqfj6y4g"
//   // vault_owner
//   // :
//   // "osmo1cyyzpxplxdzkeea7kwsydadg87357qnahakaks"
//   // vault_symbol
//   // :
//   // "PUNK"
//   // vault_user_nft_data
//   // :
//   // [{…}]

//   const redeemMessage = {
//     vault_id: vaultNftData?.vault_id,
//     nft_asset_address: vaultNftData?.vault_nft_address,
//     nft_id: reedemNft?.nft_id,
//     vtoken_address: vtokenAddress,
//   };

//   const queryVtokenAddress = async () => {
//     let dataVtokenAddress = await osmosisClientSigner.queryContractSmart(
//       contractAddress,
//       {
//         get_v_token_address: {
//           vault_id: vaultNftData?.vault_id,
//         },
//       }
//     );

//     let balanceData = await osmosisClientSigner?.queryContractSmart(
//       dataVtokenAddress?.Ok?.vtoken_address,
//       {
//         balance: {
//           address: osmosisSigner,
//         },
//       }
//     );

//     setVtokenAddress(dataVtokenAddress?.Ok?.vtoken_address);
//     setUserVToken(balanceData?.balance);
//   };

//   const transferCw20 = async () => {
//     console.log(redeemMessage);
//     try {
//       let transaction = await osmosisClientSigner.execute(
//         osmosisSigner,
//         vtokenAddress,
//         {
//           send: {
//             contract: contractAddress,
//             amount: "1",
//             msg: btoa(JSON.stringify(redeemMessage)),
//           },
//         },
//         "auto"
//       );

//       if (transaction) {
//         const data = await osmosisClientSigner.queryContractSmart(
//           contractAddress,
//           {
//             get_vault_array: {}
//           }
//         );
//         setVaultData(data?.Ok?.vault_array);
//         for (let i = 0; data?.Ok?.vault_array.length; i++) {
//           if (data?.Ok?.vault_array[i].vault_nft_address === vaultNftData?.vault_nft_address) {
//             setVaultData(data?.Ok?.vault_array);
//             setVaultNftData(data?.Ok?.vault_array[i])
//             setRedeemPopup(false)
//           }
//         }
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const fetchData = async () => {

//   }

//   return (
//     <div>
//       <div className="flex justify-between">
//         <div className="flex gap-5 p-10 ">
//           <div className="flex justify-end items-center">
//             <img
//               className="h-10 "
//               src="https://images.nftx.io/cdn-cgi/image/anim=false,width=150,height=150,format=auto/https://assets.nftx.io/vaults-v2/241/256x256.png"
//               alt=""
//             />
//           </div>
//           <div className="">
//             <h3 className="text-lg font-semibold text-slate-200">
//               {vaultNftData?.vault_symbol}
//             </h3>
//             <h4 className="text-sm font-light text-gray-200">
//               {vaultNftData?.vault_name}
//             </h4>
//           </div>
//         </div>
//         <div className="flex gap-10 p-10">
//           <button
//             className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600  "
//             onClick={async () => {
//               const data = await fetchUserNft(vaultNftData?.vault_nft_address);
//               setUserNftData(data);
//               setSidebar(true);
//             }}
//           >
//             Send NFT
//           </button>
//         </div>
//       </div>

      // <div className="flex flex-wrap gap-4 ml-6">
      //   {vaultNftData?.vault_user_nft_data?.map((item, index) => {

      //     fetchNftImage(item?.nft_id, vaultNftData?.vault_nft_address).then((result) => {
      //       setImage(result);
      //     }).catch((error) => {
      //       console.log(error);
      //     })

      //     return (
      //       <div
      //         key={index}
      //         onClick={() => {
      //           queryVtokenAddress();
      //           setReedemNft(item);
      //           setRedeemPopup(true);
      //         }}
      //       >
      //         <NftCard item={item} image={image} />
      //       </div>
      //     );
      //   })}
      // </div>

//       {sidebar && (
//         <div className="relative ">
//           <div className="fixed top-0 left-0 w-full h-full backdrop-filter backdrop-blur-sm bg-black bg-opacity-50 z-40"></div>
//           <div className=" fixed  p-2 m-2 rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
//             <div className="flex justify-end p-2">
//               <CloseIcon
//                 className=" rounded-full bg-red-600 hover:bg-red-400 p-1 "
//                 onClick={() => {
//                   setSidebar(false);
//                   setSelectNft(false);
//                 }}
//               />
//             </div>
//             <div className="  gap-6 flex flex-wrap justify-center item-center py-4 px-1 overflow-y-scroll no-scrollbar min-h-[50%] max-h-[500px]">
//               {console.log(userNftData)}

//               {
//                 Object.entries(userNftData).forEach((value, Key) => {
//                   console.log(value)
//                   return (
//                     <div
//                       tabIndex="1"
//                       className="flex flex-col justify-center border focus:ring-4 focus:ring-gray-200 border-gray-800 bg-zinc-900 p-2 rounded-md"
//                       onClick={() => {
//                         setSelectNft(true);
//                         setTokenId(item);
//                       }}
//                       key={index}
//                     >
//                       <div className="flex justify-between gap-3 items-center  text-slate-300 ">
//                         <h3 className="text-sm font-semibold p-2">#{Key}</h3>
//                         <p>
//                           <span>1</span>
//                           <DiamondIcon className="h-5" />
//                         </p>
//                       </div>
//                       <div className="flex justify-center items-center">

//                         <img
//                           className="h-48 w-48 object-cover rounded-lg   focus:outline-none  "
//                           src={value['image']}
//                           alt=""
//                         />
//                       </div>
//                     </div>
//                   );
//                 })
//               }

//               {/* {userNftData?.map( (item, index) => {
                
//                 const image =  fetchNftImage(item, vaultNftData?.vault_nft_address).then((result) => {
//                   console.log(item, result)
//                   return result;
//                 }).catch((error) => {
//                   console.log(error);
//                 });

//                 console.log("image",image)
                
//               })} */}
//             </div>
//           </div>

//           {selectNft && (

//             <button
//               className="fixed bottom-0 right-0 left-0 mx-[90vh] focus:outline-none  text-gray-900 bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-6 py-2.5 m-6 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 z-40 "
//               onClick={() => {
//                 sendUserNft(vaultNftData?.vault_nft_address, tokenId, message);
//               }}
//             >
//               Send NFT
//             </button>

//           )}
//         </div>
//       )}

//       {redeemPopup && (
//         <div className="relative">
//           <div className="fixed top-0 left-0 w-screen h-screen backdrop-filter backdrop-blur-sm bg-black bg-opacity-50 z-50"></div>
//           <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
//             <CloseIcon
//               className=" absolute -right-6 -top-8 rounded-full p-1 bg-red-600 hover:bg-red-400 "
//               onClick={() => setRedeemPopup(false)}
//             />
//             <div className="bg-zinc-800 rounded-md p-8 flex">
//               <span>User Balance : {userVToken} Vtoken</span>
//             </div>

//             <div className="flex justify-center m-2">
//               <button
//                 className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg mt-10 text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600  "
//                 onClick={transferCw20}
//               >
//                 Redeem
//               </button>

//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

export default NftList;
