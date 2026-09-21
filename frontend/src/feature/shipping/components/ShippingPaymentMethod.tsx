import { useState } from "react";
import {
  Select,
  SelectItems,
  SelectButton,
  SelectContent,
  InlineSkeleton,
  type SelectOption,
} from "@/shared";
import {
  InfoRow,
  EmptyCard,
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

  if (isError)
    return (
      <div className="grid place-items-center w-full h-dvh">
        sorry somethings went wrong
      </div>
    );

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
            {data?.length ? (
              data?.map((item) => (
                <SelectItems
                  value={item.brand}
                  key={item.id}
                  onClick={setSelectedOptionHandler}
                  option={{
                    id: item.id,
                    label: item.brand,
                    value: item.last4,
                  }}
                  className={`flex-between h-12 hover:bg-b-secondary cursor-pointer px-4 capitalize ${item.id === selectedItem.id ? "text-blue-400" : ""}`}
                >
                  <span className="uppercase">{item.brand}</span>
                  <span className="opacity-50">
                    {item.cardNumber.slice(-4)}
                  </span>
                </SelectItems>
              ))
            ) : (
              <SelectItems
                value=""
                option={{ id: "empty", label: "Add a Card", value: "xxxx" }}
                onClick={() => {}}
                className={`flex-between h-12 px-4 opacity-45 cursor-default`}
              >
                <span className="uppercase">Add a Card</span>
                <span className="opacity-50">xxxx</span>
              </SelectItems>
            )}
          </SelectContent>
        </Select>
      </section>
      {selectedItem.id === "default" ? (
        <EmptyCard
          className="w-full min-h-30 text-tx-primary bg-b-secondary border border-bo-primary animate-slide-up"
          title="Payment Method"
          description="No payment method found. Add your first payment method!"
        />
      ) : (
        <EntryCard className="w-full text-tx-primary bg-b-secondary border border-bo-primary animate-slide-up">
          <EntryHeader title="Payment Method" data={selectedItem}>
            <IconButton
              aria-label="Edit payment method"
              disabled={selectedItem.id === "default"}
              className="stroke-st-primary enabled:hover:bg-tx-primary enabled:hover:*:stroke-b-primary disabled:opacity-50"
            />
          </EntryHeader>
          {isLoading ? (
            <div className="flex flex-col gap-1.5">
              <InlineSkeleton className="h-4 w-60 ml-0" />
              <InlineSkeleton className="h-4 w-36 ml-0" />
            </div>
          ) : (
            <>
              <InfoRow label="Card Number" value={selectedItem.cardNumber} />
              <InfoRow label="Expiration" value={selectedItem.expiry} />
            </>
          )}
        </EntryCard>
      )}
    </div>
  );
};
