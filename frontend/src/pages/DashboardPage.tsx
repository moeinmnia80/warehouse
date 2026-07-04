import { Outlet } from "react-router";
import SideBar from "@/shared/components/SideBar";
import DashboardHeader from "@/feature/dashboard/components/DashboardHeader";
const DashboardPage = () => {
  return (
    <>
      <section className="flex flex-col gap-8 w-full min-h-dvh py-8">
        <DashboardHeader />
        <div className="flex flex-col xl:flex-row gap-8 w-full animate-slide-up ">
          <Outlet />
          <SideBar />
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
