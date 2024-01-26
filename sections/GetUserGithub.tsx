import GetUserGithubIsland from '../islands/GetUserGithub.tsx';
import type { Props } from "$store/components/GetUserGithub.tsx";

function GetUserGithub({ buttonText }: Props) {
  return (
    <GetUserGithubIsland buttonText={buttonText} />
  );
}

export default GetUserGithub;
