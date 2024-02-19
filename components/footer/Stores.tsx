interface Props {
  content?: {
    stores?: {
      label: string;
      href: string;
    }[];
  };
}

function Stores({ content }: Props) {
  return (
    <>
      {content?.stores && content?.stores.length > 0 && (
        <ul>
          {content.stores.map((store, index) => (
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
