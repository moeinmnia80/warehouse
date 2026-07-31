import { Select, SelectButton, SelectContent, SelectItems } from "@/shared";

const mockData = [
  { id: "0", value: "1" },
  { id: "1", value: "2" },
  { id: "2", value: "3" },
  { id: "3", value: "4" },
];

export const ShippingPaymentMethod = () => {
  return (
    <div>
      <section className="max-w-100 py-6 border-b border-bo-primary">
        <h3 className="text-sm mb-1.5">Select Payment Method</h3>
        <Select defaultValue="Select Payment Method">
          <SelectButton className="btn btn--border justify-between bg-b-primary px-4" />
          <SelectContent className="w-full bg-b-primary border border-bo-primary rounded-lg mt-1 animate-slide-down">
            {mockData.map((item) => (
              <SelectItems
                key={item.id}
                className="flex items-center h-12 px-4 cursor-pointer hover:bg-b-secondary"
                value={item.value}
                onClick={(selectedValue) => console.log(selectedValue)}
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
