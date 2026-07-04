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
  {
    label: "Email address",
    id: "email",
    type: "email",
    name: "email",
    placeholder: "Enter email address",
    autoComplete: "email",
  },
  {
    label: "Password",
    id: "password",
    type: "password",
    name: "password",
    placeholder: "Enter password",
    autoComplete: "new-password",
  },
];
