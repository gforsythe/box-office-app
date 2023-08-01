import { getShowsByIds } from "../api/tvMaze";
import ShowGrid from "../components/shows/ShowGrid";
import { useStarredShows } from "../lib/useStarredShows";
import { useQuery } from "@tanstack/react-query";
import { TextCenter } from "../components/common/TextCenter";

function Starred() {
  const [starredShowsIds] = useStarredShows();


  const {data: starredShows, error:starredShowsError} = useQuery({
    queryKey:['starred', starredShowsIds ],
    queryFn:() => getShowsByIds(starredShowsIds).then(result => result.map(show => ({show}))),
    refetchOnWindowFocus: false,
  })


if(starredShows?.length === 0 ){
  return <TextCenter>No shows are starred</TextCenter>
} 

if(starredShows?.length > 0){
  return <ShowGrid shows={starredShows}/>
} 
 

if (starredShowsError){
  return <TextCenter>There was an error: {starredShowsError.message}</TextCenter>
}

  return <TextCenter>Shows are still loading...</TextCenter>
}

export default Starred;
