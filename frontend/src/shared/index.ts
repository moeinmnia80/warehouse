// export utils
export { cn } from "@/shared/utils/merge.utils";
export { calculateFileSize } from "@/shared/utils/calculateFileSize.utils";
export { changeTheme, themeCheck } from "@/shared/utils/theme.utils";
export {
  getCookie,
  setCookie,
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
  TableEmptyProps,
} from "@/shared/types/types";
export type { ErrorType } from "@/shared/types/error.types";
// schema
export {
  loginSchema,
  passwordRegex,
  usernameRegex,
  registerSchema,
  type LoginFormData,
  resetPasswordSchema,
  forgetPasswordSchema,
  type RegisterFormData,
  type ResetPasswordData,
  type ForgetPasswordData,
} from "@/shared/schema/auth.schema";
// hooks
export { useTheme } from "@/shared/hooks/useTheme";
export { useInPath } from "@/shared/hooks/useInPath";
export { useOverflow } from "@/shared/hooks/useOverflow";
export { useScrolled } from "@/shared/hooks/useScrolled";
export { useClickOutside } from "@/shared/hooks/useClickOutside";
// context
export { ThemeContext } from "@/shared/context/context";
// constants
export { areas } from "@/shared/constants/areas";
export { NAV_ITEMS } from "@/shared/constants/navLinks";
export { PATHS_WITHOUT_FOOTER } from "@/shared/constants/path";
//api
export { baseApi } from "@/shared/api/baseApi";
// components
export { Image } from "@/shared/components/ui/Image";
export { Toaster } from "@/shared/components/Toaster";
export { NavLinks } from "@/shared/layout/Header/NavLinks";
export { UserMenu } from "@/shared/layout/Header/UserMenu";
export { TableEmpty } from "@/shared/components/TableEmpty";
export { ThemeToggle } from "@/shared/components/ThemeToggle";
export { SocialMedia } from "@/shared/components/SocialMedia";
export { AreaSelector } from "@/shared/layout/Header/AreaSelector";
export { ToastContainer } from "@/shared/components/ToastContainer";
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
export { Loading } from "@/shared/components/ui/Loading";
export { CheckBox } from "@/shared/components/ui/CheckBox";
export { TableSkeleton } from "@/shared/components/TableSkeleton";
export { BackgroundPattern } from "@/shared/components/ui/BackgroundPattern";
export {
  Dropdown,
  DropdownItem,
  DropdownLabel,
  DropdownButton,
  DropdownContent,
  DropdownSeparator,
} from "@/shared/components/ui/DropDown";
export {
  Dropzone,
  DropzoneArea,
  DropzoneButton,
  DropzoneWrapper,
  DropzoneFileList,
  DropzoneSubmitButton,
} from "@/shared/components/ui/Dropzone";
