import { useState } from "react";
import { useNavigate } from "react-router";
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
  const [selectedShippingPrice, setSelectedShippingPrice] = useState<number>(0);

  const navigate = useNavigate();

  const formSubmitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // TODO: add real api connection
    console.log(Object.fromEntries(formData));
  };

  const cancelRequestHandler = () => {
    navigate("/dashboard");
  };

  return (
    <div className="p-5 border border-bo-primary rounded-lg mt-5 *:first:mt-0 *:mt-4">
      <h3 className="-mx-5 px-5 pb-5 text-lg font-bold border-b border-bo-primary">
        Shipment Details & Options
      </h3>
      <Form onSubmit={formSubmitHandler}>
        <SidebarSection
          title="shipping method"
          caption="(8.00 lbs)"
          value={`$ ${selectedShippingPrice}`}
        >
          {RenderOptionItems(
            SHIPPING_METHODS,
            FIELD_NAMES.shippingMethod,
            "radio",
            setSelectedShippingPrice,
          )}
        </SidebarSection>
        <SidebarSection
          title="packing options"
          caption="(Based on 8-00 Lbs weight)"
        >
          {RenderOptionItems(
            PACKING_OPTIONS,
            FIELD_NAMES.packingOptions,
            "checkbox",
          )}
        </SidebarSection>
        <SidebarSection title="shipping preferences">
          {RenderOptionItems(
            SHIPPING_PREFERENCES,
            FIELD_NAMES.shippingPreferences,
            "checkbox",
          )}
        </SidebarSection>
        <SidebarSection
          title="export documentation"
          caption="(Based on 8-00 Lbs weight)"
        >
          {RenderOptionItems(
            EXPORT_DOCS,
            FIELD_NAMES.exportDocumentation,
            "radio",
          )}
        </SidebarSection>
        <SidebarSection
          title="national ID"
          caption="Ion Stickers ($0.00)"
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
        <SidebarSection title="Handling Fee" value="$ 10.00" />
        <FormItem className="flex gap-2">
          <Input
            type="text"
            name="coupon"
            placeholder="Apply coupon here ..."
            className="form__input w-full h-12 rounded-lg text-sm"
          />
          <Button
            type="button"
            className="btn--primary flex gap-1 w-fit text-md font-bold px-3"
          >
            <TickIcon className="size-4 stroke-b-primary" />
            Apply
          </Button>
        </FormItem>
        <p className="text-sm bg-b-secondary border border-bo-primary rounded-lg p-4">
          Your default payment method will be charged for this transaction.
        </p>
        <Button type="submit" className="btn btn--primary font-bold h-14">
          <DeliveryIcon className="size-5 stroke-b-primary mr-2" />
          Create Ship Request
        </Button>
      </Form>
      <Button
        type="button"
        onClick={cancelRequestHandler}
        className="btn btn--border bg-b-primary font-bold h-14"
      >
        <CloseIcon className="size-4 fill-st-primary mr-2 border border-st-primary rounded-full p-1" />
        Cancel Request
      </Button>
      <SidebarDetails>
        All items are subject to a customs duty upon receipt of package. Payment
        will be due when your package is delivered.
      </SidebarDetails>
    </div>
  );
};
