import { type ComponentProps } from "react";
import { useShallow } from "zustand/shallow";
import { useAppSelector, useArea } from "@/store";
import { Link, NavLink, useLocation } from "react-router";
import {
  Logo,
  DarkIcon,
  TickIcon,
  LightIcon,
  LogoutIcon,
  ChevronIcon,
  SettingsIcon,
} from "@/assets/index";
import {
  Image,
  Toggle,
  Button,
  Dropdown,
  useTheme,
  ToggleLabel,
  ToggleButton,
  DropdownButton,
  DropdownContent,
  DropdownItem,
} from "@/shared/index";
import { useAuth } from "@/feature/auth/index";

const Header = (props: ComponentProps<"header">) => {
  const location = useLocation();
  const { logout } = useAuth();
  const { theme, themeToggler } = useTheme();
  const { areas, selectedArea, setArea } = useArea(
    useShallow((state) => state),
  );
  const { user } = useAppSelector((state) => state.auth);

  // check root for header list
  const isShow = location.pathname.startsWith("/dashboard");

  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    await logout();
  };

  return (
    <>
      <header {...props}>
        <Link to={"/"} className="flex items-center gap-2 animate-scale-in">
          <Logo className="size-7 fill-st-primary" />
          <h2 className="text-2xl font-bold text-st-primary">Markist</h2>
        </Link>
        {isShow && (
          <ul className="hidden gap-10 lg:flex">
            <li className="cursor-pointer text-t-secondary text-lg font-medium">
              <NavLink to={"dashboard/my-suite"}>My Suit</NavLink>
            </li>
            <li className="cursor-pointer text-t-secondary text-lg font-medium">
              <NavLink to="dashboard/shipping">Shipping History</NavLink>
            </li>
            <li className="cursor-pointer text-t-secondary text-lg font-medium">
              Help
            </li>
            <li className="cursor-pointer text-t-secondary text-lg font-medium">
              Contact Us
            </li>
          </ul>
        )}
        <div className="flex-center gap-4">
          <Dropdown
            className={`hidden w-fit min-w-22 h-11 rounded-full xl:flex items-center justify-center ${isShow ? "bg-b-primary border border-bo-primary" : "bg-b-third"}`}
          >
            <DropdownButton className="w-full flex-between p-2 px-3">
              <Image
                src={selectedArea?.src}
                alt={selectedArea?.name}
                className="w-6 h-4 object-contain"
              />
              {isShow && (
                <p className="text-sm font-bold text-t-primary mx-2">
                  {selectedArea.desc}
                </p>
              )}
              <ChevronIcon className="size-4 fill-st-primary" />
            </DropdownButton>
            <DropdownContent
              className={`flex flex-col gap-1 items-center mt-2 rounded-xl p-1 animate-fade-in ${isShow ? "bg-b-primary border border-bo-primary" : "bg-b-third"}`}
            >
              {areas.map((item) => (
                <DropdownItem
                  onClick={() => setArea(item)}
                  className={`flex-between w-77 h-11 rounded-xl px-2 hover:bg-b-secondary
                  ${selectedArea.name === item.name ? "bg-b-secondary" : ""}`}
                  key={item.name}
                >
                  <Image
                    src={item.src}
                    alt={item.name}
                    className="w-6 h-4 object-contain"
                  />
                  <p className="text-md text-t-primary font-semibold">
                    {item.desc}
                  </p>
                  <TickIcon
                    className={`size-5 ${
                      item.name === selectedArea.name
                        ? "stroke-st-primary"
                        : "invisible"
                    }`}
                  />
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
          {!isShow ? (
            <Toggle className="relative flex w-22 h-11 bg-b-third rounded-full">
              <ToggleButton onClick={themeToggler} className="flex">
                <ToggleLabel
                  className={`absolute top-1 left-1 bg-b-muted size-9 rounded-full transition duration-200 ${theme === "dark" ? "translate-x-0" : "translate-x-11"}`}
                />
                <DarkIcon className="z-10 size-11 p-3 fill-st-primary" />
                <LightIcon className="z-10 size-11 p-3 fill-st-primary" />
              </ToggleButton>
            </Toggle>
          ) : (
            <>
              <Dropdown>
                <DropdownButton className="flex-between w-fit shrink-0">
                  <div className="text-left">
                    <h3 className="text-sm xl:text-xs font-bold text-t-primary">
                      <span className="capitalize">
                        {user && user?.gender === "male" ? "mr" : "mz"}
                      </span>
                      <span className="uppercase">
                        .{user && user?.fullName}
                      </span>
                    </h3>
                    <p className="text-sm xl:text-xs font-bold  text-t-placeholder capitalize">
                      {user && user?.role}
                    </p>
                  </div>
                  <ChevronIcon className="size-3 fill-st-primary ms-2" />
                </DropdownButton>
                <DropdownContent className="bg-b-primary border border-bo-primary rounded-md p-1 mt-2 animate-fade-in">
                  <DropdownItem>
                    <Button
                      onClick={(e) => handleLogout(e)}
                      className="btn text-t-primary text-sm w-32 h-10 rounded-md transition duration-200 hover:bg-b-secondary "
                    >
                      Log Out
                      <LogoutIcon className="size-4 fill-st-primary ms-5" />
                    </Button>
                  </DropdownItem>
                  <DropdownItem>
                    <Button className="btn text-t-primary text-sm w-32 h-10 rounded-md transition duration-200 hover:bg-b-secondary">
                      Settings
                      <SettingsIcon className="size-4 stroke-st-primary ms-5" />
                    </Button>
                  </DropdownItem>
                </DropdownContent>
              </Dropdown>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
