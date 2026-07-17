import { DangerIcon } from "@/assets/index";

type LineItemRowProps = {
  item: {
    id: string;
    name: string;
    qty: string;
    valuePerUnit: string;
    notice: string | null;
  };
  index: number;
};

export const LineItemRow = ({ item, index }: LineItemRowProps) => {
  return (
    <div
      className={index % 2 === 0 ? "bg-b-secondary p-4" : "bg-b-primary p-4"}
    >
      <div className="flex flex-col">
        <div className="flex items-center w-full">
          <div className="w-3/6">
            <h3 className="text-md font-bold">{item.name}</h3>
            <p className="text-md text-tx-placeholder mt-3">
              Schedule B: 4555-233-41: {item.name}
            </p>
          </div>
          <div className="flex w-3/6 text-md font-bold">
            <div className="w-1/3 flex-1 text-center">{item.qty}</div>
            <div className="w-1/3 flex-1 text-center">
              {(+item.valuePerUnit).toFixed(2)} USD
            </div>
            <div className="w-1/3 flex-1 text-center">
              {(+item.valuePerUnit * +item.qty).toFixed(2)} USD
            </div>
          </div>
        </div>
        {item.notice && (
          <p className="flex items-center  gap-2 text-md font-medium text-tx-placeholder mt-4">
            <DangerIcon className="shrink-0 size-4 stroke-warning" />
            {item.notice}
          </p>
        )}
      </div>
    </div>
  );
};
