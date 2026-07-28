import type { CategoryType } from "@/feature/suite/index";

export interface SuiteTableState {
  rowChecked: Record<string, boolean>;
  rowExpanded: Record<string, boolean>;
  sort: { key: string | null; type: "asc" | "desc" };
  category: CategoryType;
  modal: { open: boolean; packageId: string | null };
}
