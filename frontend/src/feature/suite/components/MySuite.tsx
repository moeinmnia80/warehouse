import { useState } from "react";
import { tabs } from "@/feature/suite/index";
import ShowIcon from "@/assets/icons/ShowIcon.tsx";
import { Button } from "@/shared/components/ui/Button";
import { checkStatus, tabStatus } from "@/feature/utils/suite";
import { header, RAW_DATA, styles } from "@/shared/constants/table";
import { Table, Row, TBody, TD, THead } from "@/shared/components/ui/Table";

const MySuite = () => {
  const [isActive, setIsActive] = useState("View All");
  const [data, setData] = useState(RAW_DATA);

  const handleTab = (
    value: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsActive(value);

    if (value === "View All") {
      setData(RAW_DATA);
    } else {
      const newData = RAW_DATA.filter((item) => item.status === value);
      setData(newData);
    }
  };
  return (
    <div className="flex flex-col w-full xl:max-w-3/4 bg-b-primary rounded-2xl">
      <div className="grid grid-cols-2 auto-rows-9 lg:grid-cols-3 xl:grid-cols-4 gap-2 py-6 mx-6 overflow-x-auto border-b border-bo-primary">
        {tabs.map((tab) => (
          <Button
            onClick={(e) => handleTab(tab.value, e)}
            className={`shrink-0 max-w-full lg:shrink lg:w-full  h-9 btn btn-third font-semibold transition duration-200
            ${isActive === tab.value && "bg-t-primary text-b-primary"}`}
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
      <div className="rounded-xl m-6 border border-bo-primary overflow-hidden">
        <Table>
          <THead>
            <Row
              name="header"
              className="flex items-center bg-b-secondary border-b border-bo-primary"
            >
              {header.map((item, index) => (
                <TD
                  key={index}
                  className={`text-md text-t-primary ${styles[index]}`}
                >
                  {item}
                </TD>
              ))}
            </Row>
          </THead>
          <TBody>
            {data.map((item, index) => (
              <Row
                name={`${index}`}
                className="flex-center text-md text-t-primary text-left border-b border-bo-primary last:border-none"
                key={item.id}
              >
                <TD className="min-w-30 flex-2 shrink-0 py-4 ">
                  <div className="font-bold">{item.vendor}</div>
                  <div className="font-light">{item.barcode}</div>
                </TD>
                <TD className="min-w-30 flex-2 shrink-0 py-4 text-t-secondary">
                  {item.id}
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
                  className={`min-w-40 flex-1 shrink-0 py-4 text-t-secondary text-center`}
                >
                  <span
                    className={`inline-block ${checkStatus(item.status.toLowerCase())} py-1 px-4 rounded-full`}
                  >
                    {item.status}
                  </span>
                </TD>
                <TD className="flex-center gap-2 min-w-20 flex-1 shrink-0 py-4 text-t-secondary text-center">
                  View
                  <ShowIcon className="size-4 stroke-st-primary" />
                </TD>
              </Row>
            ))}
          </TBody>
        </Table>
      </div>
    </div>
  );
};

export default MySuite;
