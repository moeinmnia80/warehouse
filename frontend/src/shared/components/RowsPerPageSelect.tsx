import { Select, SelectButton, SelectContent, SelectItems } from "@/shared";

export const RowsPerPageSelect = () => {
  return (
    <>
      <Select
        className="**:text-sm flex w-fit justify-center bg-alert"
        defaultValue={{ id: "1", label: "5" }}
      >
        <SelectButton className="flex">joon</SelectButton>
        <SelectContent className="w-full bg-b-primary border border-bo-primary rounded-lg overflow-hidden mt-1 animate-slide-down z-20">
          <SelectItems option={{ id: "2", label: "10" }}>1</SelectItems>
          <SelectItems option={{ id: "3", label: "15" }}>2</SelectItems>
        </SelectContent>
      </Select>
    </>
  );
};
