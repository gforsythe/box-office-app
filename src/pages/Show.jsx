// import { useEffect, useState } from "react";
import {useQuery,} from '@tanstack/react-query'
import { useParams } from "react-router-dom";
import { getShowById } from "../api/tvMaze";
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
  const {showId} = useParams();
  //calling the custom hook
  // const {showData, showError} = useShowById(showId);
  
  //Query
  const {data: showData, error: showError} = useQuery({
    queryKey:['show', showId], 
    queryFn:() => getShowById(showId)
  });


  if(showError){
    return <div>We have an error: {showError.message}</div>
  }

  if(showData){
    return <div>Got show data: {showData.name}</div>
  }


  return (
    <div>Data is loading!</div>
  )
}

export default Show