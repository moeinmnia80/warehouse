import { useLocation } from "react-router";
import SuiteHeader from "./SuiteHeader";
import HistoryIcon from "@/assets/icons/HistoryIcon";
import { useAppSelector } from "@/store";

const DashboardHeader = () => {
  const location = useLocation();
  const isShow = location.pathname.includes("shipping");
  const auth = useAppSelector((state) => state.auth);
  console.log(auth);

  return (
    <div className="flex w-full bg-b-primary rounded-2xl p-5 animate-slide-down">
      {!isShow ? (
        <SuiteHeader />
      ) : (
        <>
          <div className="flex items-center gap-5 h-22.5 text-t-primary">
            <HistoryIcon className="size-10 stroke-t-primary" />
            <h2 className="text-3xl font-bold">Shipping History</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHeader;
