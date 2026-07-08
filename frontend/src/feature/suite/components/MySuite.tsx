import MySuiteTab from "./MySuiteTab";
import MySuiteTable from "./MySuiteTable";

const MySuite = () => {
  // central state - filter and sort
  return (
    <div className="flex flex-col w-full h-fit bg-b-primary rounded-2xl">
      {/* Tab / My-Suite */}
      <MySuiteTab />
      {/* Table / My-Suite */}
      <MySuiteTable />
    </div>
  );
};

export default MySuite;
