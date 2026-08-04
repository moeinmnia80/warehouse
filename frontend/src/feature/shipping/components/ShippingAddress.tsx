import { Select, SelectButton, SelectContent, SelectItems } from "@/shared";
import {
  InfoRow,
  EntryCard,
  IconButton,
  EntryHeader,
  MOCK_SHIPPING_ADDRESSES,
} from "@/feature/shipping";

export const ShippingAddress = () => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:gap-10 pt-6">
      <section className="w-full lg:max-w-100 animate-slide-up">
        <h3 className="text-sm mb-1.5">Select Address</h3>
        <Select className="**:text-sm" defaultValue="Select Address">
          <SelectButton className="btn btn--border max-w-full! justify-between bg-b-primary px-4" />
          <SelectContent className="w-full bg-b-primary border border-bo-primary rounded-lg mt-1 animate-slide-down overflow-hidden">
            <SelectItems
              key={MOCK_SHIPPING_ADDRESSES.id}
              className="flex items-center h-12 px-4 cursor-pointer hover:bg-b-secondary line-clamp-1"
              value={MOCK_SHIPPING_ADDRESSES.name}
            >
              {MOCK_SHIPPING_ADDRESSES.address}
            </SelectItems>
          </SelectContent>
        </Select>
      </section>
      <div className="w-full">
        <EntryCard className="text-tx-primary bg-b-secondary border border-bo-primary animate-slide-up">
          <EntryHeader title="Shipping Address" data={MOCK_SHIPPING_ADDRESSES}>
            <IconButton
              aria-label="Edit shipping address"
              className="stroke-st-primary hover:bg-tx-primary hover:*:stroke-b-primary"
            />
          </EntryHeader>
          <InfoRow label="Name" value={MOCK_SHIPPING_ADDRESSES.name} />
          <InfoRow label="Address" value={MOCK_SHIPPING_ADDRESSES.address} />
          <InfoRow label="Phone" value={MOCK_SHIPPING_ADDRESSES.phone} />
        </EntryCard>
      </div>
    </div>
  );
};
