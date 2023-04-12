import { useState } from "react"


function Home() {
const [searchString, setSearchString] =  useState('');

const onSearchInputChange = (ev) => {
  setSearchString(ev.target.value);
}

const onSearch = async (ev) => {
ev.preventDefault();

const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchString}`)
const body = await response.json()
console.log(body);



}
  return (
    <div>
      <form  onSubmit={onSearch}>
      <input type="text" value={searchString} onChange={onSearchInputChange}/>  
      <button type="submit" >Search</button>

      </form>
      
    </div>
  )
}

export default Home