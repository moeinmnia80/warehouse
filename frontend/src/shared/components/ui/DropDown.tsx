// components/ui/Dropdown.tsx
import { useState, useRef, useEffect, type ReactNode } from "react";
import ChevronIcon from "../../../assets/icons/ChevronIcon";

interface DropdownProps<T> {
  data: T[];
  value?: T;
  onChange: (item: T) => void;
  renderItem: (item: T) => ReactNode;
  renderValue?: (item: T) => ReactNode;
  itemClass?: string;
  valueClass?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  getKey: (item: T) => string | number;
}

export function Dropdown<T>({
  data,
  value,
  onChange,
  renderItem,
  itemClass,
  renderValue,
  valueClass,
  placeholder,
  className,
  disabled = false,
  getKey,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: T) => {
    onChange(item);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-fit z-20
        cursor-pointer ${valueClass}`}
      >
        {value
          ? renderValue
            ? renderValue(value)
            : renderItem(value)
          : placeholder}
        <ChevronIcon
          className={`size-11 p-3 fill-st-primary 
          ${isOpen ? "rotate-180" : "rotate-0"}
          transition duration-300`}
        />
      </button>

      {isOpen && (
        <div className={`absolute ${itemClass}`}>
          {data.length === 0 ? (
            <div className="px-4 py-3 text-center text-gray-500">
              Nothing ...
            </div>
          ) : (
            data.map((item) => (
              <button
                key={getKey(item)}
                type="button"
                onClick={() => handleSelect(item)}
                className={`flex items-center justify-between 
                  w-full h-10 px-2 gap-2 rounded-md
                  transition duration-200 
                  hover:bg-gray-50
                `}
              >
                {renderItem(item)}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
