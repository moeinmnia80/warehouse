import { useTable } from "@/shared/hooks/useTable";
import MySuiteTab from "./MySuiteTab";
import MySuiteTable from "./MySuiteTable";
import { RAW_DATA } from "@/shared/constants/table";

const MySuite = () => {
  // central state - filter and sort
  const { filteredData, state, dispatch, toggleAll, allChecked } =
    useTable(RAW_DATA);
  return (
    <div className="flex flex-col w-full xl:max-w-3/4 bg-b-primary rounded-2xl">
      <MySuiteTab state={state} dispatch={dispatch} />
      <MySuiteTable
        filteredData={filteredData}
        state={state}
        dispatch={dispatch}
        toggleAll={toggleAll}
        allChecked={allChecked}
      />
    </div>
  );
};

export default MySuite;
