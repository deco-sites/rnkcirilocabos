export interface Cep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  uf: string;
  gia: string;
  ddd: string;
}

export interface Props {
  cep: string;
}

export default async function loader(
  props: Props,
): Promise<Cep> {
  const res = await fetch(`https://viacep.com.br/ws/${props.cep}/json/`);
  const resp = await res.json();
  return resp as Cep;
}
