import { useRef } from "react";

import { CloseIcon } from "@/assets";
import { useGetSuiteQuery } from "@/feature/suite";
import { useAppDispatch, useAppSelector } from "@/store/redux/store";
import {
  Table,
  TableEmpty,
  TBody,
  useClickOutside,
  useOverflow,
} from "@/shared";

import {
  modalToggler,
  rowReset,
  setRequestPackage,
  ShippingRequestTableDataRow,
  ShippingRequestTableHeaderRow,
} from "@/feature/shipping";

export const ShippingRequestModal = () => {
  const dispatch = useAppDispatch();

  const requestPackages = useAppSelector(
    (state) => state.shipping.requestPackages,
  );
  const { data, isLoading, isError } = useGetSuiteQuery(
    { limit: "all" },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        isError,
        isLoading,
        data: data?.packages.filter(
          (pkg) =>
            pkg.statusLabel === "ready to send" &&
            !requestPackages.some(
              (reqPkg) => reqPkg.packageId === pkg.packageId,
            ),
        ),
      }),
    },
  );

  const modal = useAppSelector((state) => state.shipping.modal);
  const domNode = useRef<HTMLDivElement | null>(null);
  const rowChecked = useAppSelector((state) => state.shipping.rowChecked);

  useOverflow(modal);
  useClickOutside({
    domNode,
    setState: () => dispatch(modalToggler(false)),
  });

  return (
    <div
      className={`fixed inset-0 h-dvh bg-white/10 backdrop-blur-xs z-50 ${modal ? "flex-center" : "hidden"} transition-all duration-200`}
    >
      <section
        aria-labelledby="shipping-modal"
        className="w-full max-h-[90dvh] md:max-w-[80vw] bg-b-primary p-6 rounded-xl"
        ref={domNode}
      >
        <div className="flex-between pb-6 border-b border-bo-primary">
          <h2 id="shipping-modal" className="text-md md:text-xl font-bold">
            Add More Packages
          </h2>
          <div className="flex-center gap-3">
            <button
              onClick={() => {
                Object.keys(rowChecked).forEach(
                  (id) =>
                    data?.find((pkg) => pkg.packageId === id) &&
                    dispatch(
                      setRequestPackage([
                        ...requestPackages,
                        ...(data || []).filter(
                          (pkg) => rowChecked[pkg.packageId],
                        ),
                      ]),
                    ),
                );
                dispatch(rowReset());
              }}
              className="capitalize text-sm bg-tx-primary text-b-primary py-2 px-3 rounded-md enabled:hover:bg-white/40 transition duration-200 disabled:opacity-50 disabled:cursor-default"
              disabled={
                isLoading ||
                isError ||
                !(data || []).length ||
                !Object.values(rowChecked).some(Boolean)
              }
            >
              add to shipping
            </button>
            <button
              className="group p-2 hover:bg-error-50 transition duration-200 rounded-xl"
              onClick={() => dispatch(modalToggler(false))}
            >
              <CloseIcon className="size-4 fill-st-primary group-hover:fill-error transition duration-200" />
            </button>
          </div>
        </div>
        <div className="rounded-xl mt-6 overflow-hidden">
          <Table className="md:max-h-140">
            <ShippingRequestTableHeaderRow data={data || []} />
            <TBody className="overflow-hidden">
              {!isError && data && data.length > 0 ? (
                (data || []).map((pkg) => (
                  <ShippingRequestTableDataRow
                    key={pkg?.packageId}
                    data={pkg}
                    isLoading={isLoading}
                  />
                ))
              ) : (
                <TableEmpty
                  title="No packages found"
                  description="This suite doesn't have any packages yet."
                />
              )}
            </TBody>
          </Table>
        </div>
      </section>
    </div>
  );
};
