import React from "react";
import { LineItemRow } from "./LineItemRow";
import TickIcon from "@/assets/icons/TickIcon";
import ShowIcon from "@/assets/icons/ShowIcon.tsx";
import DangerIcon from "@/assets/icons/DangerIcon";
import {
  type ReducerProps,
  type TableRow,
  type TableState,
} from "@/shared/hooks/useTable";
import Image from "@/shared/components/ui/Image";
import HiddenIcon from "@/assets/icons/HiddenIcon";
import { lineItems } from "../constants/LineItems";
import SearchIcon from "@/assets/icons/SearchIcon";
import ChevronIcon from "@/assets/icons/ChevronIcon";
import DangerousIcon from "@/assets/icons/DangerousIcon";
import { swiperSlides } from "../constants/swiperSlides";
import { header, styles } from "@/shared/constants/table";
import { Checkbox, Label } from "@/shared/components/ui/Form";
import {
  checkStatus,
  handleRowExpand,
  handleRowToggle,
  handleSortChange,
} from "@/feature/utils/utils";
import {
  Table,
  Row,
  TBody,
  TD,
  THead,
  RowContent,
  RowContentSection,
} from "@/shared/components/ui/Table";
import ImageDropzone from "@/shared/components/ui/ImageDropzone";
import DocumentDropzone from "@/shared/components/ui/DocumentDropzone";

// Import Swiper React components
interface MySuiteTableProps {
  filteredData: TableRow[];
  state: TableState;
  dispatch: React.ActionDispatch<[action: ReducerProps]>;
  toggleAll: () => void;
  allChecked: boolean;
}

