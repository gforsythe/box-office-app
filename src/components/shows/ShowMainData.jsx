
function ShowMainData({image, name, rating, summary, genres}) {
  return (
    <div>
        <img src={image ? image.original : '/not-found-image.png'} alt={name}/>
        <div>
        <h3>{name}</h3>
        <div>{rating.average || "N/A"}</div>
        <div dangerouslySetInnerHTML={ {__html:  summary}} />
        <div>Generes:
            <div>
                {genres.map((genre)=> <spam key={genre}>{genre}</spam>)}
            </div>
        </div>

        </div>

    </div>
  )
}

export default ShowMainData