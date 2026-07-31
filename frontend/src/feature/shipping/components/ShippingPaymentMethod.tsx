import { Select, SelectButton, SelectContent, SelectItems } from "@/shared";

const MOCK_DATA = [
  { id: 0, value: "1" },
  { id: 0, value: "2" },
  { id: 0, value: "3" },
  { id: 0, value: "4" },
];

export const ShippingPaymentMethod = () => {
  return (
    <div className="pb-6">
      <section className="max-w-100">
        <h3 className="text-sm mb-1.5">Select Payment Method</h3>
        <Select defaultValue="Select Payment Method">
          <SelectButton className="btn btn--border justify-between px-4 text-sm" />
          <SelectContent className="w-full bg-b-primary border border-bo-primary rounded-lg overflow-hidden mt-1 animate-slide-down">
            {MOCK_DATA.map((item) => (
              <SelectItems
                value={item.value}
                key={item.id}
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
