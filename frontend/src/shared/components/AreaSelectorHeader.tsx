import { ChevronIcon, TickIcon } from "@/assets";
import { useAreaStore } from "@/store/area.store";
import {
  areas,
  Image,
  Dropdown,
  DropdownItem,
  DropdownButton,
  DropdownContent,
} from "@/shared/index";

export const AreaSelectorHeader = ({ isShow }: { isShow: boolean }) => {
  const setArea = useAreaStore((s) => s.setArea);
  const selectedArea = useAreaStore((s) => s.selectedArea);

  return (
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
            key={item.name}
            onClick={() => setArea(item)}
            className={`flex-between w-77 h-11 rounded-xl px-2 hover:bg-b-secondary ${selectedArea.name === item.name ? "bg-b-secondary" : ""}`}
          >
            <Image
              src={item.src}
              alt={item.name}
              className="w-6 h-4 object-contain"
            />
            <p className="text-md text-t-primary font-semibold">{item.desc}</p>
            <TickIcon
              className={`size-5 ${item.name === selectedArea.name ? "stroke-st-primary" : "invisible"}`}
            />
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};
