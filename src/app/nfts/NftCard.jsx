import React from "react";
import DiamondIcon from '@mui/icons-material/Diamond';

const NftCard = ({ tokenId, image }) => {
  return (
    <div
        className=" bg-zinc-900 text-white border rounded-lg m-4 p-2 border-gray-800 cursor-pointer "
        onClick={() => {}}>

        <div className="flex items-center justify-between gap-3 text-slate-300 ">
          <h3 className="text-sm font-semibold p-2">#{tokenId}</h3>
          <p className=" ">
            <span>1</span>
            <DiamondIcon className="h-5" />
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img
            className="h-48 w-48 object-cover rounded-lg "
            src={image}
            alt=""
          />
        </div>
      </div>
    
  );
};

export default NftCard;
