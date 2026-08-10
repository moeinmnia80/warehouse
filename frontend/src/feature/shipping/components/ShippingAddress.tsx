import { useState } from "react";
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
  DEFAULT_SHIPPING_ADDRESSES,
  useGetUserAddressQuery,
} from "@/feature/shipping";

export const ShippingAddress = () => {
  const [selectedAddress, setSelectedAddress] = useState(
    DEFAULT_SHIPPING_ADDRESSES,
  );

  const { data, isLoading } = useGetUserAddressQuery();

  const selectAddressHandler = (option: SelectOption) => {
    const address = data?.find((address) => address.id === option.id);
    if (address) {
      setSelectedAddress(address);
    }
  };
  if (isLoading) return <>Loading</>;
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:gap-10 pt-6">
      <section className="w-full lg:max-w-100 animate-slide-up">
        <h3 className="text-sm mb-1.5">Select Address</h3>
        <Select
          className="**:text-sm"
          defaultValue={{
            id: DEFAULT_SHIPPING_ADDRESSES.id,
            label: DEFAULT_SHIPPING_ADDRESSES.addressPrimary,
          }}
        >
          <SelectButton
            maxCharShow="max-w-65"
            onReset={() => setSelectedAddress(DEFAULT_SHIPPING_ADDRESSES)}
            className="btn btn--border max-w-full! justify-between bg-b-primary px-4"
          />
          <SelectContent className="w-full bg-b-primary border border-bo-primary rounded-lg mt-1 animate-slide-down overflow-hidden">
            {data?.map((address) => (
              <SelectItems
                key={address.id}
                onClick={selectAddressHandler}
                className={`flex items-center h-12 px-4 cursor-pointer hover:bg-b-secondary line-clamp-1 ${address.id === selectedAddress.id ? "text-blue-400" : ""}`}
                option={{
                  id: address.id,
                  label: address.addressPrimary,
                }}
              >
                <span className="uppercase overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
                  {address.addressPrimary}
                </span>
              </SelectItems>
            ))}
          </SelectContent>
        </Select>
      </section>
      <EntryCard className="w-full text-tx-primary bg-b-secondary border border-bo-primary animate-slide-up">
        <EntryHeader title="Shipping Address" data={selectedAddress}>
          <IconButton
            aria-label="Edit shipping address"
            disabled={selectedAddress.id === "default"}
            className="stroke-st-primary enabled:hover:bg-tx-primary enabled:hover:*:stroke-b-primary disabled:opacity-50"
          />
        </EntryHeader>
        <InfoRow label="Name" value={selectedAddress.fullName} />
        <InfoRow
          label="Address"
          value={
            selectedAddress.id === "default"
              ? ""
              : selectedAddress.addressPrimary
          }
        />
        <InfoRow label="Phone" value={selectedAddress.phoneNumber} />
      </EntryCard>
    </div>
  );
};
