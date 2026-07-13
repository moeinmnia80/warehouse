import { DangerIcon } from "@/assets/index";
import type { LineItem } from "@/feature/suite/index";

type LineItemRowProps = {
  item: LineItem;
  index: number;
};

export const LineItemRow = ({ item, index }: LineItemRowProps) => (
  <div className={index % 2 === 0 ? "bg-b-secondary p-4" : "bg-b-primary p-4"}>
    <div className="flex flex-col">
      <div className="flex items-center w-full">
        <div className="w-3/6">
          <h3 className="text-lg text-t-primary font-bold">{item.name}</h3>
          <p className="text-md font-medium text-t-placeholder mt-3">
            Schedule B: {item.scheduleCode} : {item.name}
          </p>
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
      {item.warning && (
        <p className="flex items-center  gap-2 text-md font-medium text-t-placeholder mt-4">
          <DangerIcon className="shrink-0 size-4 stroke-warning" />
          {item.warning}
        </p>
      )}
    </div>
  </div>
);
