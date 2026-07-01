import Footer from "./Footer";
import Header from "./Header";
import type { FC } from "react";
import { useLocation } from "react-router";
import type { Props } from "../types/types";
import { PATHS_WITHOUT_FOOTER } from "../constants/hiddenFooter";

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
