// export utils
export { cn } from "@/shared/utils/merge.utils";
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
} from "@/shared/types/types";
export type { ErrorType } from "@/shared/types/error.type";
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
export { useOverflow } from "@/shared/hooks/useOverflow";
export { useScrolled } from "@/shared/hooks/useScrolled";
export { useClickOutside } from "@/shared/hooks/useClickOutside";
// context
export { ThemeContext } from "@/shared/context/context";
// constants
export { areas } from "@/shared/constants/areas";
export { NAV_ITEMS } from "@/shared/constants/navLinks";
export { registerInput } from "@/shared/constants/inputs";
export { COLUMNS, RAW_DATA } from "@/shared/constants/table";
export { PATHS_WITHOUT_FOOTER } from "@/shared/constants/hiddenFooter";
//api
export { baseApi } from "@/shared/api/baseApi";
// components
export { Image } from "@/shared/components/ui/Image";
export { Toaster } from "@/shared/components/Toaster";
export { NavLinks } from "@/shared/components/NavLinksHeader";
export { ThemeToggle } from "@/shared/components/ThemeToggle";
export { SocialMedia } from "@/shared/components/SocialMedia";
export { ImageDropzone } from "@/shared/components/ImageDropzone";
export { ToastContainer } from "@/shared/components/ToastContainer";
export { UserMenuHeader } from "@/shared/components/UserMenuHeader";
export { DocumentDropzone } from "@/shared/components/DocumentDropzone";
export { AreaSelectorHeader } from "@/shared/components/AreaSelectorHeader";
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