// FC
const MySuiteTable = ({
  filteredData,
  state,
  dispatch,
  toggleAll,
  allChecked,
}: MySuiteTableProps) => {
  const statusIcon: Record<string, React.ReactNode> = {
    "in review": <SearchIcon className="size-3 stroke-warning" />,
    "ready to send": <TickIcon className="size-3 stroke-success" />,
    "action required": <DangerIcon className="size-3 stroke-error" />,
  };

  return (
    <div className="rounded-xl m-6 overflow-hidden">
      <Table>
        <THead>
          <Row className="flex items-center bg-b-table border border-b-none border-bo-primary rounded-t-xl">
            <TD className="min-w-10 shrink-0 py-4 px-3 cursor-pointer">
              <Label
                className="flex-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  accentClass="stroke-st-primary"
                  onChange={toggleAll}
                  checked={!!allChecked}
                />
              </Label>
            </TD>
            {header.map((item, index) => (
              <TD
                onClick={(e) => handleSortChange(e, item.key, dispatch)}
                key={item.key}
                className={`flex items-center gap-1 text-md text-t-primary ${styles[index]} cursor-pointer`}
              >
                {item.name}
                {item.sortable && (
                  <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
                    <ChevronIcon
                      className={`size-3 fill-t-secondary ${state.sort.key === item.key ? (state.sort.type === "asc" ? "" : "rotate-180") : "-rotate-90"} transition duration-200`}
                    />
                  </span>
                )}
              </TD>
            ))}
          </Row>
        </THead>
        <TBody>
          {filteredData.map((item, index, arr) => (
            <React.Fragment key={item.packageId}>
              <Row
                className={`flex-center text-md text-t-primary text-left border border-b-0 ${index === 0 ? "border-t-0" : ""} border-bo-primary 
                    ${state.rowExpanded[item.packageId] ? `max-h-100 border-b! rounded-b-xl` : ""} ${index === arr.length - 1 ? "border-b! rounded-b-xl" : ""}
                    
                  `}
              >
                <TD className="min-w-10 shrink-0 py-4 px-3">
                  <Label
                    className="flex-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      accentClass="stroke-st-primary"
                      onChange={(e) =>
                        handleRowToggle(e, item.packageId, dispatch)
                      }
                      checked={!!state.rowChecked[item.packageId]}
                    />
                  </Label>
                </TD>
                <TD className="min-w-30 flex-2 shrink-0 py-4 ">
                  <div className="font-bold">{item.vendor}</div>
                  <div className="font-light">{item.barcode}</div>
                </TD>
                <TD className="min-w-30 flex-2 shrink-0 py-4 text-t-secondary">
                  {item.packageId}
                </TD>
                <TD className="min-w-30 flex-2 shrink-0 py-4 text-t-secondary">
                  {item.dataReceived}
                </TD>
                <TD className="min-w-20 flex-1 shrink-0 py-4 text-t-secondary">
                  <span className="font-bold">{item.itemValues}</span>
                  <div className="">Invoice Value</div>
                </TD>
                <TD className="min-w-20 flex-1 shrink-0 py-4 text-t-secondary text-center">
                  {item.weight}
                </TD>
                <TD
                  className={`flex-center min-w-35 flex-1 shrink-0 py-4 text-t-secondary text-center`}
                >
                  <span
                    className={`flex-center text-sm gap-2 w-fit ${checkStatus(item.status.toLowerCase())} py-0.5 px-2 rounded-full`}
                  >
                    {statusIcon[item.status.toLocaleLowerCase()]}
                    {item.status}
                  </span>
                </TD>
                <TD
                  onClick={() => handleRowExpand(item.packageId, dispatch)}
                  className={
                    "flex-center gap-2 min-w-20 flex-1 shrink-0 py-4 text-t-secondary text-center cursor-pointer"
                  }
                >
                  {state.rowExpanded[item.packageId] ? (
                    <>
                      <span className="text-alert">Close</span>
                      <HiddenIcon className="size-4 stroke-st-primary animate-fade-in" />
                    </>
                  ) : (
                    <>
                      <span>Close</span>
                      <ShowIcon className="size-4 stroke-st-primary animate-fade-in" />
                    </>
                  )}
                </TD>
              </Row>
              <RowContent
                className={`flex flex-col bg-b-table border-bo-primary rounded-xl transition duration-300 max-h-0 opacity-0 ${state.rowExpanded[item.packageId] ? "border max-h-500 my-2 opacity-100" : ""}`}
              >
                {item.status === "In Review" && (
                  <RowContentSection className="p-6 border-b border-bo-primary">
                    <div className="flex items-center gap-3">
                      <h2 className="text-t-primary text-2xl font-bold ">
                        Why is this package in review?
                      </h2>
                      <span className="flex-center gap-2 w-fit bg-warning-50 rounded-full px-2 py-1 text-md font-semibold text-warning">
                        <DangerousIcon className="size-3.5 stroke-warning" />
                        Dangerous Goods
                      </span>
                    </div>
                    <p className="max-w-125 text-lg font-medium text-t-placeholder mt-3">
                      Package is in review by our trade compliance team. Please
                      expect more information via email if it will not be ready
                      to send within 1-2 business days.
                    </p>
                  </RowContentSection>
                )}
                <RowContentSection className="flex flex-col gap-4 p-6 border-b border-bo-primary">
                  <div className="w-full">
                    <div className="flex items-center">
                      <div className="w-3/6">
                        <h3 className="text-lg text-t-primary font-bold">
                          Package Detail
                        </h3>
                        <p className="text-md font-medium text-t-placeholder mt-1">
                          To: {item.details.recipient}
                        </p>
                      </div>
                      <div className="flex w-3/6">
                        <div className="w-1/3 flex-1 text-center text-md text-t-placeholder font-medium">
                          QTY
                        </div>
                        <div className="w-1/3 flex-1 text-center text-md text-t-placeholder font-medium">
                          Value Per Unit (USD)
                        </div>
                        <div className="w-1/3 flex-1 text-center text-md text-t-placeholder font-medium">
                          Total Line Value (USD)
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-bo-primary overflow-hidden">
                    {lineItems.map((li, index) => (
                      <LineItemRow item={li} index={index} />
                    ))}
                  </div>
                  <p className="max-w-190 text-md font-medium text-t-placeholder">
                    ** Values shown are obtained from the merchant invoices,
                    when available. Researched values based on current market
                    prices have been provided above for any items that arrived
                    without invoices. The value should be updated to reflect the
                    actual price paid for each item, and must be confirmed.**
                  </p>
                </RowContentSection>
                <RowContentSection className="relative p-6 border-b border-bo-primary">
                  <h3 className="text-xl text-t-primary font-bold">photos</h3>
                  <ImageDropzone maxFiles={8} maxSizeMb={8}>
                    <div className="relative flex gap-4 w-fit">
                      {swiperSlides.map((item) => (
                        <div
                          key={item.id}
                          className="w-22 h-22 aspect-square rounded-md overflow-hidden"
                        >
                          <Image src={item.src} alt={item.alt} />
                        </div>
                      ))}
                    </div>
                  </ImageDropzone>
                </RowContentSection>
                <RowContentSection className="p-6 border-b border-bo-primary ">
                  <h3 className="text-xl text-t-primary font-bold">
                    Add Documents
                  </h3>
                  <DocumentDropzone />
                </RowContentSection>
              </RowContent>
            </React.Fragment>
          ))}
        </TBody>
      </Table>
    </div>
  );
};

export default MySuiteTable;
