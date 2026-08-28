import {
  Table,
  TableEmpty,
  TBody,
  Pagination,
  usePaginationParams,
} from "@/shared";
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

  const { page, setPage } = usePaginationParams();

  const { data, isLoading, isFetching } = useGetSuiteQuery({ page });

  const modal = useAppSelector((state) => state.suite.modal);
  const sortedData = useSuiteFilter(data?.packages ?? []);

  if (isLoading) {
    return (
      <TableSkeleton
        className="p-6"
        rows={5}
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
      <div className="relative flex-center mt-4">
        {data?.pagination && (
          <Pagination
            onPageChange={(value) => setPage(value)}
            isLoading={isFetching}
            pagination={data.pagination}
            className=""
          />
        )}
      </div>
    </div>
  );
};
