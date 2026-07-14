import { NavLink } from "react-router";
import { NAV_ITEMS } from "@/shared/index";

export const NavLinks = () => (
  <ul className="hidden gap-10 lg:flex">
    {NAV_ITEMS.map(({ to, label }) => (
      <li
        key={to}
        className="cursor-pointer text-t-secondary text-lg font-medium"
      >
        <NavLink to={to}>{label}</NavLink>
      </li>
    ))}
    <li className="cursor-pointer text-t-secondary text-lg font-medium">
      Help
    </li>
    <li className="cursor-pointer text-t-secondary text-lg font-medium">
      Contact Us
    </li>
  </ul>
);
