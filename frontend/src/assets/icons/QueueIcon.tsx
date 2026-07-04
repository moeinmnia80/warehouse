import type { ComponentProps, FC } from "react";

const QueueIcon: FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M25.3334 2.66663V6.66663C25.3334 11.8213 21.1547 16 16.0001 16M6.66675 2.66663V6.66663C6.66675 11.8213 10.8454 16 16.0001 16M16.0001 16C21.1547 16 25.3334 20.1786 25.3334 25.3333V29.3333M16.0001 16C10.8454 16 6.66675 20.1786 6.66675 25.3333V29.3333"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M4 2.66663H28"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M4 29.3333H28"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 29.3333H20V25.3333C20 23.1241 18.2091 21.3333 16 21.3333C13.7909 21.3333 12 23.1241 12 25.3333V29.3333Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default QueueIcon;
