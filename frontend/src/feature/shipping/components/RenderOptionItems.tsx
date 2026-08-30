import { Label, Radio, Checkbox } from "@/shared";
import type { OptionItem } from "@/feature/shipping";

export const RenderOptionItems = (
  items: OptionItem[],
  name: string,
  type: "radio" | "checkbox",
  onChange?: (price: number) => void,
) =>
  items.map((item) => (
    <Label className="flex-center gap-1 w-fit" key={item.id}>
      {type === "radio" ? (
        <Radio
          accentClass="bg-b-primary size-2"
          className="peer-checked:bg-tx-primary p-0"
          name={name}
          value={item.label}
          onChange={() => onChange?.(item.price ?? 0)}
        />
      ) : (
        <Checkbox
          accentClass="stroke-tx-primary"
          name={name}
          value={item.label}
        />
      )}
      {item.label}
    </Label>
  ));
