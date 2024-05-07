"use client";

import Navigation from "../_components/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="  ">
      <Navigation />
      <div className=" md:ml-[220px] pt-16 md:pt-5 p-5 md:p-10 ">
        {children}
      </div>
    </div>
  );
};

export default Layout;
