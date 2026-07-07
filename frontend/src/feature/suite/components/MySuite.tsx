import MySuiteTab from "./MySuiteTab";
import MySuiteTable from "./MySuiteTable";
import { useTable } from "@/shared/hooks/useTable";

const MySuite = () => {
  // central state - filter and sort
  const { filteredData, state, dispatch, toggleAll, allChecked } = useTable();
  return (
    <div className="flex flex-col w-full bg-b-primary rounded-2xl">
      {/* Tab / My-Suite */}
      <MySuiteTab state={state} dispatch={dispatch} />
      {/* Table / My-Suite */}
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
