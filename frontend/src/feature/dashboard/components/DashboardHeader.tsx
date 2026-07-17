import { useLocation } from "react-router";
import { HistoryIcon } from "@/assets/index";
import { SuiteHeader } from "@/feature/dashboard/index";

export const DashboardHeader = () => {
  const location = useLocation();
  const isShow = location.pathname.includes("shipping");
  return (
    <div className="flex w-full bg-b-primary rounded-2xl p-5 animate-slide-down border border-bo-primary shadow-2xs">
      {!isShow ? (
        <SuiteHeader />
      ) : (
        <>
          <div className="flex items-center gap-5 h-22.5 text-tx-primary">
            <HistoryIcon className="size-8 stroke-tx-primary" />
            <h2 className="text-2xl font-bold">Shipping History</h2>
          </div>
        </>
      )}
    </div>
  );
};
