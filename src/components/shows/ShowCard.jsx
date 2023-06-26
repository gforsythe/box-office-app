

const ShowCard = ({name, image, id, summary, onStarMeClick, isStarred}) => {
    const summaryStrip = summary ? summary.split(" ").slice(0, 10).join(" ").replace(/<.+?>/g, ''): 'No Desciption' ;



  return (
    <div>
        <img src={image} alt={name}/>
        <h1>{name}</h1>

        <p>{summaryStrip}</p>
        <div>
            <a href={`/show/${id}`}target={'blank'} rel="noreferrer">Read More</a>
            <button type="button" onClick={()=>onStarMeClick(id)}> {isStarred ? 'Unstar Me':'Star Me'}</button>
        </div>
    </div>
  )
}

export default ShowCard