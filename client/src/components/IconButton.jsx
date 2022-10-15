import React from "react";

function IconButton({
  Icon,
  isActive,
  color = "text-blue-500",
  children,
  ...props
}) {
  return (
    <button
      className={`bg-none p-1 flex items-center ${isActive ? "relative" : ""} ${
        color || ""
      }`}
      {...props}
    >
      <span className={`${children != null ? "mr-1" : ""}`}>
        <Icon />
      </span>
      {children}
    </button>
  );
}

export default IconButton;
