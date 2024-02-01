import { clx } from "../sdk/clx.ts";
import { margin as MarginObject } from "../constants.tsx";
import type { MarginInterface } from "../constants.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Container from "./Layout/Container.tsx";
import Image from "apps/website/components/Image.tsx";

/**
 * @titleBy alt
 */
export interface Storie {
  alt: string;
  src: ImageWidget;
  title?: string;
  href: string;
  /** @default 85 */
  size: number;
}

export interface Props {
  stories: Storie[];
  margin?: MarginInterface;
}

function GetStories({ stories, margin }: Props) {
  return (
    <ul
      class={clx(
        "flex items-center sm:justify-center gap-4 overflow-x-auto",
        MarginObject.y.desk[margin?.deskMarginY ?? "none"],
        MarginObject.y.mobi[margin?.mobiMarginY ?? "none"],
      )}
    >
      {stories && stories.length > 0 && stories.map((storie) => {
        return (
          <a href={storie.href}>
            <Image
              class="rounded-full"
              src={storie.src}
              alt={storie.alt}
              width={storie.size}
              height={storie.size}
            />
            {storie.title ? <p className="text-center">{storie.title}</p> : ""}
          </a>
        );
      })}
    </ul>
  );
}

function Stories(props: Props) {
  return (
    <>
      <Container
        children={{
          Component: GetStories,
          props: { ...props },
        }}
      />
    </>
  );
}

export default Stories;
