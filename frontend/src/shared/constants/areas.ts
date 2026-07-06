import type { AreaType } from "@/shared/types/types";
import flag1 from "@/assets/images/flag-1.png";
import flag2 from "@/assets/images/flag-2.png";

export const areas: AreaType[] = [
  {
    name: "US",
    desc: "Manage my packages from the US",
    src: flag1,
    lang: "EN",
  },
  {
    name: "UK",
    desc: "Manage my packages from the UK",
    src: flag2,
    lang: "EN",
  },
];
