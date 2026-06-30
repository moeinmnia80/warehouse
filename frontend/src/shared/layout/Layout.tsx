import Footer from "./Footer";
import Header from "./Header";
import type { FC } from "react";
import type { Props } from "../types/types";
import { useLocation } from "react-router";

const Layout: FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <>
      <Header className="header bg-b-primary z-10 border-b border-bo-primary" />
      <main className="flex w-full bg-b-third px-5">{children}</main>
      {pathname === "/login" || pathname === "/forget-password" ? (
        ""
      ) : (
        <Footer />
      )}
    </>
  );
};

export default Layout;
