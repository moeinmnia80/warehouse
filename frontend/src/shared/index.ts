// export utils
export { changeTheme, themeCheck } from "@/shared/utils/theme.utils";
export {
  getCookie,
  setCookies,
  removeCookie,
} from "@/shared/utils/cookie.utils";

// export type
export type {
  AreaType,
  DataState,
  TableRow,
  ToastItem,
  ToastState,
  ToastType,
  contextType,
} from "@/shared/types/types";
export type { ErrorType } from "@/shared/types/error.type";
// schema
export {
  type ForgetPasswordData,
  type LoginFormData,
  type RegisterFormData,
  type ResetPasswordData,
  forgetPasswordSchema,
  loginSchema,
  passwordRegex,
  registerSchema,
  resetPasswordSchema,
  usernameRegex,
} from "@/shared/schema/auth.schema";
// hooks
export { useTheme } from "@/shared/hooks/useTheme";
export { useOverflow } from "@/shared/hooks/useOverflow";
export { useClickOutside } from "@/shared/hooks/useClickOutside";
// context
export { ThemeContext } from "@/shared/context/context";
// constants
export { areas } from "@/shared/constants/areas";
export { registerInput } from "@/shared/constants/inputs";
export { COLUMNS, RAW_DATA } from "@/shared/constants/table";
export { PATHS_WITHOUT_FOOTER } from "@/shared/constants/hiddenFooter";
//api
export { baseApi } from "@/shared/api/baseApi";
// components
export { Image } from "@/shared/components/ui/Image";
export { Toaster } from "@/shared/components/Toaster";
export { SocialMedia } from "@/shared/components/SocialMedia";
export { ImageDropzone } from "@/shared/components/ImageDropzone";
export { ToastContainer } from "@/shared/components/ToastContainer";
export { DocumentDropzone } from "@/shared/components/DocumentDropzone";
export {
  Form,
  Email,
  Input,
  Label,
  Caption,
  FormItem,
  Checkbox,
  Password,
} from "@/shared/components/ui/Form";
export {
  TD,
  Row,
  Table,
  TBody,
  THead,
  RowContent,
  RowContentSection,
} from "@/shared/components/ui/Table";
export {
  Toggle,
  ToggleLabel,
  ToggleButton,
} from "@/shared/components/ui/Toggle";
export { Button } from "@/shared/components/ui/Button";
export { CheckBox } from "@/shared/components/ui/CheckBox";
export {
  Dropdown,
  DropdownItem,
  DropdownLabel,
  DropdownButton,
  DropdownContent,
  DropdownSeparator,
} from "@/shared/components/ui/DropDown";
