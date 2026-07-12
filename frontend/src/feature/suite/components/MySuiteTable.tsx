import React from "react";
import TickIcon from "@/assets/icons/TickIcon";
import Image from "@/shared/components/ui/Image";
import ShowIcon from "@/assets/icons/ShowIcon.tsx";
import DangerIcon from "@/assets/icons/DangerIcon";
import { COLUMNS } from "@/shared/constants/table";
import HiddenIcon from "@/assets/icons/HiddenIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import UploadIcon from "@/assets/icons/UploadIcon";
import ChevronIcon from "@/assets/icons/ChevronIcon";
import { useAppDispatch, useAppSelector } from "@/store";
import DangerousIcon from "@/assets/icons/DangerousIcon";
import { swiperSlides } from "../constants/swiperSlides";
import { Checkbox, Label } from "@/shared/components/ui/Form";
import { lineItems } from "@/feature/suite/constants/lineItem";
import { ImageDropzone } from "@/shared/components/ImageDropzone";
import InvoiceModal from "@/feature/suite/components/InvoiceModal";
import DocumentDropzone from "@/shared/components/DocumentDropzone";
import { LineItemRow } from "@/feature/suite/components/LineItemRow";
import TableSkeleton from "@/feature/suite/components/TableSkeleton";
import { selectSortedData } from "@/feature/suite/hooks/suiteSelector";
import {
  Table,
  Row,
  TBody,
  TD,
  THead,
  RowContent,
  RowContentSection,
} from "@/shared/components/ui/Table";
import {
  allChecked,
  checkStatus,
  handleAction,
  handleCloseModal,
  handleRowToggle,
  handleSortChange,
  isVisible,
  toggleAll,
} from "@/feature/suite/utils/suiteUtils";

