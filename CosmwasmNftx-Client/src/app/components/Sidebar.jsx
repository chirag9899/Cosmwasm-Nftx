import React from "react";


const SidebarCol = ({rank , TknName , percent}) => {
  return (
    <div className="flex flex-1 justify-between bg-black border border-gray-800 p-2 m-2 rounded-lg">
      <div className="flex gap-2">
      <p className="bg-blue-400 rounded-lg px-1">{rank}</p>
      <p>{TknName}</p>
      </div>
      <p>{percent}</p>
    </div>
  );
};

const SidebarCard=()=>{
  return(
    <div className="bg-zinc-900 text-white border rounded-lg m-4 p-3 w-max-full border-gray-800">
        <div className="flex justify-between p-4 font-semibold text-gray-400">
          <p>Trending</p>
          <p>(High TURNOVER)</p>
        </div>
        <SidebarCol rank="#1" TknName="Punk" percent="120%"/>
        <SidebarCol rank='#2' TknName="CRAC" percent="200%"/>
        <SidebarCol rank='#2' TknName="CRAC" percent="200%"/>
        
      </div>

  )
}

const Sidebar = () => {
  return (
    <div className=" ">
      <SidebarCard/>
      <SidebarCard/>
      <SidebarCard/>
    </div>
  );
};

export default Sidebar;
