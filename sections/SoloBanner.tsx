export interface Props {
  alt: string;
  src: string;
}

export default function SoloBanner({ alt, src }: Props) {
  return <img src={src} alt={alt} />;
}
