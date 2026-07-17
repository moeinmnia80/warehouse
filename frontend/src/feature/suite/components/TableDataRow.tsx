import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/redux/store";
import {
  TickIcon,
  ShowIcon,
  DangerIcon,
  HiddenIcon,
  SearchIcon,
  UploadIcon,
  PdfIcon,
} from "@/assets/index";
import { TD, Row, Label, Checkbox, type TableRow } from "@/shared/index";
import {
  isVisible,
  checkStatus,
  handleAction,
  SUITE_CATEGORY,
  handleRowToggle,
  ExpandedRowDetails,
} from "@/feature/suite/index";

// Static — built once at module load, not on every render.
const STATUS_ICON: Record<string, React.ReactNode> = {
  "in review": <SearchIcon className="size-3 stroke-warning" />,
  "ready to send": <TickIcon className="size-3 stroke-success" />,
  "action required": <DangerIcon className="size-3 stroke-error" />,
};

interface TableDataRowProps {
  item: TableRow;
}

export const TableDataRow = ({ item }: TableDataRowProps) => {
  const dispatch = useAppDispatch();
  const { category, rowExpanded, rowChecked } = useAppSelector(
    (state) => state.suite,
  );
  const isExpanded = !!rowExpanded[item.packageId];
  const isChecked = !!rowChecked[item.packageId];

  return (
    <React.Fragment>
      <Row
        className={`
          flex flex-col md:flex-center md:flex-row
          mb-4 last:mb-0 md:mb-0 rounded-xl md:rounded-none
          text-tx-secondary text-sm text-left
          border border-bo-primary md:border-b-0
          md:first:border-t-0! md:last:border-b! md:last:rounded-b-xl! md:*:py-4
          ${isExpanded ? "md:max-h-18 border-b! rounded-b-xl" : ""} md:*:px-2 md:*:shrink-0 overflow-auto`}
      >
        <TD className="hidden md:flex md:items-center md:min-w-10 px-3!">
          <Label
            className="flex-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              accentClass="stroke-st-primary"
              onChange={(e) => handleRowToggle(e, item.packageId, dispatch)}
              checked={isChecked}
            />
          </Label>
        </TD>
        <TD
          className="flex md:min-w-30 md:flex-2 text-current"
          dataCell="Vendor - Barcode"
        >
          <div className="flex-center flex-col md:items-start! w-full">
            <div className="font-bold text-tx-primary">{item.vendor}</div>
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
            <div className="flex-center flex-col md:flex-row md:justify-start! w-full">
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
              <div>Invoice Value</div>
            </div>
          </TD>
        )}
        {isVisible("weight", category) && (
          <TD
            className="flex md:min-w-20 md:flex-1 text-current md:text-center"
            dataCell="Weight"
          >
            <div className="flex-center w-full">
              {item.weight}
              <span className="ml-1">Ibs</span>
            </div>
          </TD>
        )}
        {isVisible("status", category) && (
          <TD
            className={`flex md:flex-center md:min-w-30 md:flex-2 text-current md:text-center ${category === SUITE_CATEGORY.ACTION_REQUIRED ? "md:flex-2" : ""}`}
            dataCell="status"
          >
            <div className="flex-center flex-col w-full">
              {category === SUITE_CATEGORY.ACTION_REQUIRED ? (
                <div className="flex flex-col gap-1">
                  <span className="tag text-sm text-error bg-error-50">
                    <DangerIcon className="size-3 stroke-error" />
                    {item.status.details}
                  </span>
                  <span className="text-xs">As required by Customs</span>
                </div>
              ) : (
                <div
                  className={`tag text-sm ${checkStatus(item.status.label.toLowerCase())}`}
                >
                  {STATUS_ICON[item.status.label.toLowerCase()]}
                  {item.status.label}
                </div>
              )}
            </div>
          </TD>
        )}
        <TD
          onClick={() => handleAction(item.packageId, category, dispatch)}
          className="flex md:flex-center! md:gap-2 md:min-w-25 md:flex-1 md:shrink-0 md:py-4 text-t-secondary md:text-center cursor-pointer"
          dataCell="action"
        >
          <div className="flex-center gap-1 w-full">
            {category === SUITE_CATEGORY.ACTION_REQUIRED ? (
              <>
                {item.invoices.map((i) => (
                  <div title={i.name} key={i.id} className="">
                    <PdfIcon className="size-5 stroke-st-primary" />
                  </div>
                ))}
                {!item.invoices.length && <p>Upload Invoice</p>}
                <UploadIcon className="size-4 stroke-st-primary" />
              </>
            ) : isExpanded ? (
              <>
                <span className="text-alert">Close</span>
                <HiddenIcon className="size-4 stroke-st-primary animate-fade-in" />
              </>
            ) : (
              <>
                <span>View</span>
                <ShowIcon className="size-4 stroke-st-primary animate-fade-in" />
              </>
            )}
          </div>
        </TD>
      </Row>

      {isExpanded && <ExpandedRowDetails item={item} />}
    </React.Fragment>
  );
};
