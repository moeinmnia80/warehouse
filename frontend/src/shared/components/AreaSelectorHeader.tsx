import { ChevronIcon, TickIcon } from "@/assets";
import { useAreaStore } from "@/store/area.store";
import {
  areas,
  Image,
  Dropdown,
  useInPath,
  DropdownItem,
  DropdownButton,
  DropdownContent,
} from "@/shared/index";

export const AreaSelectorHeader = () => {
  const setArea = useAreaStore((state) => state.setArea);
  const selectedArea = useAreaStore((state) => state.selectedArea);
  const isShow = useInPath("/dashboard");
  return (
    <Dropdown
      className={`hidden w-fit min-w-22 h-11 xl:flex items-center justify-center text-tx-primary rounded-full bg-b-primary border border-bo-primary`}
    >
      <DropdownButton className="w-full flex-between  p-2 px-3">
        <Image
          src={selectedArea?.src}
          alt={selectedArea?.name}
          className="w-6 h-4 object-contain"
        />
        {isShow && (
          <p className="text-sm font-bold text-current mx-3">
            {selectedArea.desc}
          </p>
        )}
        <ChevronIcon className="size-4 fill-st-primary" />
      </DropdownButton>
      <DropdownContent className="flex flex-col gap-1 items-center p-1 rounded-xl mt-2 animate-fade-in bg-b-primary border border-bo-primary">
        {areas.map((item) => (
          <DropdownItem
            key={item.name}
            onClick={() => setArea(item)}
            className={`flex-between w-77 h-11 px-2 rounded-xl hover:bg-b-secondary 
            ${selectedArea.name === item.name ? "bg-b-secondary" : ""}`}
          >
            <Image
              src={item.src}
              alt={item.name}
              className="w-6 h-4 object-contain"
            />
            <p className="text-sm text-current font-semibold">{item.desc}</p>
            <TickIcon
              className={`size-5 ${item.name === selectedArea.name ? "stroke-st-primary" : "invisible"}`}
            />
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};
