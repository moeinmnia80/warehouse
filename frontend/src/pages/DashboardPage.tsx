import { Outlet } from "react-router";
import SideBar from "@/shared/components/SideBar";
import DashboardHeader from "@/feature/dashboard/components/DashboardHeader";
const DashboardPage = () => {
  return (
    <>
      <section className="flex flex-col w-full gap-8 py-8">
        <DashboardHeader />
        <div className="flex flex-col 2xl:flex-row gap-8 animate-slide-up">
          <Outlet />
          <SideBar />
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
