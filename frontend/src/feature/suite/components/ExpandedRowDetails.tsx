import { DangerousIcon } from "@/assets/index";
import {
  LineItemRow,
  DropzoneImage,
  DropzoneDocument,
} from "@/feature/suite/index";
import { RowContent, RowContentSection, type TableRow } from "@/shared/index";

interface ExpandedRowDetailsProps {
  item: TableRow;
}

export const ExpandedRowDetails = ({ item }: ExpandedRowDetailsProps) => {
  return (
    <RowContent className="flex flex-col bg-b-table rounded-xl transition duration-300 my-2 animate-fade-in border border-bo-primary">
      {item.status.label === "in review" && (
        <RowContentSection className="p-6 flex flex-col border-b border-bo-primary">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h2 className="text-tx-primary text-xl font-bold">
              Why is this package in review?
            </h2>
            <span className="flex-center gap-2 w-fit bg-warning-50 rounded-full px-2 py-1 text-sm font-semibold text-warning">
              <DangerousIcon className="size-3.5 stroke-warning" />
              Dangerous Goods
            </span>
          </div>
          <p className="max-w-125 text-md font-medium text-tx-placeholder mt-3">
            {item.status.details}
          </p>
        </RowContentSection>
      )}
      <RowContentSection className="flex flex-col gap-4 p-6 text-tx-primary border-b border-bo-primary">
        <div className="w-full">
          <div className="flex items-center">
            <div className="w-3/6">
              <h3 className="text-md font-semibold">Package Detail</h3>
              <p className="text-md font-medium text-tx-placeholder mt-1">
                To: {item.details.recipient}
              </p>
            </div>
            <div className="flex w-3/6">
              <div className="w-1/3 flex-1 text-center text-md text-tx-placeholder font-medium">
                QTY
              </div>
              <div className="w-1/3 flex-1 text-center text-md text-tx-placeholder font-medium">
                Value Per Unit (USD)
              </div>
              <div className="w-1/3 flex-1 text-center text-md text-tx-placeholder font-medium">
                Total Line Value (USD)
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-bo-primary overflow-hidden">
          {item.details.items.map((li, index) => (
            <LineItemRow key={li.id} item={li} index={index} />
          ))}
        </div>
        <p className="max-w-190 text-md font-medium text-tx-placeholder">
          ** Values shown are obtained from the merchant invoices, when
          available. Researched values based on current market prices have been
          provided above for any items that arrived without invoices. The value
          should be updated to reflect the actual price paid for each item, and
          must be confirmed.**
        </p>
      </RowContentSection>

      <RowContentSection className="relative p-6 pr-0 mr-6 md:p-6 md:mr-0 border-b border-bo-primary overflow-auto text-tx-primary">
        <h3 className="text-lg font-bold">photos</h3>
        <DropzoneImage data={item} />
      </RowContentSection>

      <RowContentSection className="p-6 text-tx-primary">
        <h3 className="text-lg font-bold">Add Documents</h3>
        <DropzoneDocument data={item} />
      </RowContentSection>
    </RowContent>
  );
};
