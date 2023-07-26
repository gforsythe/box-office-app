import { useState } from 'react';
import { useSearchString } from '../lib/useSearch';
import CustomRadio from './CustomRadio';

const SearchForm = ({ onSearch }) => {
  const [searchString, setSearchString] = useSearchString();
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
      <CustomRadio
        label="Shows"
        name="search-option"
        value="shows"
        checked={searchOption === 'shows'}
        onChange={onRadioChange}
      />

      <CustomRadio
        label="Actors"
        name="search-option"
        value="actors"
        checked={searchOption === 'actors'}
        onChange={onRadioChange}
      />

      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
