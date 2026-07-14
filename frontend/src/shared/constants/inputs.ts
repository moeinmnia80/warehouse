interface RegisterType {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  name: "fullName" | "username" | "email" | "password";
}

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
