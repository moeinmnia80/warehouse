export const Loading = ({ size = 64, ...props }) => {
  return (
    <div className="w-full min-h-dvh grid place-items-center">
      <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        className="minimal-loader"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 32C24.8366 32 32 24.8365 32 16C32 7.16344 24.8366 0 16 0C7.16343 0 0 7.16344 0 16C0 24.8365 7.16343 32 16 32ZM20.9914 7.45347C21.2344 6.59044 20.3969 6.0801 19.632 6.62504L8.95449 14.2316C8.12497 14.8226 8.25545 16 9.15049 16H11.9622V15.9782H17.442L12.977 17.5536L11.0086 24.5465C10.7656 25.4096 11.603 25.9199 12.368 25.3749L23.0455 17.7684C23.875 17.1774 23.7445 16 22.8495 16H18.5857L20.9914 7.45347Z"
        />
      </svg>
    </div>
  );
};
