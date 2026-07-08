import { tabs } from "@/feature/suite/constants/tabs";
import { Button } from "@/shared/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store";
import { handleTabChange, tabStatus } from "@/feature/suite/utils/suiteUtils";

const MySuiteTab = () => {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector((state) => state.suite);
  return (
    <div className="grid grid-cols-2 auto-rows-9 lg:grid-cols-3 xl:grid-cols-4 gap-2 py-6 mx-6 border-b border-bo-primary">
      {tabs.map((tab) => (
        <Button
          className={`btn btn-third h-9 font-semibold transition duration-200
            ${category === tab.value ? "bg-t-primary text-b-primary" : ""}`}
          onClick={(e) => handleTabChange(tab.value, e, dispatch)}
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
  );
};

export default MySuiteTab;
