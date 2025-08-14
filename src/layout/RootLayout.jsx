import React from "react";
import { Outlet } from "react-router-dom";
import background from "../assets/dino-reichmuth-A5rCN8626Ck-unsplash 1.png";

const RootLayout = () => {
  return (
    <div
      className="relative flex items-center justify-center bg-cover bg-center min-h-[500px] sm:min-h-[800px] lg:min-h-[1024px]"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#111111]/25 backdrop-blur-[5px]"></div>

      {/* Page content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center bg-[#FFFFFF] rounded-[24px]
                    sm:mx-10 lg:px-16 
                    w-full sm:w-[95%] md:w-[795px] lg:w-[60%]
                     m-5 sm:m-10 p-6 
                    h-auto min-h-[70vh] sm:h-[900px] lg:h-[900px] 2xl:h-[100vh]"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
