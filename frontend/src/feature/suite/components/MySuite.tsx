import { tabs } from "@/feature/suite/index";
import ShowIcon from "@/assets/icons/ShowIcon.tsx";
import { Button } from "@/shared/components/ui/Button";
import { checkStatus, tabStatus } from "@/feature/utils/suite";
import { header, RAW_DATA, styles } from "@/shared/constants/table";
import {
  Table,
  Row,
  TBody,
  TD,
  THead,
  RowContent,
} from "@/shared/components/ui/Table";
import { useTable } from "@/shared/hooks/useTable";
import { Checkbox, Label } from "@/shared/components/ui/Form";
import ChevronIcon from "@/assets/icons/ChevronIcon";
import React from "react";

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
            onClick={(e) => handleTabChange(tab.value, e)}
            className={`btn btn-third shrink-0 max-w-full lg:shrink h-9 font-semibold transition duration-200
            ${state.category === tab.value ? "bg-t-primary text-b-primary" : ""}`}
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
            <Row className="flex items-center bg-b-secondary border border-b-none border-bo-primary">
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
            {filteredData.map((item, index, arr) => {
              return (
                <React.Fragment key={item.packageId}>
                  <Row
                    className={`flex-center text-md text-t-primary text-left border border-b-0 
                    ${index === 0 ? "border-t-0" : ""} border-bo-primary 
                    ${state.rowExpanded[item.packageId] ? `max-h-100 border-b! rounded-b-xl` : ``} ${index === arr.length - 1 ? "border-b! rounded-b-xl" : ""}
                    
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
                      {item.itemValues}
                      <div className="">Invoice Value</div>
                    </TD>
                    <TD className="min-w-20 flex-1 shrink-0 py-4 text-t-secondary text-center">
                      {item.weight}
                    </TD>
                    <TD
                      className={`min-w-35 flex-1 shrink-0 py-4 text-t-secondary text-center`}
                    >
                      <span
                        className={`inline-block ${checkStatus(item.status.toLowerCase())} py-1 px-4 rounded-full`}
                      >
                        {item.status}
                      </span>
                    </TD>
                    <TD
                      onClick={() => handleRowExpand(item.packageId)}
                      className="flex-center gap-2 min-w-20 flex-1 shrink-0 py-4 text-t-secondary text-center cursor-pointer"
                    >
                      View
                      <ShowIcon className="size-4 stroke-st-primary" />
                    </TD>
                  </Row>
                  <RowContent
                    className={`flex border-bo-primary rounded-xl overflow-hidden transition duration-300 max-h-0 opacity-0 ${state.rowExpanded[item.packageId] ? "border max-h-200 p-2 my-2 opacity-100" : ""}`}
                  >
                    hello
                  </RowContent>
                </React.Fragment>
              );
            })}
          </TBody>
        </Table>
      </div>
    </div>
  );
};

export default MySuite;
