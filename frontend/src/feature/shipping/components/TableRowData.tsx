import { useGetShippingQuery } from "../services/shippingApi";

export const TableRowData = () => {
  const { data } = useGetShippingQuery();
  console.log(data);

  return <div>TableRowData</div>;
};
