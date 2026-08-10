import { useState } from "react";
import {
  Select,
  SelectItems,
  SelectButton,
  SelectContent,
  type SelectOption,
} from "@/shared";
import {
  InfoRow,
  EntryCard,
  IconButton,
  EntryHeader,
  DEFAULT_PAYMENT_METHOD,
  useGetUserPaymentMethodsQuery,
} from "@/feature/shipping";

export const ShippingPaymentMethod = () => {
  const { data, isLoading, isError } = useGetUserPaymentMethodsQuery();

  const [selectedItem, setSelectedItem] = useState(DEFAULT_PAYMENT_METHOD);

  const setSelectedOptionHandler = (option: SelectOption) => {
    const payment = data?.find((payment) => payment.id === option.id);
    if (payment) {
      setSelectedItem(payment);
    }
  };

  if (isLoading) return <>loading</>;
  if (isError) return <>err</>;
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:gap-10 pb-6 border-b border-bo-primary">
      <section className="w-full lg:max-w-100 animate-slide-up">
        <h3 className="text-sm mb-1.5">Select Payment Method</h3>
        <Select
          className="**:text-sm"
          defaultValue={{
            id: DEFAULT_PAYMENT_METHOD.id,
            label: "select payment method",
          }}
        >
          <SelectButton
            maxCharShow="max-w-65"
            onReset={() => setSelectedItem(DEFAULT_PAYMENT_METHOD)}
            className="btn btn--border max-w-full! justify-between px-4"
          />
          <SelectContent className="w-full bg-b-primary border border-bo-primary rounded-lg overflow-hidden mt-1 animate-slide-down">
            {data?.map((item) => (
              <SelectItems
                value={item.brand}
                key={item.id}
                onClick={setSelectedOptionHandler}
                option={{
                  id: item.id,
                  label: item.brand,
                  value: item.last4,
                }}
                className={`flex justify-between items-center h-12 hover:bg-b-secondary cursor-pointer px-4 capitalize ${item.id === selectedItem.id ? "text-blue-400" : ""}`}
              >
                <span className="uppercase">{item.brand}</span>
                <span className="opacity-50">{item.cardNumber.slice(-4)}</span>
              </SelectItems>
            ))}
          </SelectContent>
        </Select>
      </section>
      <EntryCard className="w-full text-tx-primary bg-b-secondary border border-bo-primary animate-slide-up">
        <EntryHeader title="Payment Method" data={selectedItem}>
          <IconButton
            aria-label="Edit payment method"
            disabled={selectedItem.id === "default"}
            className="stroke-st-primary enabled:hover:bg-tx-primary enabled:hover:*:stroke-b-primary disabled:opacity-50"
          />
        </EntryHeader>
        <InfoRow label="Card Number" value={selectedItem.cardNumber} />
        <InfoRow label="Expiration" value={selectedItem.expiry} />
      </EntryCard>
    </div>
  );
};
