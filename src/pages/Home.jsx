import { useState } from 'react';
import { searchForShows, searchForPeople } from '../api/tvMaze';

function Home() {
  const [searchString, setSearchString] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);
  const [searchOption, setSearchOption] = useState('shows')




  //holds the various changes to the input field
  const onSearchInputChange = ev => {
    setSearchString(ev.target.value);
  };
  //submits the form request from the button
  const onSearch = async ev => {
    ev.preventDefault();

    try {
      setApiDataError(null);
      if(searchOption === 'shows'){
        const result = await searchForShows(searchString);
        setApiData(result);
      } else {
        const result = await searchForPeople(searchString);
        setApiData(result);
      }
   
    } catch (error) {
      setApiDataError(error);
    }
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error Occured: {apiDataError.message}</div>;
    }

    if (apiData) {
      return apiData[0].show ? apiData.map(data => (
        <div key={data.show.id}>{data.show.name}</div>
      )) : apiData.map(data => (
        <div key={data.person.id}>{data.person.name}</div>
      ))
    }
    return null;
  };



  const onRadioChange = (ev) => {
    setSearchOption(ev.target.value)
  }


  return (
    <div>
      <form onSubmit={onSearch}>
        <input type="text" value={searchString} onChange={onSearchInputChange}
        />
        <label>
          Shows
          <input type="radio" name="search-option" value="shows" checked={searchOption === 'shows'} onChange={onRadioChange} />
        </label>

        <label>
          Actors
          <input type='radio' name='search-option' value='actors' checked={searchOption === 'actors'} onChange={onRadioChange}/>
        </label>

        <button type="submit">Search</button>
      </form>
      <div>{renderApiData()}</div>
    </div>
  );
}

export default Home;
