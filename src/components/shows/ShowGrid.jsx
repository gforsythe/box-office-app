import { useReducer, useEffect } from "react"
import ShowCard from "./ShowCard"


const usePersistedReducer = (reducer, initalState, localStorageKey) => {
  const [state, dispatch] = useReducer(reducer, initalState,(inital) => {
    const persistedValue = localStorage.getItem(localStorageKey)

    return persistedValue ? JSON.parse(persistedValue) : inital
  });
 useEffect(() => {
  localStorage.setItem(localStorageKey, JSON.stringify(state))

 }, [state,localStorageKey])

 return [state, dispatch]
}


const starredShowsReducer = (currentStarred, action) => {
switch (action.type) {
  case 'STAR': return currentStarred.concat(action.showId)
  case 'UNSTAR': return currentStarred.filter(showId => showId !== action.showId)
  default:
    return currentStarred
  
  }

};



const  ShowGrid = ({shows}) => {

  const [starredShows, dispatchStarred] = usePersistedReducer(starredShowsReducer, [],'starredShows');

  const onStarMeClick = (showId) => {
      const isStarred = starredShows.includes(showId);

      if(isStarred){
        dispatchStarred({type: 'UNSTAR', showId})
      } else {
        dispatchStarred({type: 'STAR', showId})
      }
  }

  return (
    <div>{shows.map(data => (
        <ShowCard key={data.show.id} name={data.show.name} image={data.show.image ? data.show.image.medium : '/image-not-found.png'} id={data.show.id} summary={data.show.summary} onStarMeClick={onStarMeClick} />
    ))}
    </div>
  )
} 

export default ShowGrid