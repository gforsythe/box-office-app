import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchForShows, searchForPeople } from '../api/tvMaze';
import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';
import ActorsGrid from '../components/actors/ActorsGrid';

function Home() {
  //these states are not needed for data fetching when using a library 
    // const [apiData, setApiData] = useState(null);
  // const [apiDataError, setApiDataError] = useState(null);

  //using React Query to filter out/ enable searches on the form
  const [filter, setFilter]= useState(null)

  const {data: apiData, error:apiDataError} = useQuery({
    queryKey:['search',filter ],
    queryFn: () => filter.searchOption === 'shows'? searchForShows(filter.q) : searchForPeople(filter.q),
    enabled: !!filter,
    refetchOnWindowFocus: false,
  })

  //submits the form request from the button
  const onSearch = ({ q, searchOption }) => {
    setFilter({q, searchOption})


//not needed anymore due to library for fetching
    // try {
    //   setApiDataError(null);

    //   let result;

    //   if (searchOption === 'shows') {
    //     result = await searchForShows(q);
    //   } else {
    //     result = await searchForPeople(q);
    //   }
    //   setApiData(result);
    // } catch (error) {
    //   setApiDataError(error);
    // }
  };
  


  const renderApiData = () => {
    
    if (apiDataError) {
      return <div>Error Occured: {apiDataError.message}</div>;
    }

    if(apiData?.length === 0){
      return <>No results - Sorry!</>
    }

    if (apiData) {
      return apiData[0].show ? <ShowGrid shows={apiData}/> : <ActorsGrid actors={apiData}/>;
    }
    return null;
  };

  return (
    <div>
      <SearchForm onSearch={onSearch} />

      <div>{renderApiData()}</div>
    </div>
  );
}

export default Home;
