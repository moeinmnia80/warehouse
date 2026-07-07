import React from "react";
import TickIcon from "@/assets/icons/TickIcon";
import ShowIcon from "@/assets/icons/ShowIcon.tsx";
import DangerIcon from "@/assets/icons/DangerIcon";
import {
  type ReducerProps,
  type TableRow,
  type TableState,
} from "@/shared/hooks/useTable";
import Image from "@/shared/components/ui/Image";
import { COLUMNS } from "@/shared/constants/table";
import HiddenIcon from "@/assets/icons/HiddenIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import UploadIcon from "@/assets/icons/UploadIcon";
import ChevronIcon from "@/assets/icons/ChevronIcon";
import DangerousIcon from "@/assets/icons/DangerousIcon";
import { swiperSlides } from "../constants/swiperSlides";
import { Checkbox, Label } from "@/shared/components/ui/Form";
import { lineItems } from "@/feature/suite/constants/lineItem";
import { ImageDropzone } from "@/shared/components/ImageDropzone";
import DocumentDropzone from "@/shared/components/DocumentDropzone";
import { LineItemRow } from "@/feature/suite/components/LineItemRow";
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

interface MySuiteTableProps {
  filteredData: TableRow[];
  state: TableState;
  dispatch: React.ActionDispatch<[action: ReducerProps]>;
  toggleAll: () => void;
  allChecked: boolean;
}

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
  const handleAction = (id: string) => {
    if (state.category === "Action Required") {
      handleRowExpand(id, dispatch);
    }
  };

  const isVisible = (key: string) =>
    COLUMNS.find(
      (item) => item.key === key && item.tabs.includes(state.category),
    );
  return (
    <div className="rounded-xl m-6 overflow-hidden">
      <Table>
        <THead>
          <Row className="flex items-center bg-b-table border border-b-none border-bo-primary rounded-t-xl text-t-primary">
            <TD className="min-w-10 py-4 px-3">
              <Label className="" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  accentClass="stroke-st-primary"
                  onChange={toggleAll}
                  checked={!!allChecked}
                />
              </Label>
            </TD>
            {COLUMNS.map((item) => (
              <TD
                key={item.key}
                onClick={(e) => handleSortChange(e, item.key, dispatch)}
                className={`flex items-center gap-1 text-md text-current cursor-pointer px-2 ${isVisible(item.key) ? "" : "hidden"} ${item.className}`}
              >
                {item.name}
                {item.sortable && (
                  <ChevronIcon
                    className={`size-3 fill-t-secondary ${state.sort.key === item.key ? (state.sort.type === "asc" ? "" : "rotate-180") : "-rotate-90"} transition duration-200`}
                  />
                )}
              </TD>
            ))}
          </Row>
        </THead>
        <TBody>
          {filteredData.map((item) => (
            <React.Fragment key={item.packageId}>
              <Row
                className={`flex-center text-left border border-b-0  border-bo-primary ${state.rowExpanded[item.packageId] ? `max-h-18 border-b! rounded-b-xl` : ""} first:border-t-0! last:border-b! last:rounded-b-xl! text-t-secondary text-md *:py-4 *:px-2 *:shrink-0`}
              >
                <TD className="min-w-10">
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
                <TD className="min-w-30 flex-2 text-current">
                  <div className="font-bold text-t-primary">{item.vendor}</div>
                  <div className="font-light">{item.barcode}</div>
                </TD>
                <TD className="min-w-25 flex-2 text-current">
                  {item.packageId}
                </TD>
                <TD className="min-w-20 flex-2 text-current">
                  {item.dataReceived}
                </TD>
                {isVisible("totalValues") && (
                  <TD className="min-w-20 flex-1 text-current">
                    <span className="font-bold">{item.totalValues}</span>
                  </TD>
                )}
                {isVisible("itemValues") && (
                  <TD className="min-w-20 flex-1 text-current">
                    <span className="font-bold">{item.itemValues}</span>
                    <div className="">Invoice Value</div>
                  </TD>
                )}
                {isVisible("weight") && (
                  <TD className="min-w-20 flex-1 text-current text-center">
                    {item.weight}
                  </TD>
                )}
                {isVisible("status") && (
                  <TD
                    className={`flex-center min-w-30 flex-2 text-current text-center ${state.category === "Action Required" ? "flex-2" : ""}`}
                  >
                    {state.category === "Action Required" ? (
                      <div className="flex flex-col gap-1">
                        <span className="tag text-error bg-error-50  ">
                          {statusIcon[item.status.label.toLocaleLowerCase()]}
                          {item.status.details}
                        </span>
                        <span className="text-xs">As required by Customs</span>
                      </div>
                    ) : (
                      <div
                        className={`tag text-sm ${checkStatus(item.status.label.toLowerCase())}`}
                      >
                        {statusIcon[item.status.label.toLocaleLowerCase()]}
                        {item.status.label}
                      </div>
                    )}
                  </TD>
                )}
                <TD
                  onClick={() => handleAction(item.packageId)}
                  className={`flex-center gap-2 min-w-25 flex-1 shrink-0 py-4 text-t-secondary text-center cursor-pointer`}
                >
                  {state.category === "Action Required" ? (
                    <>
                      <p>Upload Invoice</p>
                      <UploadIcon className="size-4 stroke-st-primary" />
                    </>
                  ) : state.rowExpanded[item.packageId] ? (
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
              {state.rowExpanded[item.packageId] && (
                <RowContent
                  className={`flex flex-col bg-b-table border-bo-primary rounded-xl transition duration-300 my-2 animate-fade-in`}
                >
                  {item.status.label === "In Review" && (
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
                        Package is in review by our trade compliance team.
                        Please expect more information via email if it will not
                        be ready to send within 1-2 business days.
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
                        <LineItemRow key={li.id} item={li} index={index} />
                      ))}
                    </div>
                    <p className="max-w-190 text-md font-medium text-t-placeholder">
                      ** Values shown are obtained from the merchant invoices,
                      when available. Researched values based on current market
                      prices have been provided above for any items that arrived
                      without invoices. The value should be updated to reflect
                      the actual price paid for each item, and must be
                      confirmed.**
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
              )}
            </React.Fragment>
          ))}
        </TBody>
      </Table>
      {/* <div
        ref={actionModal}
        className="fixed inset-0 z-10 h-svh grid place-items-center bg-b-transparent backdrop-blur-sm px-15"
      >
        <div className="w-svw max-w-200 bg-b-primary rounded-xl">
          <div className="p-5 border-b border-bo-primary">
            <div className="flex-between ">
              <h3 className="text-t-primary font-bold text-2xl">
                Add Invoices
              </h3>
              <Button className="btn text-t-primary w-11 h-11">x</Button>
            </div>
            <p className="text-t-placeholder text-lg mt-2">
              You can add multiple invoices.
            </p>
          </div>
          <div className="p-5  border-b border-bo-primary">
            <DocumentDropzone />
          </div>
          <form className="p-5">
            <input
              type="file"
              aria-label="form"
              className="btn max-w-full text-bold bg-t-primary rounded-md"
            />
          </form>
        </div>
      </div> */}
    </div>
  );
};

export default MySuiteTable;
