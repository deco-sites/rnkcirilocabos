import { type ComponentChildren, type JSX } from "preact";

type Props = JSX.IntrinsicElements["div"] & {
  children: ComponentChildren;
};

function Container(
  { className, children, ...rest }: Props,
) {
  return (
    <div
      className={className ? `container px-3 ${className}` : `container px-3`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Container;
