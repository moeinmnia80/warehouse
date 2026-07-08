import Footer from "./Footer";
import Header from "./Header";
import { useLocation } from "react-router";
import type { ComponentPropsWithoutRef, FC } from "react";
import { PATHS_WITHOUT_FOOTER } from "@/shared/constants/hiddenFooter";

const Layout: FC<ComponentPropsWithoutRef<"div">> = ({ children }) => {
  const { pathname } = useLocation();

  const shouldShowFooter = !PATHS_WITHOUT_FOOTER.includes(pathname);
  return (
    <>
      <Header
        className="header bg-b-primary px-5 md:px-20 sticky top-0 z-30
        border-b border-bo-primary "
      />
      <main
        className="flex bg-b-secondary
        w-full px-5 md:px-10 lg:px-15 overflow-hidden min-h-dvh"
      >
        {children}
      </main>
      {shouldShowFooter && (
        <Footer className="relative z-30 bg-b-primary px-5 md:px-10 lg:px-15 border-t border-bo-primary" />
      )}
    </>
  );
};

export default Layout;
