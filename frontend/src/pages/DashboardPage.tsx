import { Outlet } from "react-router";
import { DashboardHeader } from "@/feature/dashboard/index";
const DashboardPage = () => {
  return (
    <>
      <div className="flex flex-col w-full gap-8 py-8">
        <DashboardHeader />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
