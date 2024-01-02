import cn from "classnames";

interface InlineCodeProps {
  isLink: boolean;
}
function InlineCode({
  isLink,
  ...props
}: JSX.IntrinsicElements["code"] & InlineCodeProps) {
  return (
    <code
      className={cn(
        "inline text-code text-secondary dark:text-secondary-dark bg-gray-200 dark:bg-gray-700 px-1 rounded-md no-underline break-words",
        {
          "bg-opacity-60 py-[2px]": !isLink,
          "bg-highlight dark:bg-highlight-dark py-0": isLink,
        }
      )}
      {...props}
    ></code>
  );
}

export default InlineCode;
