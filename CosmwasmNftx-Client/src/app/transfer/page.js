"use client";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Card from "../components/Card";

const Buy = () => {
  return (
    <>
      <div className="p-10 ">
        <h2 className="font-bold text-3xl mb-2 text-white">Transfer NFT</h2>
        <p className=" mb-4 text-sm">
          Browse the decentralized NFT marketplace.
        </p>
        <div className="bg-gradient-to-r from-transparent via-gray-500 to-blue-500 h-px mb-4"></div>
      </div>
      <div className="flex justify-between px-8">
        <h1 className="text-white font-bold text-xl">ALL COLLECTIONS</h1>
        <div className="border-b-2 mb-5  border-gray-800">
          <SearchIcon className="text-white" />
          <input
            type="text"
            className="bg-transparent mb-2 "
            placeholder="Search Vault"
          />
        </div>
      </div>
      <div className="flex flex-wrap px-8 gap-6">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};

export default Buy;
