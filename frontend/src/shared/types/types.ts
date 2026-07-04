export interface contextType {
  /* initial value */
  theme: string | null;
  /* This way is better instead of pass state fn as props */
  themeToggler: () => void;
}

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
