import Container from "./Layout/Container.tsx";
import Grid from "./Layout/Grid.tsx";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  alt: string;
  /**
   * @default https://placehold.co/756x250
   */
  src: ImageWidget;
  href: string;
  /**
   * @default 756
   */
  width: number;
  /**
   * @default 250
   */
  height: number;
}

export interface Banners {
  banners: Banner[];
  /** @default 2 */
  colsDesk: "1" | "2" | "3" | "4";
  /** @default 1 */
  colsMobi: "1" | "2" | "3" | "4";
}

function Banners({ banners, colsDesk, colsMobi }: Banners) {
  return (
    <Container>
      <Grid
        desktop={{ cols: colsDesk, gap: "4", flow: "Row" }}
        mobile={{ cols: colsMobi, gap: "4", flow: "Row" }}
      >
        {banners && banners.length > 0 && banners.map((banner) => {
          const { href, src, alt, width, height } = banner;
          return (
            <div>
              <a href={href}>
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  class="rounded object-cover"
                />
              </a>
            </div>
          );
        })}
      </Grid>
    </Container>
  );
}

export default Banners;
