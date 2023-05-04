

const ActorCard = ({name, image, gender, country, deathday, birthday}) => {
 
  return (
    <div>
        <img src={image} alt={name}/>
        <h1>{name} {!!gender && `(${gender})`}</h1>
        <p>{country ? `Comes from ${country}` : 'Country not known'}</p>
        {!!birthday && <p>Born {birthday}</p>}
        <p>{deathday? `Died on ${deathday}`: 'Alive'}</p>
        
       
  
    </div>
  )
}

export default ActorCard;