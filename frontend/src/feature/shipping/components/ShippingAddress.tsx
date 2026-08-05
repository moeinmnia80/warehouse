import {
  Select,
  SelectButton,
  SelectContent,
  SelectItems,
  type SelectOption,
} from "@/shared";
import {
  InfoRow,
  EntryCard,
  IconButton,
  EntryHeader,
  MOCK_SHIPPING_ADDRESSES,
  type ShippingAddressType,
} from "@/feature/shipping";
import { useState } from "react";

const defaultAddress = MOCK_SHIPPING_ADDRESSES.find(
  (address) => address.isDefault,
) as ShippingAddressType;

export const ShippingAddress = () => {
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress);

  const selectAddressHandler = (option: SelectOption) => {
    const address = MOCK_SHIPPING_ADDRESSES.find(
      (address) => address.id === option.id,
    );
    if (address) {
      setSelectedAddress(address);
    }
  };

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:gap-10 pt-6">
      <section className="w-full lg:max-w-100 animate-slide-up">
        <h3 className="text-sm mb-1.5">Select Address</h3>
        <Select
          className="**:text-sm"
          defaultValue={{
            id: defaultAddress.id,
            label: defaultAddress.address,
          }}
        >
          <SelectButton
            maxCharShow="max-w-65"
            onReset={() => setSelectedAddress(defaultAddress)}
            className="btn btn--border max-w-full! justify-between bg-b-primary px-4"
          />
          <SelectContent className="w-full bg-b-primary border border-bo-primary rounded-lg mt-1 animate-slide-down overflow-hidden">
            {MOCK_SHIPPING_ADDRESSES.map((address) => (
              <SelectItems
                key={address.id}
                className={`flex items-center h-12 px-4 cursor-pointer hover:bg-b-secondary line-clamp-1 ${address.id === selectedAddress.id ? "text-blue-400" : ""}`}
                onClick={selectAddressHandler}
                option={{
                  id: address.id,
                  label: address.address,
                }}
              >
                <span className="uppercase overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
                  {address.address}
                </span>
              </SelectItems>
            ))}
          </SelectContent>
        </Select>
      </section>
      <div className="w-full">
        <EntryCard className="text-tx-primary bg-b-secondary border border-bo-primary animate-slide-up">
          <EntryHeader title="Shipping Address" data={selectedAddress}>
            <IconButton
              aria-label="Edit shipping address"
              className="stroke-st-primary hover:bg-tx-primary hover:*:stroke-b-primary"
            />
          </EntryHeader>
          <InfoRow label="Name" value={selectedAddress.name} />
          <InfoRow label="Address" value={selectedAddress.address} />
          <InfoRow label="Phone" value={selectedAddress.phone} />
        </EntryCard>
      </div>
    </div>
  );
};
