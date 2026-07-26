import {
  MySuiteTab,
  MySuiteTable,
  MySuiteSideBar,
} from "@/feature/suite/index";

export const MySuite = () => {
  return (
    <div className="flex flex-col 2xl:flex-row gap-8 animate-slide-up">
      <div className="flex flex-col w-full h-fit bg-b-primary rounded-2xl border border-bo-primary shadow-2xs">
        <MySuiteTab />
        <MySuiteTable />
      </div>
      <MySuiteSideBar />
    </div>
  );
};
