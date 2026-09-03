import { cn } from "@/shared";
import type { ComponentProps } from "react";
import { EditIcon, MastercardIcon, VisaIcon } from "@/assets";
import type {
  InfoRowProps,
  BrandCardType,
  EntryHeaderProps,
} from "@/feature/shipping";

export const EntryCard = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn(
      "rounded-lg p-4 **:transition **:duration-200 **:delay-75",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export const EntryHeader = ({
  title,
  children,
  data: { brand, isDefault },
}: EntryHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        {brand && <CardBrandChip brand={brand} />}
        <h3 className="text-sm lg:text-md font-semibold">{title}</h3>
        <Badge className={isDefault ? "" : "hidden"}>Default</Badge>
      </div>
      {children}
    </div>
  );
};

export const Badge = ({
  children,
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    className={cn(
      "flex items-center rounded-full bg-warning-50 px-2.5 py-0.5 text-xs  font-medium text-warning",
      className,
    )}
    {...props}
  >
    {children}
  </span>
);

export const IconButton = ({
  className,
  ...props
}: ComponentProps<"button">) => (
  <button
    type="button"
    className={cn(
      "flex size-8 items-center justify-center rounded-md p-2",
      className,
    )}
    {...props}
  >
    <EditIcon className="size-full stroke-current" />
  </button>
);

export const InfoRow = ({
  label,
  value,
  className,
  ...props
}: InfoRowProps) => (
  <p
    className={cn("flex gap-1.5 text-sm mt-1.5 animate-fade-in", className)}
    {...props}
  >
    <span className={label ? "inline-block opacity-50" : "hidden"}>
      {label}:
    </span>
    {value}
  </p>
);

export const CardBrandChip = ({ brand }: { brand: BrandCardType }) => {
  return (
    <span className="flex h-8 w-12 items-center rounded border border-bo-primary p-1.5 bg-white animate-fade-in">
      <VisaIcon className={brand === "visa" ? "size-full" : "hidden"} />
      <MastercardIcon
        className={brand === "mastercard" ? "size-full" : "hidden"}
      />
    </span>
  );
};

interface EmptyCardProps extends ComponentProps<"div"> {
  title: string;
  description: string;
}

export const EmptyCard = ({ title, description, ...props }: EmptyCardProps) => {
  return (
    <EntryCard {...props}>
      <EntryHeader title={title} data={{ isDefault: false, id: "empty" }} />

      <p className="text-sm opacity-50">{description}</p>
    </EntryCard>
  );
};