const MySuiteTable = () => {
  const dispatch = useAppDispatch();
  const { category, modal, sort, rowExpanded, rowChecked } = useAppSelector(
    (state) => state.suite,
  );
  const sortedData = useAppSelector(selectSortedData);
  // set correct tag in status column body
  const statusIcon: Record<string, React.ReactNode> = {
    "in review": <SearchIcon className="size-3 stroke-warning" />,
    "ready to send": <TickIcon className="size-3 stroke-success" />,
    "action required": <DangerIcon className="size-3 stroke-error" />,
  };
  if (!sortedData.length)
    return <TableSkeleton columns={[10, 30, 30, 25, 20, 20]} rows={3} />;

  return (
    <div className={`rounded-xl m-6 overflow-hidden`}>
      <Table>
        <THead>
          <Row className="hidden md:flex items-center bg-b-table border border-b-none border-bo-primary rounded-t-xl text-t-primary">
            <TD className="min-w-10 py-4 px-3">
              <Label className="" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  accentClass="stroke-st-primary"
                  onChange={() => toggleAll(dispatch, sortedData, rowChecked)}
                  checked={allChecked(sortedData, rowChecked)}
                />
              </Label>
            </TD>
            {COLUMNS.map((item) => (
              <TD
                key={item.key}
                onClick={(e) => handleSortChange(e, item.key, dispatch)}
                className={`flex items-center gap-1 text-md text-current cursor-pointer px-2 ${isVisible(item.key, category) ? "" : "hidden"} ${item.className}`}
              >
                {item.name}
                {item.sortable && (
                  <ChevronIcon
                    className={`size-3 fill-t-secondary ${sort.key === item.key ? (sort.type === "asc" ? "" : "rotate-180") : "-rotate-90"} transition duration-200`}
                  />
                )}
              </TD>
            ))}
          </Row>
        </THead>
        <TBody>
          {sortedData.map((item) => (
            <React.Fragment key={item.packageId}>
              <Row
                className={`
                  flex flex-col md:flex-center md:flex-row 
                  mb-4 last:mb-0 md:mb-0 rounded-xl md:rounded-none 
                  text-t-secondary text-md text-left 
                  border border-bo-primary  md:border-b-0  
                  md:first:border-t-0! md:last:border-b! md:last:rounded-b-xl!  md:*:py-4
                  ${rowExpanded[item.packageId] ? `md:max-h-18 border-b! rounded-b-xl` : ""}  md:*:px-2 md:*:shrink-0 overflow-auto`}
              >
                <TD className="hidden md:flex md:items-center md:min-w-10 px-3!">
                  <Label
                    className="flex-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      accentClass="stroke-st-primary"
                      onChange={(e) =>
                        handleRowToggle(e, item.packageId, dispatch)
                      }
                      checked={!!rowChecked[item.packageId]}
                    />
                  </Label>
                </TD>
                <TD
                  className="flex md:min-w-30 md:flex-2 text-current"
                  dataCell="Barcode - vendor"
                >
                  <div className="flex-center flex-col md:items-start! w-full">
                    <div className="font-bold text-t-primary">
                      {item.vendor}
                    </div>
                    <div className="font-light">{item.barcode}</div>
                  </div>
                </TD>
                <TD
                  className="flex md:min-w-25 md:flex-2 text-current"
                  dataCell="PackageId"
                >
                  <div className="flex-center flex-col md:items-start! w-full">
                    {item.packageId}
                  </div>
                </TD>
                <TD
                  className="flex md:min-w-20 md:flex-2 text-current"
                  dataCell="Data Received"
                >
                  <div className="flex-center flex-col md:items-start! w-full">
                    {item.dataReceived}
                  </div>
                </TD>
                {isVisible("totalValues", category) && (
                  <TD
                    className="flex md:min-w-20 md:flex-1 text-current"
                    dataCell="Total Values"
                  >
                    <div className="flex-center flex-col md:items-start! w-full">
                      <span className="mr-0.5">$</span>
                      <span className="font-bold">{item.totalValues}</span>
                    </div>
                  </TD>
                )}
                {isVisible("itemValues", category) && (
                  <TD
                    className="flex md:min-w-20 md:flex-1 text-current"
                    dataCell="Item Values"
                  >
                    <div className="flex-center flex-col md:items-start! w-full">
                      <div className="flex-center">
                        <span className="mr-0.5">$</span>
                        <span className="font-bold">{item.itemValues}</span>
                      </div>
                      <div className="">Invoice Value</div>
                    </div>
                  </TD>
                )}
                {isVisible("weight", category) && (
                  <TD
                    className="flex md:min-w-20 md:flex-1 text-current md:text-center"
                    dataCell="Weight"
                  >
                    <div className="flex-center flex-col w-full">
                      {item.weight}
                      <span className="ml-1">Ibs</span>
                    </div>
                  </TD>
                )}
                {isVisible("status", category) && (
                  <TD
                    className={`flex md:flex-center md:min-w-30 md:flex-2 text-current md:text-center ${category === "Action Required" ? "md:flex-2" : ""}`}
                    dataCell="status"
                  >
                    <div className="flex-center flex-col w-full">
                      {category === "Action Required" ? (
                        <div className="flex flex-col gap-1">
                          <span className="tag text-sm text-error bg-error-50  ">
                            <DangerIcon className="size-3 stroke-error" />
                            {item.status.details}
                          </span>
                          <span className="text-xs">
                            As required by Customs
                          </span>
                        </div>
                      ) : (
                        <div
                          className={`tag text-sm ${checkStatus(item.status.label.toLowerCase())}`}
                        >
                          {statusIcon[item.status.label.toLocaleLowerCase()]}
                          {item.status.label}
                        </div>
                      )}
                    </div>
                  </TD>
                )}
                <TD
                  onClick={() =>
                    handleAction(item.packageId, category, dispatch)
                  }
                  className={`flex md:flex-center! md:gap-2 md:min-w-25 md:flex-1 md:shrink-0 md:py-4 text-t-secondary md:text-center cursor-pointer`}
                  dataCell="action"
                >
                  <div className="flex-center flex-col w-full">
                    {category === "Action Required" ? (
                      <>
                        <p>Upload Invoice</p>
                        <UploadIcon className="size-4 stroke-st-primary" />
                      </>
                    ) : rowExpanded[item.packageId] ? (
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
                  </div>
                </TD>
              </Row>
              {rowExpanded[item.packageId] && (
                <RowContent
                  className={`flex flex-col bg-b-table border-bo-primary rounded-xl transition duration-300 my-2 animate-fade-in`}
                >
                  {item.status.label === "In Review" && (
                    <RowContentSection className="p-6 flex flex-col border-b border-bo-primary">
                      <div className="flex flex-col md:flex-row md:items-center gap-3">
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
                    {category === "Ready to Send" ? (
                      <>
                        <LineItemRow
                          item={{
                            id: "0",
                            name: "Maps, charts, atlases: Printed: NESOI",
                            qty: 10,
                            scheduleCode:
                              "4905.90.6000 : Maps, charts, atlases: Printed: NESOI",
                            valuePerUnit: 2.39,
                            totalValue: 23.9,
                          }}
                          index={0}
                        />
                      </>
                    ) : (
                      <>
                        <div className="rounded-xl border border-bo-primary overflow-hidden">
                          {lineItems.map((li, index) => (
                            <LineItemRow key={li.id} item={li} index={index} />
                          ))}
                        </div>
                      </>
                    )}
                    <p className="max-w-190 text-md font-medium text-t-placeholder">
                      ** Values shown are obtained from the merchant invoices,
                      when available. Researched values based on current market
                      prices have been provided above for any items that arrived
                      without invoices. The value should be updated to reflect
                      the actual price paid for each item, and must be
                      confirmed.**
                    </p>
                  </RowContentSection>
                  <RowContentSection className="relative p-6 pr-0 mr-6 md:p-6 md:mr-0 border-b border-bo-primary overflow-auto">
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
                  <RowContentSection className="p-6">
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
        {modal.open && (
          <InvoiceModal handleCloseModal={() => handleCloseModal(dispatch)} />
        )}
      </Table>
    </div>
  );
};

export default MySuiteTable;
