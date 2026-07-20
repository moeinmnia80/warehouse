import { Table, TBody, type TableRow } from "@/shared/index";
import { useAppDispatch, useAppSelector } from "@/store/redux/store";
import {
  InvoiceModal,
  TableDataRow,
  TableSkeleton,
  useSuiteFilter,
  TableHeaderRow,
  handleCloseModal,
  useGetSuiteQuery,
} from "@/feature/suite/index";

export const MySuiteTable = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetSuiteQuery();
  const modal = useAppSelector((state) => state.suite.modal);
  const sortedData = useSuiteFilter((data?.packages ?? []) as TableRow[]);

  if (isLoading) {
    return (
      <TableSkeleton
        columns={["w-15", "w-30", "w-30", "w-25", "w-20", "w-20"]}
        rows={3}
      />
    );
  }

  return (
    <div className="rounded-xl m-6 overflow-hidden">
      <Table>
        <TableHeaderRow sortedData={sortedData} />

        <TBody>
          {sortedData?.map((item) => (
            <TableDataRow key={item.packageId} item={item} />
          ))}
        </TBody>

        {modal.open && (
          <InvoiceModal handleCloseModal={() => handleCloseModal(dispatch)} />
        )}
      </Table>
    </div>
  );
};
