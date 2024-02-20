interface Props {
  stores?: {
    label: string;
    href: string;
  }[];
}

function Stores({ stores }: Props) {
  return (
    <>
      {stores && stores.length > 0 && (
        <ul>
          {stores.map((store, index) => (
            <li>
              <p class="text-slate-400">
                <small>Loja {index + 1}</small>
              </p>
              <a href={store.href} class="underline">{store.label}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Stores;
