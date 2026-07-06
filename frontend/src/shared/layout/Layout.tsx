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
        className="header bg-b-primary px-5 md:px-20 z-10
        border-b border-bo-primary"
      />
      <main
        className="flex bg-b-secondary
        w-full px-5 md:px-10 lg:px-15 h-fit overflow-hidden"
      >
        {children}
      </main>
      {shouldShowFooter && (
        <Footer className="bg-b-primary px-5 md:px-20 border-t border-bo-primary" />
      )}
    </>
  );
};

export default Layout;
