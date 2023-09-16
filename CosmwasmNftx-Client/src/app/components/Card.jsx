import React from 'react';

const Card = ({ item }) => {
  return (<>
    <div className=' bg-zinc-900 text-white border rounded-lg m-4 p-2 w-full border-gray-800 cursor-pointer'>
      <div className="flex items-center justify-center">
        <img className='h-72 w-60 object-cover rounded-lg' src="https://ipfs-gw.stargaze-apis.com/ipfs/bafybeiekar32u5m2i2dulzuyyj5azmm7ffvsljoomx7b35vaojtif4uh3a/87.png" alt="" />
      </div>
      <div className="flex justify-between">

      <div className="flex ml-4 p-1 justify-start gap-2">
        <img className='h-8' src="https://images.nftx.io/cdn-cgi/image/anim=false,width=150,height=150,format=auto/https://assets.nftx.io/vaults-v2/241/256x256.png" alt="" />
        <h3 className='text-xl font-semibold'>{item?.vault_symbol}</h3>
      </div>
      <div className='p-1 mr-5' ><h4>~100</h4></div>
      </div>
      <h5 className='text-xs ml-6 text-gray-600 overflow-hidden'>{item?.vault_name}</h5>
    </div>
      </>
  )
}

export default Card;
