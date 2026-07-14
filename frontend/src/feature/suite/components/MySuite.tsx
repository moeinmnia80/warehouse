import {
  MySuiteTab,
  MySuiteTable,
  MySuiteSideBar,
  useGetSuiteQuery,
  useSuiteTabCounts,
} from "@/feature/suite/index";

export const MySuite = () => {
  const { data, isLoading } = useGetSuiteQuery();
  const tabCounts = useSuiteTabCounts(data);
  return (
    <div className="flex flex-col 2xl:flex-row gap-8 animate-slide-up">
      <div className="flex flex-col w-full h-fit bg-b-primary rounded-2xl border border-bo-primary shadow-2xs">
        {/* Tab / My-Suite */}
        <MySuiteTab tabCount={tabCounts} />
        {/* Table / My-Suite */}
        <MySuiteTable data={data} isLoading={isLoading} />
      </div>
      {/* Sidebar */}
      <MySuiteSideBar />
    </div>
  );
};
