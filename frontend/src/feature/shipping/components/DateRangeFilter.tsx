import { ResetIcon } from "@/assets/index";
import { useAppDispatch, useAppSelector } from "@/store/redux/store";
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from "@/shared/index";
import {
  PRESETS,
  resetDateFilter,
  setDatePreset,
  activePresetLabel,
  rangeLabel,
} from "@/feature/shipping/index";

export const DateRangeFilter = () => {
  // use store
  const { dateFilter } = useAppSelector((state) => state.shipping);
  // operator
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 justify-end w-full gap-1 **:text-tx-primary **:text-sm">
        <div className="flex-center col-span-2 md:col-span-1 max-w-65 flex-3 border border-bo-primary rounded-lg">
          <Dropdown>
            <DropdownButton className="px-6 h-11 border-r border-bo-primary">
              {activePresetLabel(dateFilter)}
            </DropdownButton>
            <DropdownContent className="flex flex-col w-50 h-fit bg-b-secondary border border-bo-primary rounded-lg px-4 my-1">
              <DropdownLabel className="text-sm text-tx-placeholder! py-3">
                Quick Ranges
              </DropdownLabel>
              {PRESETS.map((item) => (
                <DropdownItem
                  key={item.value}
                  onClick={() => dispatch(setDatePreset(item.value))}
                  className="flex-between py-3"
                >
                  {item.label}
                </DropdownItem>
              ))}
              <DropdownSeparator />
              <DropdownLabel className="text-sm! text-tx-placeholder! py-3">
                Custom Range
              </DropdownLabel>
            </DropdownContent>
          </Dropdown>
          <div className="flex text-md px-6">{rangeLabel(dateFilter)}</div>
        </div>
        <button
          onClick={() => dispatch(resetDateFilter())}
          type="button"
          className="flex-center gap-1 h-11 px-5 border border-bo-primary rounded-lg"
        >
          <ResetIcon className="size-4 stroke-tx-placeholder" /> Reset
        </button>
        <button
          onClick={() => dispatch(resetDateFilter())}
          type="button"
          className="flex-center gap-1 w-fit h-11 px-5 border border-bo-primary rounded-lg"
        >
          <ResetIcon className="size-4 stroke-tx-placeholder" /> Export CSV
        </button>
      </div>
    </>
  );
};
