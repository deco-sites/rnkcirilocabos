interface LinkProp {
  label?: string;
  href?: string;
  outline?: boolean;
}

interface Props {
  content?: {
    title?: string;
    links?: LinkProp[];
  };
}

function ButtonLinks({ content }: Props) {
  return (
    <>
      {content?.title && <h2>{content.title}</h2>}
      {content?.links &&
        content?.links.length > 0 &&
        content?.links.map((link) => {
          let btnClass =
            "btn bg-danger border-danger text-white hover:bg-danger hover:border-danger hover:text-white";

          if (link.outline) {
            btnClass =
              "btn border-white text-white bg-transparent hover:bg-white hover:text-dark hover:border-white";
          }

          return (
            <a class={btnClass} href={link.href}>
              {link.label}
            </a>
          );
        })}
    </>
  );
}

export default ButtonLinks;
