import { useMemo, useReducer } from "react";
import { RAW_DATA } from "../constants/table";
// table data type
export interface TableRow {
  barcode: string;
  packageId: string;
  vendor: string;
  dataReceived: string;
  itemValues: string;
  totalValues: string;
  weight: string;
  status: {
    label: string;
    details: string;
  };
  details: {
    recipient: string;
    address: string;
    items: string[];
    carrier: string;
  };
  invoices?: { id: string; name: string; url?: string }[];
}
// Table initialState Types
export interface TableState {
  rowChecked: Record<string, boolean>;
  rowExpanded: Record<string, boolean>;
  sort: { key: string | null; type: "asc" | "desc" };
  category: string;
  modal: { open: boolean; packageId: string | null };
}
// Table initialState
const initialState: TableState = {
  rowChecked: {},
  rowExpanded: {},
  sort: { key: null, type: "asc" },
  category: "View All",
  modal: { open: false, packageId: null },
};
//1------- Action Type --------//
interface ActionWithOutPayload {
  type: "ROW_RESET";
}
//2------- Action Type --------//
interface ActionWithPayload {
  type: "ROW_TOGGLE" | "ROW_EXPANDED" | "ROW_CATEGORY" | "ROW_SORT";
  payload: string;
}
//3------- Action Type --------//
interface ActionCheckAll {
  type: "ROW_CHECK_ALL";
  payload: string[]; // list of ids to check
}
//4------ Action Type ---------//
interface ActionModal {
  type: "MODAL_OPEN";
  payload: string; // packageId
}
//5----- Action Type ----------//
interface ActionModalClose {
  type: "MODAL_CLOSE";
}
//-----------------------------//
//----- Main Action Type ------//
//-----------------------------//
export type ReducerProps =
  | ActionWithPayload
  | ActionWithOutPayload
  | ActionCheckAll
  | ActionModal
  | ActionModalClose;
//-----------------------------//
//------- Main Reducer --------//
//-----------------------------//
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
    // Modal Handle
    case "MODAL_OPEN":
      return { ...state, modal: { open: true, packageId: action.payload } };
    case "MODAL_CLOSE":
      return { ...state, modal: { open: false, packageId: null } };

    default:
      return state;
  }
};

export const useTable = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const data: TableRow[] = RAW_DATA;
  // filter data based on category
  const filteredData =
    state.category === "View All"
      ? data
      : data.filter((item) => item.status.label === state.category);

  // filter table data based on key in table header
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

  // main checkbox in header
  const allChecked =
    filteredData.length > 0 &&
    filteredData.every((r) => state.rowChecked[r.packageId]);
  // checkbox
  const someChecked =
    filteredData.some((r) => state.rowChecked[r.packageId]) && !allChecked;
  // toggle main checkbox
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
