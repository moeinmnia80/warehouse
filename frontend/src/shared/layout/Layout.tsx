import { useLocation } from "react-router";
import Footer from "@/shared/layout/Footer";
import Header from "@/shared/layout/Header";
import type { ComponentPropsWithoutRef } from "react";
import { PATHS_WITHOUT_FOOTER, ToastContainer } from "@/shared/index";

const Layout = ({ children }: ComponentPropsWithoutRef<"div">) => {
  const { pathname } = useLocation();

  const shouldShowFooter = !PATHS_WITHOUT_FOOTER.includes(pathname);
  return (
    <>
      <Header
        className="header bg-b-primary px-5 md:px-20 sticky top-0 z-30
        border-b border-bo-primary"
      />

      <main
        className="relative flex bg-b-secondary
        w-full px-5 md:px-10 lg:px-15 min-h-dvh"
      >
        <ToastContainer />
        {children}
      </main>
      {shouldShowFooter && (
        <Footer className="relative bottom-0 z-30 bg-b-primary px-5 md:px-10 lg:px-15 border-t border-bo-primary" />
      )}
    </>
  );
};

export default Layout;
