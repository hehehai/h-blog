import cn from "classnames";

interface PreCodeProps {
  isLink: boolean;
}
function PreCode({
  isLink,
  ...props
}: JSX.IntrinsicElements["pre"] & PreCodeProps) {
  return (
    <div className="relative">
      <pre
        className={cn(
          "block text-secondary dark:text-secondary-dark dark:bg-slate-900 px-1 rounded-md no-underline break-words",
          {
            "bg-opacity-60 py-px": !isLink,
            "bg-highlight dark:bg-highlight-dark py-0": isLink,
          }
        )}
        {...props}
      ></pre>
    </div>
  );
}

export default PreCode;
