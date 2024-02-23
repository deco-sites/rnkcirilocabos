import { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "../sdk/clx.ts";
import { margin as MarginObject } from "../constants.tsx";
import type { MarginInterface } from "../constants.tsx";
import Image from "apps/website/components/Image.tsx";
import Container from "./Layout/Container.tsx";

export interface Props {
  /**
   * @description Texto Alternativo da Imagem
   */
  alt: string;
  /**
   * @description Source (URL) da Imagem
   */
  src: ImageWidget;
  margin?: MarginInterface;
}

function SoloBanner({ alt, src, margin }: Props) {
  return (
    <Container>
      <Image
        src={src}
        alt={alt}
        width={1376}
        height={65}
        class={clx(
          "object-cover h-auto mx-auto",
          MarginObject.y.desk[margin?.deskMarginY ?? "none"],
          MarginObject.y.mobi[margin?.mobiMarginY ?? "none"],
          MarginObject.top.desk[margin?.deskMarginTop ?? "none"],
          MarginObject.top.mobi[margin?.mobiMarginTop ?? "none"],
          MarginObject.bottom.desk[margin?.deskMarginBottom ?? "none"],
          MarginObject.bottom.mobi[margin?.mobiMarginBottom ?? "none"],
        )}
      />
    </Container>
  );
}

export default SoloBanner;
