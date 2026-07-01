import { Outlet } from "react-router";
import SideBar from "@/shared/components/SideBar";
import DashboardHeader from "@/feature/dashboard/components/DashboardHeader";
const DashboardPage = () => {
  return (
    <>
      <section className="flex flex-col gap-8 w-full min-h-dvh py-8">
        <DashboardHeader />
        <div className="flex w-full">
          <Outlet />
          <SideBar />
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
