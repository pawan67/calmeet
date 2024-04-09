"use client";

import Navigation from "../_components/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex ">
      <Navigation />
      <div className=" pt-16 md:pt-5 p-5 flex-1">{children}</div>
    </div>
  );
};

export default Layout;
