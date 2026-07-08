import { Outlet } from "react-router";
import DashboardHeader from "@/feature/dashboard/components/DashboardHeader";
const DashboardPage = () => {
  return (
    <>
      <section className="flex flex-col w-full gap-8 py-8">
        <DashboardHeader />
        <div>
          {/* show nested routes */}
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
