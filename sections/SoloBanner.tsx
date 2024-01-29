import Image from "apps/website/components/Image.tsx";

export interface Props {
  /**
   * @description Texto Alternativo da Imagem
   */
  alt: string;
  /**
   * @description Source (URL) da Imagem
   */
  src: string;
}

export default function SoloBanner({ alt, src }: Props) {
  return (
    <div class="container px-2">
      <Image
        src={src}
        alt={alt}
        width={1376}
        height={65}
        class="object-cover h-auto mx-auto"
      />
    </div>
  );
}
