import { Link } from "react-router-dom"


const ShowCard = ({name, image,  summary}) => {
    const summaryStrip = summary ? summary.split(" ").slice(0, 10).join(" ").replace(/<.+?>/g, ''): 'No Desciption' ;
  return (
    <div>
        <img src={image} alt={name}/>
        <h1>{name}</h1>

        <p>{summaryStrip}</p>
        <div>
            <Link to='/'>Read More</Link>
            <button type="button"> Star Me</button>
        </div>
    </div>
  )
}

export default ShowCard