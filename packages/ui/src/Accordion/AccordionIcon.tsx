import { useAccordionItemContext } from "./accordion-item-context";

interface AccordionIconProps extends React.SVGAttributes<SVGElement> {}

export function AccordionIcon(props: AccordionIconProps) {
  const { isOpen, isDisabled } = useAccordionItemContext()!;

  const iconStyles = {
    width: "24px",
    height: "24px",
    opacity: isDisabled ? 0.4 : 1,
    transform: isOpen ? "rotate(-180deg)" : undefined,
    transformOrigin: "center",
    ...props.style,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className={props.className}
      {...props}
      style={iconStyles}
    >
      <path
        fill="currentColor"
        d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
      />
    </svg>
  );
}
