import { useArea } from "@/store";
import Logo from "@/assets/icons/Logo";
import { useShallow } from "zustand/shallow";
import type { ComponentProps, FC } from "react";
import SocialMedia from "@/shared/components/SocialMedia";
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownItem,
} from "../components/ui/DropDown";
import Image from "../components/ui/Image";
import ChevronIcon from "@/assets/icons/ChevronIcon";

const Footer: FC<ComponentProps<"footer">> = ({ className, ...props }) => {
  const areas = useArea(useShallow((state) => state.areas));
  const selectedArea = useArea(useShallow((state) => state.selectedArea));
  const setArea = useArea(useShallow((state) => state.setArea));

  return (
    <>
      <footer className={className} {...props}>
        <div className="flex justify-between items-center py-16">
          <div className="flex items-center gap-2">
            <Logo className="size-7 fill-st-primary" />
            <h2 className="text-2xl font-bold text-st-primary">Markist</h2>
          </div>
          <ul className="hidden xl:flex gap-10">
            <li className="text-t-secondary text-lg font-medium">My Suit</li>
            <li className="text-t-secondary text-lg font-medium">
              Shipping History
            </li>
            <li className="text-t-secondary text-lg font-medium">Help</li>
            <li className="text-t-secondary text-lg font-medium">Contact Us</li>
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

            {/* <Dropdown
              data={areas}
              value={selectedArea}
              onChange={setArea}
              getKey={(area) => area.name}
              valueClass="bg-b-secondary rounded-xl h-9 w-25 flex items-center p-1"
              renderValue={() => (
                <>
                  <div className="size-fit p-2">
                    <img
                      className="size-6 mr-2 object-contain"
                      src={selectedArea?.src}
                      alt={selectedArea?.name}
                    />
                  </div>
                  <p className="text-md font-bold text-t-secondary">
                    {selectedArea.lang}
                  </p>
                </>
              )}
              itemClass="bottom-full right-0 
              w-30 bg-b-primary mb-2 p-1 
              border border-bo-primary rounded-md z-20"
              renderItem={(area) => (
                <>
                  <div className="size-fit p-2">
                    <img
                      className="size-6 mr-2 object-contain"
                      src={area?.src}
                      alt={area?.name}
                    />
                  </div>
                  <p className="text-md font-bold text-t-secondary">
                    {area?.lang}
                  </p>
                </>
              )}
            /> */}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
