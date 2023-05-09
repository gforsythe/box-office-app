import { useParams } from "react-router-dom"
function Show() {
  const {showId} = useParams();
  
  return (
    <div>Show page for {showId}</div>
  )
}

export default Show