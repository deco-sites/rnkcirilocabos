import { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "../sdk/clx.ts";
import { margin } from "../constants.tsx";
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
  /**
   * @default "default"
   * @description margin no eixo Y (cima e baixo)
   */
  deskMarginY?: "none" | "sm" | "default" | "lg" | "xl" | "xxl";
  /**
   * @default "default"
   * @description margin no eixo Y (cima e baixo)
   */
  mobiMarginY?: "none" | "sm" | "default" | "lg" | "xl" | "xxl";
}

function GetSoloBanner(
  {
    alt,
    src,
    deskMarginY,
    mobiMarginY,
  }: Props,
) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1376}
      height={65}
      class={clx(
        "object-cover h-auto mx-auto",
        margin.y.desk[deskMarginY ?? "none"],
        margin.y.mobi[mobiMarginY ?? "none"]
      )}
    />
  );
}

function SoloBanner(props: Props) {
  return (
    <>
      <Container
        children={{
          Component: GetSoloBanner,
          props: { ...props },
        }}
      />
    </>
  );
}

export default SoloBanner;
