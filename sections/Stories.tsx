import type { Cep } from "../loaders/ceps.ts";

export interface Props {
  items: Lorem[];
}

export interface Lorem {
  /** @default TextoAlternativo */
  alt: string;
  /** @format image-uri */
  src: string;
  /** @default exemplo */
  title: string;
  href: string;
  size: "lg" | "md" | "full";
  cep: Cep;
}

export default function Stories({ items }: Props) {
  return (
    <ul className="flex items-center justify-center gap-4">
      {items && items.length > 0 && items.map((item) => {
        return (
          <a href={item.href}>
            <img
              className={"rounded-" + item.size}
              src={item.src}
              alt={item.alt}
              width="85"
              height="85"
            />
            <p>{item.cep?.logradouro}</p>
          </a>
        );
      })}
    </ul>
  );
}
