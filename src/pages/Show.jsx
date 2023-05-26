import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShowById } from "../api/tvMaze";
function Show() {
  const {showId} = useParams();
  const [showData, setShowData] = useState(null);
  const [showError, setShowError] = useState(null)
  useEffect(() =>{
    // getShowById()
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