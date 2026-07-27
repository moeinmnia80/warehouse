import type { RegisterType } from "@/feature/auth";

export const registerInput: RegisterType[] = [
  {
    label: "Full Name",
    id: "fullName",
    type: "text",
    name: "fullName",
    placeholder: "Enter full name",
    autoComplete: "name",
  },
  {
    label: "Username",
    id: "username",
    type: "text",
    name: "username",
    placeholder: "Enter username",
    autoComplete: "username",
  },
];
