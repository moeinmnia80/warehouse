import { useRef } from "react";

import { CloseIcon } from "@/assets";
import { useGetSuiteQuery } from "@/feature/suite";
import { useAppDispatch, useAppSelector } from "@/store/redux/store";

import {
  Table,
  TBody,
  TableEmpty,
  useOverflow,
  useClickOutside,
} from "@/shared";

import {
  rowReset,
  modalToggler,
  getReadyPackages,
  setRequestPackage,
  ShippingRequestTableDataRow,
  ShippingRequestTableHeaderRow,
} from "@/feature/shipping";

export const ShippingRequestModal = () => {
  const dispatch = useAppDispatch();
  const domNode = useRef<HTMLDivElement | null>(null);

  const modal = useAppSelector((state) => state.shipping.modal);
  const rowChecked = useAppSelector((state) => state.shipping.rowChecked);
  const requestPackages = useAppSelector(
    (state) => state.shipping.requestPackages,
  );

  const { data, isLoading, isError } = useGetSuiteQuery({ limit: "all" });

  useOverflow(modal);
  useClickOutside({
    domNode,
    setState: () => dispatch(modalToggler(false)),
  });

  const readyPackages = getReadyPackages(data, requestPackages);

  const hasSelectedRows = Object.values(rowChecked).some(Boolean);

  const isSubmitDisabled =
    isLoading || isError || readyPackages.length === 0 || !hasSelectedRows;

  const handleCloseModal = () => {
    dispatch(modalToggler(false));
  };

  const handleAddToShipping = () => {
    if (isSubmitDisabled) return;

    const selectedPackages = readyPackages.filter(
      (pkg) => rowChecked[pkg.packageId],
    );

    if (selectedPackages.length > 0) {
      dispatch(setRequestPackage([...requestPackages, ...selectedPackages]));
    }

    dispatch(rowReset());
  };

  if (!modal) return null;

  return (
    <div className="fixed inset-0 z-50 min-h-dvh md:h-dvh bg-white/10 backdrop-blur-xs flex-center transition-all duration-200 p-4">
      <section
        ref={domNode}
        aria-labelledby="shipping-modal"
        className="w-full h-full md:max-h-[90dvh] md:max-w-[80vw] bg-b-primary p-6 rounded-xl overflow-auto"
      >
        <div className="flex-between pb-6 border-b border-bo-primary">
          <h2 id="shipping-modal" className="text-md md:text-xl font-bold">
            Add More Packages
          </h2>
          <div className="flex-center gap-3">
            <button
              type="button"
              onClick={handleAddToShipping}
              disabled={isSubmitDisabled}
              className="capitalize text-sm bg-tx-primary text-b-primary py-2 px-3 rounded-md transition duration-200 enabled:hover:bg-white/40 disabled:opacity-50 disabled:cursor-default"
            >
              Add to shipping
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              aria-label="Close modal"
              className="group p-2 hover:bg-error-50 transition duration-200 rounded-xl"
            >
              <CloseIcon className="size-4 fill-st-primary group-hover:fill-error transition duration-200" />
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-xl overflow-hidden">
          <Table className="md:max-h-140">
            <ShippingRequestTableHeaderRow data={readyPackages} />
            <TBody className="overflow-hidden">
              {!isError && readyPackages.length > 0 ? (
                readyPackages.map((pkg) => (
                  <ShippingRequestTableDataRow
                    key={pkg.packageId}
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
