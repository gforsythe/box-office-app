// import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getShowById } from '../api/tvMaze';
import ShowMainData from '../components/shows/ShowMainData';
import Deatils from '../components/shows/Deatils';
import Seasons from '../components/shows/Seasons';
import Cast from '../components/shows/Cast';
//Custom Hook
/*
For Data Fetching try to not use useEffect. Better way is to use a library.
const useShowById = (showId) => {
  //Using React Hooks
  const [showData, setShowData] = useState(null);
  const [showError, setShowError] = useState(null)
  useEffect(() =>{
    // getShowById()
    //with custom logic = custom hook
    async function fetchData(){
      try {
        const response = await getShowById(showId);
        setShowData(response)

      }catch (error){
        setShowError(error)
      }
    
    }

    fetchData()

  }, [showId])
  return {showData, showError}
}*/

function Show() {
  const { showId } = useParams();
  //calling the custom hook
  // const {showData, showError} = useShowById(showId);

  //Query
  const { data: showData, error: showError } = useQuery({
    queryKey: ['show', showId],
    queryFn: () => getShowById(showId),
    refetchOnWindowFocus: false,
  });

  
  

  if (showError) {
    return <div>We have an error: {showError.message}</div>;
  }

  if (showData) {
    return (
      <div>
        <Link to='/'> Go Back Home </Link>
        
        <ShowMainData image={showData.image} name={showData.name} rating={showData.rating} summary={showData.summary} genres={showData.genres}/>
        <div>
          <h2>Details</h2>
          <Deatils status={showData.status} premiered={showData.premiered} network={showData.network} />
        </div>
        <div>
          <h2>Seasions</h2>
          <Seasons seasons={showData._embedded.seasons}/>
        </div>
        <div>
          <h2>Cast</h2>
          <Cast cast={showData._embedded.cast} />
        </div>
      </div>
    );
  }

  return <div>Data is loading!</div>;
}

export default Show;
