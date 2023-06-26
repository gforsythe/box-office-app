import { useStarredShows } from "../lib/useStarredShows";

function Starred() {
  const [starredShows] = useStarredShows()


  return <div>Starred Page, starred {starredShows.length}</div>;
}

export default Starred;
