/**
 * @titleBy alt
 */
export interface Storie {
  alt: string;
  /** @format image-uri */
  src: string;
  title?: string;
  href: string;
  /** @default 85 */
  size: number;
}

export interface Props {
  stories: Storie[];
  /** 
   * @default 12px
   * @description margin no eixo Y (cima e baixo)
   * */
  marginY?: "12px" | "24px";
}

const DEFAULT_PROPS = {
  stories: [{
    href: "/",
    src: "https://placehold.co/85",
    size: 85,
    title: "Title"
  }]
};

export default function Stories(props: Props) {
  const { stories, marginY } = { ...DEFAULT_PROPS, ...props };

  return (
    <div className="container px-3">
      <ul className={`flex items-center sm:justify-center gap-4 overflow-x-auto ${marginY ? "my-[" + marginY + "]" : ""}`}>
        {stories && stories.length > 0 && stories.map((storie) => {
          return (
            <a href={storie.href}>
              <img
                className="rounded-full"
                src={storie.src}
                alt={storie.alt}
                width={storie.size}
                height={storie.size}
              />
              {storie.title ? <p className="text-center">{storie.title}</p> : ''}
            </a>
          );
        })}
      </ul>
    </div>
  );
}
