import { Select, SelectButton, SelectContent, SelectItems } from "@/shared";

const MOCK_DATA = [
  { id: 0, value: "1" },
  { id: 1, value: "2" },
  { id: 2, value: "3" },
  { id: 3, value: "4" },
];

export const ShippingAddress = () => {
  return (
    <div className="pt-6">
      <section className="max-w-100">
        <h3 className="text-sm mb-1.5">Select Address</h3>
        <Select defaultValue="Select Address">
          <SelectButton className="btn btn--border justify-between px-4 text-sm" />
          <SelectContent className="w-full bg-b-primary border border-bo-primary rounded-lg overflow-hidden mt-1 animate-slide-down">
            {MOCK_DATA.map((item) => (
              <SelectItems
                key={item.id}
                value={item.value}
                className="flex items-center h-12 hover:bg-b-secondary cursor-pointer px-4"
              >
                {item.value}
              </SelectItems>
            ))}
          </SelectContent>
        </Select>
      </section>
    </div>
  );
};
