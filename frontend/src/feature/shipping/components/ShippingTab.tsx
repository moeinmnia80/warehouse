import { Form, Input, Label } from "@/shared/components/ui/Form";
import DateRangeFilter from "./DateRangeFilter";
import { SearchIcon } from "lucide-react";

const ShippingTab = () => {
  return (
    <div className="flex-between flex-col md:flex-row w-full">
      <Form className="flex-center mt-0!">
        <Label className="flex relative">
          <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 stroke-t-placeholder" />
          <Input
            type="search"
            name="search"
            placeholder="search for invoice"
            className="w-[95vw]! max-w-100 h-11 text-t-placeholder border border-bo-primary rounded-lg ps-8 pe-2 placeholder:text-md"
          />
        </Label>
      </Form>
      <div>
        <DateRangeFilter />
      </div>
    </div>
  );
};

export default ShippingTab;
