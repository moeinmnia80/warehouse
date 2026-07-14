import { Logo } from "@/assets/index";
import { type ComponentProps } from "react";
import { Link, useLocation } from "react-router";
import {
  NavLinks,
  ThemeToggle,
  UserMenuHeader,
  AreaSelectorHeader,
  useScrolled,
} from "@/shared/index";

const Header = (props: ComponentProps<"header">) => {
  const location = useLocation();
  const isShow = location.pathname.startsWith("/dashboard");
  const headerRef = useScrolled<HTMLElement>(10);
  return (
    <>
      <header {...props} ref={headerRef}>
        <Link to={"/"} className="flex items-center gap-2 animate-scale-in">
          <Logo className="size-7 fill-st-primary" />
          <h2 className="text-2xl font-bold text-st-primary">Markist</h2>
        </Link>
        {isShow && <NavLinks />}
        <div className="flex-center gap-4">
          <AreaSelectorHeader isShow={isShow} />
          {!isShow ? <ThemeToggle /> : <UserMenuHeader />}
        </div>
      </header>
    </>
  );
};

export default Header;
