import {
  type ReactNode,
  type ComponentProps,
  type ComponentPropsWithoutRef,
} from "react";

export type HeaderType = {
  children?: ReactNode;
} & ComponentPropsWithoutRef<"section">;

export type contextType = {
  theme: string | null;
  themeToggler: () => void;
};
// drop down item
export type DropDownType = { items: AreaType[] } & ComponentProps<"div">;
export type DropItemType = {
  area: AreaType;
} & ComponentProps<"div">;
export type DropDownWrapperType = { isOpen?: boolean } & ComponentProps<"div">;
// in store.ts
export interface AreaType {
  name: string;
  desc: string;
  src: string;
  lang: string;
}
export interface DataState {
  areas: AreaType[];
  selectedArea: AreaType;
  setArea: (data: AreaType) => void;
}
// form
export type InputType = { label: string } & ComponentProps<"input">;
