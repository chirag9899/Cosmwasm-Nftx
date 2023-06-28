"use client"
import React, { useState, useContext, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation'
import { appState } from '../context/store';
import Card from './Card';

const Content = () => {
  const {
    /* Function provide by context */

    /* State provide by context */
    vaultDataList,

    /* State update provide by context */
    setVaultNftsData,
  } = useContext(appState);

  const router = useRouter();

  return (
    <div className='w-full'>
      <div className="flex justify-between p-4 ">
        <h1 className='text-white font-bold text-2xl text-center w-full'>ALL COLLECTIONS</h1>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {
          vaultDataList?.map((item, index) => {
            return (
              <div key={index} onClick={() => {
                setVaultNftsData(item);
                router.push("/nfts")
              }}>
                <Card item={item}/>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default Content