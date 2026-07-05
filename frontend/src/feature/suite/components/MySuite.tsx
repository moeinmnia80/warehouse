import React from "react";
import { tabs } from "@/feature/suite/index";
import TickIcon from "@/assets/icons/TickIcon";
import ShowIcon from "@/assets/icons/ShowIcon.tsx";
import DangerIcon from "@/assets/icons/DangerIcon";
import { useTable } from "@/shared/hooks/useTable";
import HiddenIcon from "@/assets/icons/HiddenIcon";
import UploadIcon from "@/assets/icons/UploadIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import ChevronIcon from "@/assets/icons/ChevronIcon";
import { Button } from "@/shared/components/ui/Button";
import DangerousIcon from "@/assets/icons/DangerousIcon";
import { Checkbox, Form, Input, Label } from "@/shared/components/ui/Form";
import { checkStatus, tabStatus } from "@/feature/utils/suite";
import { header, RAW_DATA, styles } from "@/shared/constants/table";
import {
  Table,
  Row,
  TBody,
  TD,
  THead,
  RowContent,
  RowContentSection,
} from "@/shared/components/ui/Table";

const MySuite = () => {
  // central state - automatically filter and sort
  const { filteredData, state, dispatch, toggleAll, allChecked } =
    useTable(RAW_DATA);
  // filter data based on status
  const handleTabChange = (
    value: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    dispatch({ type: "ROW_CATEGORY", payload: value });
  };
  // handle sort
  const handleSortChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string,
  ) => {
    e.stopPropagation();
    dispatch({ type: "ROW_SORT", payload: value });
  };
  // show each row data
  const handleRowExpand = (id: string) => {
    dispatch({ type: "ROW_EXPANDED", payload: id });
  };
  // row checked
  const handleRowToggle = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    e.stopPropagation();
    dispatch({ type: "ROW_TOGGLE", payload: id });
  };

  return (
    <div className="flex flex-col w-full xl:max-w-3/4 bg-b-primary rounded-2xl">
      <div className="grid grid-cols-2 auto-rows-9 lg:grid-cols-3 xl:grid-cols-4 gap-2 py-6 mx-6 overflow-x-auto border-b border-bo-primary">
        {tabs.map((tab) => (
          <Button
            className={`btn btn-third shrink-0 max-w-full lg:shrink h-9 font-semibold transition duration-200
            ${state.category === tab.value ? "bg-t-primary text-b-primary" : ""}`}
            onClick={(e) => handleTabChange(tab.value, e)}
            value={tab.value}
            key={tab.id}
          >
            {tab.value}
            <span className="flex-center w-7.5 h-5.5 ms-2 rounded-full bg-b-primary text-t-primary border border-bo-primary">
              {tabStatus[tab.id]}
            </span>
          </Button>
        ))}
      </div>
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
                  onClick={(e) => handleSortChange(e, item.key)}
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
                  className={`flex-center text-md text-t-primary text-left border border-b-0 
                    ${index === 0 ? "border-t-0" : ""} border-bo-primary 
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
                        onChange={(e) => handleRowToggle(e, item.packageId)}
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
                      {item.status.toLocaleLowerCase() === "in review" && (
                        <SearchIcon className="size-3 stroke-warning" />
                      )}
                      {item.status.toLocaleLowerCase() === "ready to send" && (
                        <TickIcon className="size-3 stroke-success" />
                      )}
                      {item.status.toLocaleLowerCase() ===
                        "action required" && (
                        <DangerIcon className="size-3 stroke-error" />
                      )}
                      {item.status}
                    </span>
                  </TD>
                  <TD
                    onClick={() => handleRowExpand(item.packageId)}
                    className={`flex-center gap-2 min-w-20 flex-1 shrink-0 py-4 text-t-secondary text-center cursor-pointer ${state.rowExpanded[item.packageId] ? "text-alert!" : ""}`}
                  >
                    {state.rowExpanded[item.packageId] ? "Close" : "View"}
                    {state.rowExpanded[item.packageId] ? (
                      <HiddenIcon className="size-4 stroke-st-primary animate-fade-in" />
                    ) : (
                      <ShowIcon className="size-4 stroke-st-primary animate-fade-in" />
                    )}
                  </TD>
                </Row>
                <RowContent
                  className={`flex flex-col bg-b-table border-bo-primary rounded-xl overflow-hidden transition duration-300 max-h-0 opacity-0 ${state.rowExpanded[item.packageId] ? "border max-h-500 my-2 opacity-100" : ""}`}
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
                      <div className="bg-b-secondary p-4">
                        <div className="flex items-center">
                          <div className="w-3/6 ">
                            <h3 className="text-xl text-t-primary font-bold">
                              Greeting Cards Printed
                            </h3>
                            <p className="text-md font-medium text-t-placeholder mt-3">
                              Schedule B: 4909.00.4000 : Greeting Cards Printed
                            </p>
                          </div>
                          <div className="flex w-3/6">
                            <div className="w-1/3 flex-1 text-center text-md text-t-primary font-bold">
                              1
                            </div>
                            <div className="w-1/3 flex-1 text-center text-md text-t-primary font-bold">
                              3.40 USD
                            </div>
                            <div className="w-1/3 flex-1 text-center text-md text-t-primary font-bold">
                              3.40 USD
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-b-primary p-4">
                        <div className="flex items-center">
                          <div className="w-3/6 ">
                            <h3 className="text-xl text-t-primary font-bold">
                              Fishing Reel
                            </h3>
                            <p className="text-md font-medium text-t-placeholder mt-3">
                              Schedule B: 9507.30.5000 : Fishing Reel
                            </p>
                          </div>
                          <div className="flex w-3/6">
                            <div className="w-1/3 flex-1 text-center text-md text-t-primary font-bold">
                              1
                            </div>
                            <div className="w-1/3 flex-1 text-center text-md text-t-primary font-bold">
                              3.40 USD
                            </div>
                            <div className="w-1/3 flex-1 text-center text-md text-t-primary font-bold">
                              3.40 USD
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-b-secondary p-4">
                        <div className="flex items-center">
                          <div className="w-3/6 ">
                            <h3 className="text-xl text-t-primary font-bold">
                              Computer Laptops & Notebooks
                            </h3>
                            <p className="text-md font-medium text-t-placeholder mt-3">
                              Schedule B: 8471.30.0100 : Computer Laptops &
                              Notebooks
                            </p>
                            <p className="flex items-center justify-start gap-2 text-md font-medium text-t-placeholder mt-2">
                              <DangerIcon className="size-4 stroke-warning" />
                              This product contains a lithium battery,
                              additional charges may be required.
                            </p>
                          </div>
                          <div className="flex w-3/6">
                            <div className="w-1/3 flex-1 text-center text-md text-t-primary font-bold">
                              1
                            </div>
                            <div className="w-1/3 flex-1 text-center text-md text-t-primary font-bold">
                              3.40 USD
                            </div>
                            <div className="w-1/3 flex-1 text-center text-md text-t-primary font-bold">
                              3.40 USD
                            </div>
                          </div>
                        </div>
                      </div>
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
                  <RowContentSection className="p-6 border-b border-bo-primary">
                    <h3 className="text-xl text-t-primary font-bold">Photos</h3>
                    <p className="text-md text-t-placeholder font-medium mt-1">
                      Drag and drop or click to add photos.
                    </p>
                    <Form className="gap-0! mt-5">
                      <Button
                        type="submit"
                        className="btn gap-2 w-32.5 h-12  bg-t-primary rounded-lg "
                      >
                        <span className="text-lg font-bold text-b-primary">
                          Upload
                        </span>
                        <UploadIcon className="size-4 stroke-b-primary" />
                      </Button>
                      <Input type="file" />
                    </Form>

                    <div className="w-full"></div>
                  </RowContentSection>
                  <RowContentSection className="p-6 border-b border-bo-primary"></RowContentSection>
                </RowContent>
              </React.Fragment>
            ))}
          </TBody>
        </Table>
      </div>
    </div>
  );
};

export default MySuite;
