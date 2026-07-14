import { NavLink } from "react-router";
import type { ComponentProps } from "react";
import { useAreaStore } from "@/store/area.store";
import { useShallow } from "zustand/shallow";
import { Logo, ChevronIcon } from "@/assets/index";
import {
  Image,
  Dropdown,
  SocialMedia,
  DropdownItem,
  DropdownButton,
  DropdownContent,
  areas,
} from "@/shared/index";

const Footer = ({ className, ...props }: ComponentProps<"footer">) => {
  const { setArea, selectedArea } = useAreaStore(useShallow((state) => state));

  return (
    <>
      <footer className={className} {...props}>
        <div className="flex justify-between items-center py-16">
          <div className="flex items-center gap-2">
            <Logo className="size-7 fill-st-primary" />
            <h2 className="text-2xl font-bold text-st-primary">Markist</h2>
          </div>
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
          <SocialMedia className="size-3 xl:size-5 fill-st-primary" />
        </div>
        <div className="w-full h-px bg-b-secondary"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 auto-rows-auto items-center gap-2 py-12">
          <p className="font-medium text-t-secondary text-sm lg:text-lg">
            @ All Rights Reserved - 2025
          </p>
          <div className="flex items-center justify-center md:justify-end gap-8  row-start-2 lg:row-auto">
            <p className="font-medium text-t-secondary text-sm lg:text-lg">
              Terms of Service
            </p>
            <p className="font-medium text-t-secondary text-sm lg:text-lg">
              Privacy Policy
            </p>
            <Dropdown>
              <DropdownButton className="flex-between w-25 h-9 bg-b-primary border border-bo-primary rounded-xl p-2">
                <Image
                  className="h-full"
                  imageClass="object-contain"
                  src={selectedArea.src}
                  alt={selectedArea.name}
                />
                <p className="text-md text-t-secondary">{selectedArea.lang}</p>
                <ChevronIcon className="size-4 fill-st-primary" />
              </DropdownButton>
              <DropdownContent className="flex flex-col gap-1 bg-b-primary border border-bo-primary my-1 p-1 rounded-xl animate-fade-in">
                {areas.map((item) => (
                  <DropdownItem
                    onClick={() => setArea(item)}
                    className={`flex-between w-25 h-8 p-2 rounded-lg hover:bg-b-secondary ${selectedArea.name === item.name ? "bg-b-secondary" : ""}`}
                    key={item.name}
                  >
                    <Image
                      className="h-full"
                      imageClass="object-contain"
                      src={item.src}
                      alt={item.name}
                    />
                    <p className="text-md text-t-secondary">{item.lang}</p>
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
