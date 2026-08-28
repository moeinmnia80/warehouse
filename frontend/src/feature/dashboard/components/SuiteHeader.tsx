import { type ComponentProps } from "react";

import { QueueIcon } from "@/assets/index";
import { useAppDispatch } from "@/store/redux/store";
import { Button, usePaginationParams } from "@/shared";
import { changeCategory, useGetSuiteQuery } from "@/feature/suite";

export const SuiteHeader = ({ ...props }: ComponentProps<"div">) => {
  const dispatch = useAppDispatch();

  const { page } = usePaginationParams();

  const { id, zonePrefix, count, isLoading } = useGetSuiteQuery(
    { page },
    {
      selectFromResult: ({ data, isLoading }) => ({
        isLoading,
        id: data?.id,
        zonePrefix: data?.zonePrefix,
        count: data?.packages.filter(
          (pkg) => pkg.statusLabel === "ready to send",
        ).length,
      }),
    },
  );

  return (
    <div {...props}>
      <div className="flex flex-col gap-1 justify-center lg:justify-between h-full w-fit border-e border-bo-primary pe-4 sm:pe-8">
        <h3 className="flex-center text-tx-primary font-bold text-xl lg:text-2xl xl:text-3xl ">
          Packages in Suite{" "}
          {!isLoading ? (
            id && zonePrefix && `${zonePrefix}${id}`
          ) : (
            <div className="w-10 h-4 bg-tx-placeholder rounded-lg animate-pulse"></div>
          )}
        </h3>
        <p className="flex flex-col gap-2 lg:flex-row text-tx-secondary text-sm lg:text-md font-medium">
          My Shipping Schedule:
          <span
            className="relative bg-warning-50 
          text-warning text-sm font-semibold w-fit
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
        <div className="flex flex-col md:justify-center text-center text-tx-primary md:text-left">
          <div className=" text-lg md:text-2xl lg:text-3xl font-bold">
            {count}
          </div>
          <Button
            className="h-fit py-2 text-sm md:text-md font-semibold underline"
            onClick={() => {
              dispatch(changeCategory("ready to send"));
            }}
          >
            View Queue
          </Button>
        </div>
      </div>
    </div>
  );
};
