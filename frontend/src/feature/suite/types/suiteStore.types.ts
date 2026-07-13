import type { CategoryType } from "@/feature/suite/index";

// Table initialState Types
interface TableState {
  rowChecked: Record<string, boolean>;
  rowExpanded: Record<string, boolean>;
  sort: { key: string | null; type: "asc" | "desc" };
  category: CategoryType;
  modal: { open: boolean; packageId: string | null };
}

export type { TableState };
