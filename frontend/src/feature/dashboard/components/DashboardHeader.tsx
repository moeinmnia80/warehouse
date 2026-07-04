// import { useArea } from "@/store";
import { Link } from "react-router";
// import { useShallow } from "zustand/shallow";
// import TickIcon from "@/assets/icons/TickIcon";
import QueueIcon from "@/assets/icons/QueueIcon";
// import { DropDown } from "@/shared/components/ui/DropDown";

const DashboardHeader = () => {
  // const selectedArea = useArea(useShallow((state) => state.selectedArea));
  // const areas = useArea(useShallow((state) => state.areas));
  // const setArea = useArea(useShallow((state) => state.setArea));
  return (
    <div className="flex w-full h-42 md:h-32 bg-b-primary rounded-2xl p-5 animate-slide-down">
      <div className="flex flex-col gap-1 justify-center lg:justify-between h-full w-fit border-e border-bo-primary pe-4 sm:pe-8">
        <h3 className="text-t-primary font-bold text-2xl lg:text-3xl  xl:text-4xl ">
          Packages in Suite XC1164
        </h3>
        <p className="flex flex-col gap-2 lg:flex-row text-t-secondary text-md lg:text-lg font-medium">
          My Shipping Schedule:
          <span
            className="relative bg-warning-50 
          text-warning text-md font-semibold w-fit
            py-0.5 px-3 pl-5 rounded-full"
          >
            <span className="absolute top-1/2 -translate-y-1/2 left-2 inline-block size-1.5 rounded-full bg-warning animate-pulse"></span>
            Hold
          </span>
        </p>
      </div>
      <div
        className="flex flex-col justify-between md:flex-row md:gap-4 bg-b-secondary 
        border border-bo-primary rounded-xl p-4 ms-4 sm:ms-8"
      >
        <div className="h-14 md:h-full aspect-square rounded-lg bg-primary p-2">
          <QueueIcon className="size-full stroke-st-primary" />
        </div>
        <div className="flex flex-col md:justify-center text-center md:text-left">
          <div className="text-t-primary text-lg md:text-2xl font-bold">08</div>
          <Link
            className="text-t-primary text-sm md:text-md font-semibold underline"
            to="/queue"
          >
            View Queue
          </Link>
        </div>
      </div>
      <div className="hidden xl:flex flex-col justify-center">
        <div className="text-t-primary text-md font-semibold mb-1.5">
          Manage Packages
        </div>
        {/* <Dropdown
          data={areas}
          value={selectedArea}
          onChange={setArea}
          getKey={(area) => area.name}
          valueClass={`bg-b-primary border border-bo-primary 
            rounded-md h-11 flex items-center p-1`}
          renderValue={() => (
            <>
              <div className="size-fit p-2">
                <img
                  className={`size-7 object-contain ml-2" `}
                  src={selectedArea?.src}
                  alt={selectedArea?.name}
                />
              </div>

              <p className="text-sm font-bold text-t-primary ml-2">
                {selectedArea.desc}
              </p>
            </>
          )}
          itemClass="top-full right-0 w-80 
            bg-b-primary mt-2  p-1 
            border border-bo-primary rounded-md"
          renderItem={(area) => (
            <>
              <div className="size-fit">
                <img
                  className="w-6 h-4 object-contain"
                  src={area.src}
                  alt={area.name}
                />
              </div>
              <p className="text-md text-t-primary font-semibold">
                {area.desc}
              </p>
              <TickIcon
                className={`size-5 ${
                  area.name === area.name ? "stroke-st-primary" : "invisible"
                }`}
              />
            </>
          )}
        /> */}
      </div>
    </div>
  );
};

export default DashboardHeader;
