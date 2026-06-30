import {
  type ReactNode,
  type ComponentProps,
  type ComponentPropsWithoutRef,
} from "react";

export type Props = {
  children?: ReactNode;
} & ComponentPropsWithoutRef<"section">;

export type contextType = {
  theme: string | null;
  themeToggler: () => void;
};
// drop down item
export type DropItemType = {
  area: AreaType;
} & ComponentProps<"div">;

// in store.ts
export interface AreaType {
  name: string;
  desc: string;
  src: string;
}
export interface DataState {
  isOpen: boolean;
  areas: AreaType[];
  selectedArea: AreaType;
  setArea: (data: AreaType) => void;
  setIsOpen: () => void;
}
// form
export type InputType = { label: string } & ComponentProps<"input">;
