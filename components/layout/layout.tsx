import React, { Fragment, ReactNode } from "react";
import MainNavigation from "./main-navigation";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
