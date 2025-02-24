type ButtonColor = "green" | "blue" | "red";
type ButtonVariant = "primary" | "secondary";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

function Button({ text, color = "blue", variant = "primary", className, ...props }: ButtonProps) {
  const textColor =
    variant === "primary"
      ? "text-white"
      : color === "green"
        ? "text-green-500"
        : color === "blue"
          ? "text-sky-500"
          : "text-red-500";
  const bgColor =
    variant === "primary"
      ? color === "green"
        ? "bg-green-500"
        : color === "blue"
          ? "bg-sky-500"
          : "bg-red-500"
      : "bg-white";
  const bgColorDark =
    variant === "primary"
      ? color === "green"
        ? "bg-green-700"
        : color === "blue"
          ? "bg-sky-700"
          : "bg-red-700"
      : "bg-neutral-300";

  return (
    <button className={`relative h-10 min-w-16 ${className || ""}`} {...props}>
      {props.disabled ? (
        <div className="flex h-10 w-full place-content-center place-items-center rounded-2xl border-none bg-neutral-300 outline-none">
          <span className="z-10 font-semibold text-neutral-500">{text}</span>
        </div>
      ) : (
        <>
          <div className={`absolute bottom-0 h-10 w-full rounded-2xl border-none outline-none ${bgColorDark}`}></div>
          <div
            className={`absolute bottom-[4px] flex h-10 w-full min-w-fit place-content-center place-items-center rounded-2xl outline-none transition-[bottom] duration-200 ease-in-out hover:bottom-[5px] active:bottom-[1px] ${bgColor} ${
              variant === "primary" ? "border-none" : "border-2 border-neutral-300"
            }`}
          >
            <span className={`z-10 font-semibold ${textColor}`}>{text}</span>
          </div>
        </>
      )}
    </button>
  );
}

export default Button;
