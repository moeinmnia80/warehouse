import Footer from "./Footer";
import Header from "./Header";
import type { FC } from "react";
import type { Props } from "../types/types";
import { useLocation } from "react-router";

const PATHS_WITHOUT_FOOTER = ["/login", "/forget-password", "/register"];

const Layout: FC<Props> = ({ children }) => {
  const { pathname } = useLocation();

  const shouldShowFooter = !PATHS_WITHOUT_FOOTER.includes(pathname);
  return (
    <>
      <Header className="header bg-b-primary z-10 border-b border-bo-primary" />
      <main className="flex w-full bg-b-third px-5">{children}</main>
      {shouldShowFooter && <Footer />}
    </>
  );
};

export default Layout;
