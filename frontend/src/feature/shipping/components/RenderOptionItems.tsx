import { Label, Radio, Checkbox } from "@/shared";
import type { OptionItem } from "@/feature/shipping";

export const RenderOptionItems = (
  items: OptionItem[],
  name: string,
  type: "radio" | "checkbox",
  onChange?: (price: number) => void,
) => {
  const selectedPrices = new Map<string, number>();

  const handleChange = (
    item: OptionItem,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!onChange) return;

    if (type === "radio") {
      onChange(item.price ?? 0);
    } else {
      if (e.target.checked) {
        selectedPrices.set(item.id, item.price ?? 0);
      } else {
        selectedPrices.delete(item.id);
      }
      const sum = Array.from(selectedPrices.values()).reduce(
        (acc, curr) => acc + curr,
        0,
      );
      onChange(sum);
    }
  };
  return items.map((item) => (
    <Label className="flex-center gap-1 w-fit" key={item.id}>
      {type === "radio" ? (
        <Radio
          accentClass="bg-b-primary size-2"
          className="peer-checked:bg-tx-primary p-0"
          name={name}
          value={item.label}
          onChange={(e) => handleChange(item, e)}
        />
      ) : (
        <Checkbox
          accentClass="stroke-tx-primary"
          name={name}
          value={item.label}
          onChange={(e) => handleChange(item, e)}
        />
      )}
      {item.label}
    </Label>
  ));
};
