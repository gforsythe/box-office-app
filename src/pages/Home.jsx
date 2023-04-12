import { useState } from 'react';
import { searchForShows } from '../api/tvMaze';

function Home() {
  const [searchString, setSearchString] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);
  //holds the various changes to the input field
  const onSearchInputChange = ev => {
    setSearchString(ev.target.value);
  };
  //submits the form request from the button
  const onSearch = async ev => {
    ev.preventDefault();

    try {
      setApiDataError(null);
      const result = await searchForShows(searchString);
      setApiData(result);
    } catch (error) {
      setApiDataError(error);
    }
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error Occured: {apiDataError.message}</div>;
    }

    if (apiData) {
      return apiData.map(data => (
        <div key={data.show.id}>{data.show.name}</div>
      ));
    }
    return null;
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        <input
          type="text"
          value={searchString}
          onChange={onSearchInputChange}
        />
        <button type="submit">Search</button>
      </form>
      <div>{renderApiData()}</div>
    </div>
  );
}

export default Home;
