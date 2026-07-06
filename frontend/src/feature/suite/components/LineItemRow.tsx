import DangerIcon from "@/assets/icons/DangerIcon";
import type { LineItem } from "@/feature/suite/index";

// LineItemRow.tsx
type LineItemRowProps = {
  item: LineItem;
  index: number;
};

export const LineItemRow = ({ item, index }: LineItemRowProps) => (
  <div className={index % 2 === 0 ? "bg-b-secondary p-4" : "bg-b-primary p-4"}>
    <div className="flex items-center">
      <div className="w-3/6">
        <h3 className="text-lg text-t-primary font-bold">{item.name}</h3>
        <p className="text-md font-medium text-t-placeholder mt-3">
          Schedule B: {item.scheduleCode} : {item.name}
        </p>
        {item.warning && (
          <p className="flex items-center justify-start gap-2 text-md font-medium text-t-placeholder mt-2">
            <DangerIcon className="size-4 stroke-warning" />
            {item.warning}
          </p>
        )}
      </div>
      <div className="flex w-3/6">
        <div className="w-1/3 flex-1 text-center text-md text-t-primary font-bold">
          {item.qty}
        </div>
        <div className="w-1/3 flex-1 text-center text-md text-t-primary font-bold">
          {item.valuePerUnit.toFixed(2)} USD
        </div>
        <div className="w-1/3 flex-1 text-center text-md text-t-primary font-bold">
          {item.totalValue.toFixed(2)} USD
        </div>
      </div>
    </div>
  </div>
);
