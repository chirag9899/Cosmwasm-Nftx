"use client";
import React, { useEffect, useState, useContext } from "react";
import { appState } from "../context/store";
import Logo from "../assets/logo.png";
import Link from "next/link";

const Header = () => {

  const { 
    /* Function provide by context */
    connectWallet,
    fetchVaultList,

    /* State provide by context */
    signer,
    clientSigner,

    /* State update provide by context */
  } = useContext(appState);

  useEffect(() => {
    connectWallet();
    fetchVaultList();
  }, [signer]);

  const mintNft = async () => {
    try {
      let transaction = await clientSigner.execute(
        signer,
        "osmo1k3j435f0pkla0tvgv20g73zm86aftg37surzndceex6any89qkvqfj6y4g",
        {
          mint: {
            token_id: "300",
            owner: signer,
            extension: {
              image: "ipfs://QmaWAmpcy8pyK5B2Bwy1yGW9D3wsPWvqXcexCqSRCLghiy",
            },
          },
        },
        "auto"
      );

      console.log(transaction);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-black px-4 h-24 flex justify-between sticky top-0 z-50 ">
        <div className="flex items-center gap-6 ml-2 ">
          <Link className="h-14 w-14" href="/">
            <img src={Logo.src} alt="LoGo" />
          </Link>
        </div>
        <div className="relative flex items-center gap-9 text-slate-200 font-semibold m-2 ">
          <Link
            className="hover:border border-zinc-500 hover:scale-105 py-2 px-4 hover:rounded-md inline-block rounded-full "
            href="/create-vault"
          > 
            Create
          </Link>
          <Link
            className="hover:border border-zinc-500 hover:scale-105 py-2 px-4  hover:rounded-md inline-block rounded-full cursor-pointer"
            href="/"
          >
            Collections
          </Link>
          <div
            className="hover:border border-zinc-500 hover:scale-105 py-2 px-4  hover:rounded-md inline-block rounded-full cursor-pointer"
            onClick={() => {
              mintNft();
            }}
          >
            Mint
          </div>
          <button
            onClick={connectWallet}
            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
          >
            {signer ? `${signer.slice(0, 8)}...` : "Connect"}
          </button>
        </div>
      </div>
      <div className=" z-50 bg-gradient-to-r from-transparent via-gray-500 to-blue-500 h-px mb-4"></div>
    </>
  );
};

export default Header;
