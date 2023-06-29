"use client";
import { appState } from "../context/store";
import { useContext, useState } from "react";
import DiamondIcon from "@mui/icons-material/Diamond";

// https://cloudflare-ipfs.com/ipfs/

const CreateVault = () => {

  // const {
  //   osmosisClientSigner,
  //   osmosisSigner,
  //   contractAddress,
  //   fetchUserNft,
  //   sendUserNft,
  //   image, setImage,
  //   fetchNftImage
  // } = useContext(appState);

  // const [select, setSelect] = useState(false);
  // const [tokenData, setTokenData] = useState(null);
  

  const {
    /* Constant variable provide by context */
        
    /* Function provide by context */
    fetchUserNfts,
    sendUserNft,

    /* State provide by context */
    signer,
    clientSigner,
    userNftsData,

    /* State update provide by context */
    setUserNftsData,

  } = useContext(appState);


  /*  */ 
  const [tokenId, setTokenId] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [select, setSelect] = useState(false);
  const [create, setCreate] = useState(false);
  const [vaultData, setVaultData] = useState({
    name: "",
    symbol: "",
    address: "",
  });

  /*  */ 
  const handleCreateVault = (e) => {
    e.preventDefault();
    setVaultData({ ...vaultData, [e.target.name]: e.target.value });
  };

  const message = {
    message: "Create Vault",
    vault_name: vaultData.name,
    vault_symbol: vaultData.symbol,
    nft_asset_address: vaultData.address,
  };

  /*  */ 
  const fetchData = async (e) => {
    e.preventDefault();
    setUserNftsData([]); fetchUserNfts(vaultData.address);
    setCreate(true);
  };

  console.log(userNftsData);

  return (
    <div className="flex flex-1 justify-center items-center m-8 p-4 ">
      {create === false && (
        <form className="p-10 border border-gray-800 bg-zinc-900 m-6 rounded-md">
          <h3 className="text-2xl font-bold text-center mb-5  ">
            Create Vault
          </h3>

          <div className=" bg-black border border-gray-800 rounded-sm p-2 mb-5 ">
            <input
              name="address"
              onChange={handleCreateVault}
              className=" bg-transparent outline-none placeholder:text-lg px-1 py-3"
              id="nft_address"
              type="text"
              placeholder="Enter nft Asset Address"
            />
          </div>

          <div className=" bg-black  border border-gray-800 rounded-sm p-2 mb-5">
            <input
              name="name"
              onChange={handleCreateVault}
              className="bg-transparent outline-none placeholder:text-lg px-1 py-3"
              id="vault_name"
              type="text"
              placeholder="Enter vault Name"
            />
          </div>

          <div className="bg-black  border border-gray-800 rounded-sm p-2 mb-5">
            <input
              name="symbol"
              onChange={handleCreateVault}
              className="bg-transparent outline-none placeholder:text-lg px-1 py-3"
              id="vault_name"
              type="text"
              placeholder="Enter vault Symbol"
            />
          </div>

          <div className=" flex items-center justify-center">
            <button
              type="submit"
              onClick={(e) => fetchData(e)}
              className="text-black bg-white rounded-lg p-2 font-semibold hover:bg-zinc-900 hover:text-white hover:border border-white w-full "
            >
              Create Vault
            </button>
          </div>
        </form>
      )}

      {/*  */}
      {create && (
        <div>
          <div className="flex w-[90vw] ">
            <div className="flex flex-wrap gap-10 justify-start w-3/4  ">
              {
                userNftsData?.map((item, index) => {
                  return (
                    <div  tabIndex="1" className="flex flex-col justify-center focus:ring-4 rounded-md my-auto focus:ring-gray-200 p-3" key={index}>
                      <div className="flex justify-between gap-3 items-center text-slate-300 ">
                        <h3 className="text-sm font-semibold p-2">#{item.tokenId}</h3>
                        <p>
                          <span>1</span>
                          <DiamondIcon className="h-5" />
                        </p>
                      </div>
                      <div className="flex justify-center items-center">
                        <img
                          className="h-40 w-40 object-cover rounded-lg "
                          onClick={()=>{setTokenId(item.tokenId); setImageData(item.nftImage); setSelect(true);}}
                          src={item.nftImage}
                          alt=""
                        />
                      </div>
                    </div>
                  );
                })
              }
            </div>
            {/*  */}
           {
            select && 
             <div className="bg-zinc-800 bg-opacity-25 rounded-md w-1/4 flex justify-center p-6 hover:scale-90 hover:z-0">
             <div className=" flex flex-col items-center ">
               <div className="flex justify-between w-64 gap-3 items-center text-slate-300  ">
                 <h3 className="text-sm font-semibold p-2">#{tokenId}</h3>
                 <p>
                   <span>1</span>
                   <DiamondIcon className="h-5" />
                 </p>
               </div>
               <div className="flex justify-center items-center">
                 <img
                   className="h-64 w-64 object-cover rounded-lg  "
                   src={imageData}
                   alt=""
                 />
               </div>

               <button
                 className="w-64 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200  font-medium rounded-lg text-sm px-5 py-2 text-center  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 my-2"
                 onClick={() =>{sendUserNft(vaultData.address, tokenId, message); setSelect(false);}}
               >
                 Send NFT
               </button>
             </div>
           </div>
           }
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateVault;
