import classNames from "classnames";
import { ReactNode } from "react";

interface ButtonProperties {
  variant: "primary" | "secondary" | "tertiary";
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}

export default function Button({
  children,
  variant,
  onClick,
  disabled,
}: ButtonProperties) {
  switch (variant) {
    case "primary":
      return (
        <button
          onClick={onClick}
          className="bg-primary text-onPrimary p-2 rounded-lg hover:opacity-50 cursor-pointer"
        >
          {children}
        </button>
      );
    case "secondary":
      return (
        <button
          onClick={disabled ? () => {} : onClick}
          className={classNames(
            "bg-tertiaryContainer rounded-lg flex justify-center items-center cursor-pointer hover:opacity-50 w-full",
            {
              "cursor-auto opacity-50": disabled,
            }
          )}
        >
          {children}
        </button>
      );
    case "tertiary":
      return (
        <button
          onClick={disabled ? () => {} : onClick}
          className={classNames(
            "text-primary hover:opacity-50 cursor-pointer",
            {
              "cursor-auto opacity-50": disabled,
            }
          )}
        >
          {children}
        </button>
      );
  }
}
