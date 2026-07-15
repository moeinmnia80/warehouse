import { useAuth } from "@/feature/auth";
import { ChevronIcon, LogoutIcon, SettingsIcon } from "@/assets";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownButton,
  DropdownContent,
} from "@/shared/index";

export const UserMenuHeader = () => {
  const { logout, user } = useAuth();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await logout();
  };

  return (
    <Dropdown>
      <DropdownButton className="flex-between w-fit shrink-0">
        <div className="text-left">
          <h3 className="text-sm xl:text-xs font-bold text-t-primary">
            <span className="capitalize">
              {user?.gender === "male"
                ? "mr"
                : user?.gender === "female"
                  ? "mz"
                  : "mr"}
            </span>
            <span className="uppercase">.{user?.fullName}</span>
          </h3>
          <p className="text-sm xl:text-xs font-bold text-t-placeholder capitalize">
            {user?.role}
          </p>
        </div>
        <ChevronIcon className="size-3 fill-st-primary ms-2" />
      </DropdownButton>
      <DropdownContent className="bg-b-primary border border-bo-primary rounded-md p-1 mt-2 animate-fade-in">
        <DropdownItem>
          <Button
            onClick={handleLogout}
            className="btn text-t-primary text-sm w-32 h-10 rounded-md transition duration-200 hover:bg-b-secondary"
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
  );
};
