import { NavLink } from "react-router";
import { NAV_ITEMS } from "@/shared/index";

export const NavLinks = () => (
  <ul className="hidden lg:flex gap-5 xl:gap-8 text-tx-primary text-md font-medium *:cursor-pointer">
    {NAV_ITEMS.map(({ to, label }) => (
      <li key={to} className="cursor-pointer text-current">
        <NavLink to={to}>{label}</NavLink>
      </li>
    ))}
    <li className="text-current ">Help</li>
    <li className="text-current ">Contact Us</li>
  </ul>
);
