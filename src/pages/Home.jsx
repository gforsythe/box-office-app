import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchForShows, searchForPeople } from '../api/tvMaze';
import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';
import ActorsGrid from '../components/actors/ActorsGrid';
import { TextCenter } from '../components/common/TextCenter';


function Home() {
  const [filter, setFilter] = useState(null);
  //inside the reducer function - current state and the action
  /*
  const reducerfn = (currentCounter, action) => {
    //switch case for each action that occurs. Action is an object
    switch (action.type) {
      case 'INCREMENT': return currentCounter + 1;
      case 'DECREMENT': return currentCounter - 1;
      case 'RESET': return 0
      case 'SET_VALUE': 
      return action.newCounterValue
    }
    return 0;
  }*/
  //these states are not needed for data fetching when using a library
  // const [apiData, setApiData] = useState(null);
  // const [apiDataError, setApiDataError] = useState(null);

  //using React Query to filter out/ enable searches on the form
  
  // use Reducer takes 2 parameters - its an array therefore destructre
  /*const [counter, dispatch] = useReducer(reducerfn, 0);

  //functions for each dispatch/action
  const onIncrement = () => {
    dispatch({type: 'INCREMENT'})
  }

  const onDecrement = () =>{
    dispatch({type: 'DECREMENT'})
  }

  const onReset = () => {
    dispatch({type: 'RESET'})

  }

  const onSetValue = () => {
    dispatch({type: 'SET_VALUE', newCounterValue:500})

  }
*/

  const { data: apiData, error: apiDataError } = useQuery({
    queryKey: ['search', filter],
    queryFn: () =>
      filter.searchOption === 'shows'
        ? searchForShows(filter.q)
        : searchForPeople(filter.q),
    enabled: !!filter,
    refetchOnWindowFocus: false,
  });

  //submits the form request from the button
  const onSearch = ({ q, searchOption }) => {
    setFilter({ q, searchOption });

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
      return <TextCenter>Error Occured: {apiDataError.message}</TextCenter>;
    }

    if (apiData?.length === 0) {
      return <TextCenter>No results - Sorry!</TextCenter>;
    }

    if (apiData) {
      return apiData[0].show ? (
        <ShowGrid shows={apiData} />
      ) : (
        <ActorsGrid actors={apiData} />
      );
    }
    return null;
  };

  return (
    <div>
    
      <SearchForm onSearch={onSearch} />
      {/* These are for the example of useReducer for lines 10 and on
      <div>Counter: {counter}</div>
       <button type='button'onClick={onIncrement}>Increment</button> 
      <button type='button'onClick={onDecrement}>Decrement</button>
      <button type='button'onClick={onReset}>Reset</button>
      <button type='button'onClick={onSetValue}>SET TO 500</button>*/}

      <div>{renderApiData()}</div>
    </div>
  );
}

export default Home;
