import { SearchIcon } from "lucide-react";
import { Form, Input, Label } from "@/shared/index";
import { DateRangeFilter } from "@/feature/shipping/index";

export const ShippingTab = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-1 flex-col md:flex-row w-full">
      <Form className="flex-center w-full xl:max-w-100 mt-0!">
        <Label className="flex w-full relative">
          <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 stroke-tx-placeholder" />
          <Input
            type="search"
            name="search"
            placeholder="search for invoice"
            className="h-11 text-tx-placeholder border border-bo-primary rounded-lg ps-8 pe-2 placeholder:text-md"
          />
        </Label>
      </Form>
      <div className="flex w-full @container">
        <DateRangeFilter />
      </div>
    </div>
  );
};
