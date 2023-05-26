import { useState, } from 'react';

const SearchForm = ({ onSearch }) => {
  const [searchString, setSearchString] = useState('');
  const [searchOption, setSearchOption] = useState('shows');



  /* UseEffect notes:

    Use Effect will always run once
    
    console.log('rerender bro');

    useEffect(() => {
    console.log('search option changes');

      return () => {
      console.log('componenet unmounts');
      }
    }, [searchOption]) 
    
    when there is a dependency array the return will run the cleanup for each effect in the dependency array*/




  //holds the various changes to the input field
  const onSearchInputChange = ev => {
    setSearchString(ev.target.value);
  };
  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  const onSubmit = ev => {
    ev.preventDefault();

    const options = {
      q: searchString,
      searchOption,
    };
    onSearch(options);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={searchString} onChange={onSearchInputChange} />
      <label>
        Shows
        <input
          type="radio"
          name="search-option"
          value="shows"
          checked={searchOption === 'shows'}
          onChange={onRadioChange}
        />
      </label>

      <label>
        Actors
        <input
          type="radio"
          name="search-option"
          value="actors"
          checked={searchOption === 'actors'}
          onChange={onRadioChange}
        />
      </label>

      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
