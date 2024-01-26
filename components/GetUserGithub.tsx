import type { JSX } from "preact";
import { useState } from "preact/hooks";

export interface Props {
  /** @title Texto do Botão */
  buttonText?: string;
}

function GetUserGithub({ buttonText }: Props) {
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(false||Object);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    try {
      setStart(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const userName = formData.get("userName");
      const res = await fetch("https://api.github.com/users/" + userName);
      const resp = await res.json();
      setResponse(resp);
    } catch (e) {
      console.log(e);
    }
  };

  function List() {
    if(start) {
      if(response) {
        const {
          avatar_url,
          name,
          login,
          location,
          company
        } = response;

        return (
          <div class="mt-5 p-5 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-white">
            <div class="flex justify-center">
              <img class="w-24 h-24 mb-2 rounded-full" src={avatar_url} alt={name + ' Image'} />
            </div>
            <p class="text-lg text-center">{name}</p>
            <p class="text-sm text-center">{login}</p>
            <dl class="mt-3">
              {location ? (
                <>
                  <dt class="text-sm italic text-slate-400">Location:</dt>
                  <dd>{location}</dd>
                </>
              ) : <></>}
              {company ? (
                <>
                  <dt class="mt-2 text-sm italic text-slate-400">Company:</dt>
                  <dd>{company}</dd>
                </>
              ) : <></>}
            </dl>
          </div>
        )
      } else {
        return <div>Carregando...</div>
      }
    } else {
      return <></>
    }
  }
  return (
    <div class="container p-5">
      <form onSubmit={handleSubmit}>
        <div class="flex flex-wrap items-center gap-3">
          <input
            type="text"
            name="userName"
            placeholder="Nome do Usuário"
            class="input input-bordered"
            required
          />
          <button type="submit" class="btn">{buttonText ? buttonText : 'Buscar'}</button>
        </div>
        <List />
      </form>
    </div>
  );
}

export default GetUserGithub;
