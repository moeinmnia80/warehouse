// import { useArea } from "@/store";
import Logo from "@/assets/icons/Logo";
// import { useShallow } from "zustand/shallow";
import type { ComponentProps, FC } from "react";
import SocialMedia from "@/shared/components/SocialMedia";
// import { Dropdown } from "@/shared/components/ui/DropDown";

const Footer: FC<ComponentProps<"footer">> = ({ className, ...props }) => {
  // const areas = useArea(useShallow((state) => state.areas));
  // const selectedArea = useArea(useShallow((state) => state.selectedArea));
  // const setArea = useArea(useShallow((state) => state.setArea));

  return (
    <>
      <footer className={className} {...props}>
        <div className="flex justify-between items-center py-16">
          <div className="flex items-center gap-2">
            <Logo className="size-7 fill-st-primary" />
            <h2 className="text-2xl font-bold text-st-primary">Markist</h2>
          </div>
          <ul className="flex gap-10">
            <li className="text-t-secondary text-lg font-medium">My Suit</li>
            <li className="text-t-secondary text-lg font-medium">
              Shipping History
            </li>
            <li className="text-t-secondary text-lg font-medium">Help</li>
            <li className="text-t-secondary text-lg font-medium">Contact Us</li>
          </ul>
          <SocialMedia className="size-6 fill-st-primary" />
        </div>
        <div className="w-full h-px bg-b-secondary"></div>
        <div className="flex items-center justify-between">
          <p className="font-medium text-t-secondary text-lg">
            @ All Rights Reserved - 2025
          </p>
          <div className="flex items-center gap-8 py-12">
            <p className="font-medium text-t-secondary text-lg">
              Terms of Service
            </p>
            <p className="font-medium text-t-secondary text-lg">
              Privacy Policy
            </p>
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
