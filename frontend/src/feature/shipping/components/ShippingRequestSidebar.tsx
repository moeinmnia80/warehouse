import { SidebarContent } from "@/feature/shipping";

export const ShippingRequestSidebar = () => {
  return (
    <div className="w-full flex-1 text-tx-primary bg-b-primary border border-bo-primary rounded-xl p-6">
      <h3 className="text-md text-tx-placeholder">
        All values are in United States dollars (USD).
      </h3>
      <SidebarContent />
    </div>
  );
};
