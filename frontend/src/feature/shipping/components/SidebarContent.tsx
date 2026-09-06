import { useState } from "react";
import { InfoIcon } from "lucide-react";
import { useNavigate } from "react-router";

import { formatCurrency } from "@/feature/suite";
import { Form, Input, Button, FormItem } from "@/shared";
import { CloseIcon, DeliveryIcon, TickIcon } from "@/assets";

import {
  FIELD_NAMES,
  EXPORT_DOCS,
  SidebarDetails,
  SidebarSection,
  PACKING_OPTIONS,
  SHIPPING_METHODS,
  RenderOptionItems,
  SHIPPING_PREFERENCES,
} from "@/feature/shipping";

export const SidebarContent = () => {
  const [sectionPrices, setSectionPrices] = useState<{
    [key: string]: number;
  }>({
    shippingMethod: 0,
    packingOptions: 0,
    shippingPreferences: 0,
    exportDocumentation: 0,
  });

  const [coupon, setCoupon] = useState("");
  const navigate = useNavigate();

  const handlePriceChange = (sectionKey: string, price: number) => {
    setSectionPrices((prev) => ({
      ...prev,
      [sectionKey]: price,
    }));
  };

  const formSubmitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData));
    // TODO: get a number (price) and card payment Id send for pay
  };

  const cancelRequestHandler = () => {
    navigate("/dashboard");
  };

  const subtotal =
    Object.values(sectionPrices).reduce((acc, curr) => acc + curr, 0) + 10;

  return (
    <div className="p-5 border border-bo-primary rounded-lg mt-5 *:first:mt-0 *:mt-4">
      <h3 className="-mx-5 px-5 pb-5 text-lg font-bold border-b border-bo-primary">
        Shipment Details & Options
      </h3>
      <Form onSubmit={formSubmitHandler}>
        <SidebarSection
          title="shipping method"
          caption="(8.00 lbs)"
          value={formatCurrency(sectionPrices.shippingMethod)}
        >
          {RenderOptionItems(
            SHIPPING_METHODS,
            FIELD_NAMES.shippingMethod,
            "radio",
            (price) => handlePriceChange("shippingMethod", price),
          )}
        </SidebarSection>

        <SidebarSection
          title="packing options"
          caption="(Based on 8-00 Lbs weight)"
          value={formatCurrency(sectionPrices.packingOptions)}
        >
          {RenderOptionItems(
            PACKING_OPTIONS,
            FIELD_NAMES.packingOptions,
            "checkbox",
            (price) => handlePriceChange("packingOptions", price),
          )}
        </SidebarSection>

        <SidebarSection
          title="shipping preferences"
          value={formatCurrency(sectionPrices.shippingPreferences)}
        >
          {RenderOptionItems(
            SHIPPING_PREFERENCES,
            FIELD_NAMES.shippingPreferences,
            "checkbox",
            (price) => handlePriceChange("shippingPreferences", price),
          )}
        </SidebarSection>

        <SidebarSection
          title="export documentation"
          caption="(Based on 8-00 Lbs weight)"
          value={formatCurrency(sectionPrices.exportDocumentation)}
        >
          {RenderOptionItems(
            EXPORT_DOCS,
            FIELD_NAMES.exportDocumentation,
            "radio",
            (price) => handlePriceChange("exportDocumentation", price),
          )}
        </SidebarSection>

        <SidebarSection
          title="national ID"
          caption="Ion Stickers ($ 0.00)"
          value={
            <Button
              type="button"
              className="w-fit h-fit underline text-sm font-bold"
              onClick={() => {}}
            >
              Add ID
            </Button>
          }
        />

        <SidebarSection title="Handling Fee" value={formatCurrency(10)} />

        <SidebarSection title="Subtotal" value={formatCurrency(subtotal)}>
          <div className="flex-between">
            <div className="flex-center gap-1.5 capitalize">
              package level charger
              <InfoIcon className="size-3 stroke-st-primary" />
            </div>
            <div>{formatCurrency(0)}</div>
          </div>
          <div className="flex-between capitalize font-bold">
            estimated shipping:
            <span>{formatCurrency(subtotal - 0)}</span>
          </div>
        </SidebarSection>

        <FormItem className="flex gap-2">
          <Input
            type="text"
            name="coupon"
            placeholder="Apply coupon here ..."
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="form__input w-full h-12 rounded-lg text-sm"
          />
          <Button
            type="button"
            disabled={!coupon}
            className="btn--primary flex gap-1 w-fit text-md font-bold px-3 disabled:opacity-40 disabled:cursor-default"
          >
            <TickIcon className="size-4 stroke-b-primary" />
            Apply
          </Button>
        </FormItem>

        <p className="text-sm bg-b-secondary border border-bo-primary rounded-lg p-4">
          Your default payment method will be charged for this transaction.
        </p>

        <Button
          type="submit"
          className="btn btn--primary max-w-full font-bold h-14 enabled:hover:opacity-40 transition duration-200"
        >
          <DeliveryIcon className="size-5 stroke-b-primary mr-2" />
          Create Ship Request
        </Button>
      </Form>

      <Button
        type="button"
        onClick={cancelRequestHandler}
        className="btn btn--border max-w-full bg-b-primary font-bold h-14 enabled:hover:border-error enabled:hover:text-error group transition duration-200"
      >
        <CloseIcon className="size-4 fill-st-primary mr-2 border border-st-primary rounded-full p-1 group-hover:fill-error group-hover:border-error transition duration-200" />
        Cancel Request
      </Button>

      <SidebarDetails>
        All items are subject to a customs duty upon receipt of package. Payment
        will be due when your package is delivered.
      </SidebarDetails>
    </div>
  );
};
