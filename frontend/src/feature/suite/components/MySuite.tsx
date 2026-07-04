import { useState } from "react";
import { tabs } from "@/feature/suite/index";
import Table from "@/shared/components/ui/Table";
import { Button } from "@/shared/components/ui/Button";

const MySuite = () => {
  const [isActive, setIsActive] = useState("View All");

  const tabHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const value = (event.target as HTMLInputElement).value;
    setIsActive(value);
  };
  return (
    <div className="w-full bg-b-primary rounded-2xl">
      <div
        className="flex gap-2 p-6 
        border-b border-bo-primary"
      >
        {tabs.map((tab) => (
          <Button
            onClick={(event) => tabHandler(event)}
            className={`h-9 btn-third font-semibold transition duration-200
            ${isActive === tab.value && "bg-t-primary text-primary"}`}
            value={tab.value}
            key={tab.id}
          >
            {tab.value}
          </Button>
        ))}
      </div>

      <Table />
    </div>
  );
};

export default MySuite;
