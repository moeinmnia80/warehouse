import type { RegisterType } from "@/feature/auth";

export const registerInput: RegisterType[] = [
  {
    label: "First Name",
    id: "firstName",
    type: "text",
    name: "firstName",
    placeholder: "Enter first name",
    autoComplete: "name",
  },
  {
    label: "Last Name",
    id: "lastName",
    type: "text",
    name: "lastName",
    placeholder: "Enter last name",
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
