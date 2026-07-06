import { useMemo, useReducer } from "react";
export interface TableRow {
  barcode: string;
  packageId: string;
  vendor: string;
  dataReceived: string;
  itemValues: string;
  weight: string;
  status: string;
  details: {
    recipient: string;
    address: string;
    items: string[];
    carrier: string;
  };
}
export interface TableState {
  rowChecked: Record<string, boolean>;
  rowExpanded: Record<string, boolean>;
  sort: { key: string | null; type: "asc" | "desc" };
  category: string;
}
const initialState: TableState = {
  rowChecked: {},
  rowExpanded: {},
  sort: { key: null, type: "asc" },
  category: "View All",
};
interface ActionWithOutPayload {
  type: "ROW_RESET";
}
interface ActionWithPayload {
  type: "ROW_TOGGLE" | "ROW_EXPANDED" | "ROW_CATEGORY" | "ROW_SORT";
  payload: string;
}
interface ActionCheckAll {
  type: "ROW_CHECK_ALL";
  payload: string[]; // list of ids to check
}

export type ReducerProps =
  | ActionWithPayload
  | ActionWithOutPayload
  | ActionCheckAll;

const reducer = (state: TableState, action: ReducerProps): TableState => {
  switch (action.type) {
    case "ROW_TOGGLE": {
      const id = action.payload;
      return {
        ...state,
        rowChecked: { ...state.rowChecked, [id]: !state.rowChecked[id] },
      };
    }
    case "ROW_CHECK_ALL": {
      const rowChecked: Record<string, boolean> = {};
      action.payload.forEach((id) => (rowChecked[id] = true));
      return { ...state, rowChecked };
    }
    case "ROW_RESET":
      return { ...state, rowChecked: {} };
    case "ROW_EXPANDED": {
      const id = action.payload;
      return {
        ...state,
        rowExpanded: { ...state.rowExpanded, [id]: !state.rowExpanded[id] },
      };
    }
    case "ROW_CATEGORY": {
      return {
        ...state,
        category: action.payload,
      };
    }
    case "ROW_SORT": {
      if (state.sort.key !== action.payload)
        return {
          ...state,
          sort: {
            key: action.payload,
            type: "asc",
          },
        };
      if (state.sort.type === "asc")
        return {
          ...state,
          sort: {
            key: action.payload,
            type: "desc",
          },
        };
      return {
        ...state,
        sort: {
          key: null,
          type: "asc",
        },
      };
    }

    default:
      return state;
  }
};

export const useTable = (data: TableRow[]) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const filteredData =
    state.category === "View All"
      ? data
      : data.filter((item) => item.status === state.category);

  const sortedData = useMemo(() => {
    if (!state.sort.key) return filteredData;
    const key = state.sort.key as keyof TableRow;
    const arr = [...filteredData];

    arr.sort((a, b) => {
      let av: string | number = a[key] as string;
      let bv: string | number = b[key] as string;

      if (key === "itemValues") {
        av = parseFloat((av as string).replace(/[^0-9.]/g, ""));
        bv = parseFloat((bv as string).replace(/[^0-9.]/g, ""));
      } else if (key === "packageId") {
        av = Number((av as string).split("-").pop());
        bv = Number((bv as string).split("-").pop());
      } else if (key === "weight") {
        av = parseFloat(av as string);
        bv = parseFloat(bv as string);
      } else if (key === "dataReceived") {
        av = new Date(av as string).getTime();
        bv = new Date(bv as string).getTime();
      } else if (key === "vendor") {
        av = String(av).toLowerCase();
        bv = String(bv).toLowerCase();
      } else {
        return 0;
      }

      if (av < bv) return state.sort.type === "asc" ? -1 : 1;
      if (av > bv) return state.sort.type === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filteredData, state.sort.key, state.sort.type]);

  const allChecked =
    filteredData.length > 0 &&
    filteredData.every((r) => state.rowChecked[r.packageId]);
  const someChecked =
    filteredData.some((r) => state.rowChecked[r.packageId]) && !allChecked;

  function toggleAll() {
    if (allChecked) {
      dispatch({ type: "ROW_RESET" });
    } else {
      dispatch({
        type: "ROW_CHECK_ALL",
        payload: filteredData.map((r) => r.packageId),
      });
    }
  }

  // send the last change as filteredData
  return {
    filteredData: sortedData,
    state,
    dispatch,
    toggleAll,
    someChecked,
    allChecked,
  };
};
