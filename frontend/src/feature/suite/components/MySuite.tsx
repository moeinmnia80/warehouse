import MySuiteTab from "@/feature/suite/components/MySuiteTab";
import MySuiteTable from "@/feature/suite/components/MySuiteTable";
import MySuiteSideBar from "@/feature/suite/components/MySuiteSideBar";

const MySuite = () => {
  // central state - filter and sort
  return (
    <div className="flex flex-col 2xl:flex-row gap-8 animate-slide-up">
      <div className="flex flex-col w-full h-fit bg-b-primary rounded-2xl">
        {/* Tab / My-Suite */}
        <MySuiteTab />
        {/* Table / My-Suite */}
        <MySuiteTable />
      </div>
      {/* Sidebar */}
      <MySuiteSideBar />
    </div>
  );
};

export default MySuite;
