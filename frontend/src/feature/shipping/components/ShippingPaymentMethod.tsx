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
  MOCK_PAYMENT_METHODS,
  type PaymentMethodsType,
} from "@/feature/shipping";

const defaultPaymentMethod = MOCK_PAYMENT_METHODS.find(
  (item) => item.isDefault,
) as PaymentMethodsType;

export const ShippingPaymentMethod = () => {
  const [selectedItem, setSelectedItem] = useState(defaultPaymentMethod);

  const setSelectedOptionHandler = (option: SelectOption) => {
    const payment = MOCK_PAYMENT_METHODS.find(
      (payment) => payment.id === option.id,
    );
    if (payment) {
      setSelectedItem(payment);
    }
  };

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:gap-10 pb-6 border-b border-bo-primary">
      <section
        className="w-full lg:max-w-100 animate-slide-up"
        aria-labelledby="select-title"
      >
        <h3 id="select-title" className="text-sm mb-1.5">
          Select Payment Method
        </h3>
        <Select
          className="**:text-sm"
          defaultValue={{
            id: defaultPaymentMethod.id,
            label: defaultPaymentMethod.brand,
            value: defaultPaymentMethod.last4,
          }}
        >
          <SelectButton
            onReset={() => setSelectedItem(defaultPaymentMethod)}
            className="btn btn--border max-w-full! justify-between px-4"
          />
          <SelectContent className="w-full bg-b-primary border border-bo-primary rounded-lg overflow-hidden mt-1 animate-slide-down">
            {MOCK_PAYMENT_METHODS.map((item) => (
              <SelectItems
                value={item.brand}
                key={item.id}
                onClick={setSelectedOptionHandler}
                option={{ id: item.id, label: item.brand, value: item.last4 }}
                className={`flex justify-between items-center h-12 hover:bg-b-secondary cursor-pointer px-4 capitalize ${item.id === selectedItem.id ? "text-blue-400" : ""}`}
              >
                <span className="uppercase">{item.brand}</span>
                <span className="opacity-50">{item.last4}</span>
              </SelectItems>
            ))}
          </SelectContent>
        </Select>
      </section>
      <div className="w-full">
        {selectedItem && (
          <EntryCard className="text-tx-primary bg-b-secondary border border-bo-primary animate-slide-up">
            <EntryHeader title="Payment Method" data={selectedItem}>
              <IconButton
                aria-label="Edit payment method"
                className="stroke-st-primary hover:bg-tx-primary hover:*:stroke-b-primary"
              />
            </EntryHeader>
            <InfoRow
              label="Card Number"
              value={`1234 **** **** ${selectedItem.last4}`}
            />
            <InfoRow label="Expiration" value={selectedItem.expiry} />
          </EntryCard>
        )}
      </div>
    </div>
  );
};
