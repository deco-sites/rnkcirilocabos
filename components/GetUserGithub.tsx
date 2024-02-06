import type { JSX } from "preact";
import { useState } from "preact/hooks";

export interface Props {
  /** @title Texto do Botão */
  buttonText?: string;
}

function GetUserGithub({ buttonText }: Props) {
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(false || Object);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    try {
      setStart(true);
      setResponse(false);
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
    return (
      <>
        {start
          ? (
            <>
              <div class="mt-5 p-5 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-white">
                {start && !response
                  ? (
                    <>
                      <p class="text-lg text-center">Carregando...</p>
                    </>
                  )
                  : (
                    <>
                      {response.message
                        ? (
                          <>
                            <p class="text-lg text-center">
                              {response.message}
                            </p>
                          </>
                        )
                        : (
                          <>
                            <div class="flex justify-center">
                              <img
                                class="w-24 h-24 mb-2 rounded-full"
                                src={response.avatar_url}
                                alt={response.name + " Image"}
                              />
                            </div>
                            <p class="text-lg text-center">{response.name}</p>
                            <p class="text-sm text-center">{response.login}</p>
                            {response.location || response.company
                              ? (
                                <>
                                  <dl class="mt-3">
                                    {response.location
                                      ? (
                                        <>
                                          <dt class="text-sm italic text-slate-400">
                                            Location:
                                          </dt>
                                          <dd>{response.location}</dd>
                                        </>
                                      )
                                      : <></>}
                                    {response.company
                                      ? (
                                        <>
                                          <dt class="mt-2 text-sm italic text-slate-400">
                                            Company:
                                          </dt>
                                          <dd>{response.company}</dd>
                                        </>
                                      )
                                      : <></>}
                                  </dl>
                                </>
                              )
                              : <></>}
                          </>
                        )}
                    </>
                  )}
              </div>
            </>
          )
          : <></>}
      </>
    );
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
          <button type="submit" class="btn">
            {buttonText ? buttonText : "Buscar"}
          </button>
        </div>
        <List />
      </form>
    </div>
  );
}

export default GetUserGithub;
