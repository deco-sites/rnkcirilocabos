import { margin } from "../constants.tsx";
import { clx } from "../sdk/clx.ts";
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
  /**
   * @default "default"
   * @description margin no eixo Y (cima e baixo)
   */
  marginDeskY?: "none" | "sm" | "default" | "lg" | "xl" | "xxl";
  /**
   * @default "default"
   * @description margin no eixo Y (cima e baixo)
   */
  marginMobiY?: "none" | "sm" | "default" | "lg" | "xl" | "xxl";
}

function GetStories({ stories, marginDeskY, marginMobiY }: Props) {
  return (
    <ul
      class={clx(
        "flex items-center sm:justify-center gap-4 overflow-x-auto",
        margin.y.desk[marginDeskY as keyof object ?? 'default'],
        margin.y.mobi[marginMobiY as keyof object ?? 'default']
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
            {storie.title
              ? <p className="text-center">{storie.title}</p>
              : ""}
          </a>
        );
      })}
    </ul>
  );
}

function Stories({ stories, marginDeskY, marginMobiY }: Props) {
  return (
    <>
      <Container children={{
        Component: GetStories,
        props: { stories, marginDeskY, marginMobiY }
      }}/>
    </>
  );
}

export default Stories;