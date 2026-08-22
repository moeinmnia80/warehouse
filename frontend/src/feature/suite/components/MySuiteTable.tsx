import { Table, TableEmpty, TBody } from "@/shared";
import { useAppDispatch, useAppSelector } from "@/store/redux/store";
import {
  InvoiceModal,
  TableDataRow,
  TableSkeleton,
  useSuiteFilter,
  TableHeaderRow,
  useGetSuiteQuery,
  createRowActions,
} from "@/feature/suite/index";

export const MySuiteTable = () => {
  const dispatch = useAppDispatch();
  const rowActions = createRowActions(dispatch);
  const { data, isLoading } = useGetSuiteQuery();

  const modal = useAppSelector((state) => state.suite.modal);
  const sortedData = useSuiteFilter(data?.packages ?? []);

  if (isLoading) {
    return (
      <TableSkeleton
        className="p-6"
        rows={3}
        columns={["w-15", "w-30", "w-30", "w-25", "w-20", "w-20"]}
      />
    );
  }

  return (
    <div className="rounded-xl m-6 overflow-hidden">
      <Table>
        <TableHeaderRow sortedData={sortedData} />
        <TBody>
          {sortedData?.length ? (
            sortedData?.map((item) => (
              <TableDataRow key={item.packageId} item={item} />
            ))
          ) : (
            <TableEmpty
              title="No packages found"
              description="This suite doesn't have any packages yet."
            />
          )}
        </TBody>

        {modal.open && (
          <InvoiceModal handleCloseModal={() => rowActions.closeModal()} />
        )}
      </Table>
    </div>
  );
};
