type ButtonColor = "green" | "blue" | "red";
type ButtonVariant = "primary" | "secondary";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

function Button({ text, color = "blue", variant = "primary", size = "medium", className, ...props }: ButtonProps) {
  const textColor =
    variant === "primary"
      ? "text-white"
      : color === "green"
        ? "text-lime-600"
        : color === "blue"
          ? "text-sky-500"
          : "text-red-500";
  const bgColor =
    variant === "primary"
      ? color === "green"
        ? "bg-lime-600"
        : color === "blue"
          ? "bg-sky-500"
          : "bg-red-500"
      : "bg-white";
  const bgColorDark =
    variant === "primary"
      ? color === "green"
        ? "bg-lime-700"
        : color === "blue"
          ? "bg-sky-700"
          : "bg-red-700"
      : "bg-neutral-300";

  // Size classes
  let sizeClasses = "h-10 min-w-20 text-base"; // medium (default)
  if (size === "small") sizeClasses = "h-8 min-w-12 text-sm";
  if (size === "large") sizeClasses = "h-12 min-w-24 text-lg";

  return (
    <button className={`relative ${sizeClasses} ${className || ""}`} {...props}>
      {props.disabled ? (
        <div className={`flex w-full place-content-center place-items-center rounded-2xl border-none bg-neutral-300 outline-none ${sizeClasses}`}>
          <span className="z-10 font-semibold text-neutral-500">{text}</span>
        </div>
      ) : (
        <>
          <div className={`absolute bottom-0 w-full rounded-2xl border-none outline-none ${bgColorDark} ${sizeClasses}`}></div>
          <div
            className={`absolute bottom-[4px] flex w-full min-w-fit place-content-center place-items-center rounded-2xl outline-none transition-[bottom] duration-200 ease-in-out hover:bottom-[5px] active:bottom-[1px] ${bgColor} ${
              variant === "primary" ? "border-none" : "border-2 border-neutral-300"
            } ${sizeClasses}`}
          >
            <span className={`z-10 font-semibold ${textColor}`}>{text}</span>
          </div>
        </>
      )}
    </button>
  );
}

export default Button;
