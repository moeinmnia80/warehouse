import { Logo } from "@/assets/index";
import { Link } from "react-router";
import { type ComponentProps } from "react";
import {
  NavLinks,
  useInPath,
  useScrolled,
  ThemeToggle,
  UserMenuHeader,
  AreaSelectorHeader,
} from "@/shared/index";

const Header = (props: ComponentProps<"header">) => {
  const isShow = useInPath("/dashboard");
  const headerRef = useScrolled<HTMLElement>(10);

  return (
    <>
      <header {...props} ref={headerRef}>
        <Link to={"/"} className="flex items-center gap-2 animate-scale-in">
          <Logo className="size-7 fill-st-primary" />
          <h2 className="text-xl font-bold text-st-primary">Markist</h2>
        </Link>
        {isShow && <NavLinks />}
        <div className="flex-center gap-4">
          <AreaSelectorHeader />
          {!isShow ? <ThemeToggle /> : <UserMenuHeader />}
        </div>
      </header>
    </>
  );
};

export default Header;
