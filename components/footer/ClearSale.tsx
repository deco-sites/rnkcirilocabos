import Image from "apps/website/components/Image.tsx";

interface Props {
  content?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

function ClearSale({ content }: Props) {
  return (
    <>
      {content && (
        <Image
          src={content?.src}
          alt={content?.alt}
          width={content?.width}
          height={content?.height}
        />
      )}
    </>
  );
}

export default ClearSale;
