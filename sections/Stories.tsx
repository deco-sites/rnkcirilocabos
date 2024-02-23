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

function Stories({ stories, margin }: Props) {
  return (
    <Container>
      <ul
        class={clx(
          "flex items-center sm:justify-center gap-4 overflow-x-auto",
          MarginObject.y.desk[margin?.deskMarginY ?? "none"],
          MarginObject.y.mobi[margin?.mobiMarginY ?? "none"],
        )}
      >
        {stories && stories.length > 0 && stories.map((storie) => {
          const { href, src, alt, size, title } = storie;
          return (
            <a href={href}>
              <Image
                class="rounded-full"
                src={src}
                alt={alt}
                width={size}
                height={size}
              />
              {title ? <p className="text-center">{title}</p> : ""}
            </a>
          );
        })}
      </ul>
    </Container>
  );
}

export default Stories;
