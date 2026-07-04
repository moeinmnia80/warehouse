interface RegisterType {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  name: "fullname" | "username" | "email" | "password";
}

export const registerInput: RegisterType[] = [
  {
    label: "Full Name",
    id: "fullname",
    type: "text",
    name: "fullname",
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
