import { useState } from 'react';
import { searchForShows, searchForPeople } from '../api/tvMaze';
import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';
import ActorsGrid from '../components/actors/ActorsGrid';

function Home() {
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);

  //submits the form request from the button
  const onSearch = async ({ q, searchOption }) => {
    try {
      setApiDataError(null);

      let result;

      if (searchOption === 'shows') {
        result = await searchForShows(q);
      } else {
        result = await searchForPeople(q);
      }
      setApiData(result);
    } catch (error) {
      setApiDataError(error);
    }
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
