// import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getShowById } from '../api/tvMaze';
import ShowMainData from '../components/shows/ShowMainData';
import Deatils from '../components/shows/Deatils';
import Seasons from '../components/shows/Seasons';
import Cast from '../components/shows/Cast';
import { styled } from 'styled-components';
import { TextCenter } from '../components/common/TextCenter';
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
  const { showId } = useParams();
  //calling the custom hook
  // const {showData, showError} = useShowById(showId);

  //Query
  const { data: showData, error: showError } = useQuery({
    queryKey: ['show', showId],
    queryFn: () => getShowById(showId),
    refetchOnWindowFocus: false,
  });

  if (showError) {
    return <TextCenter>We have an error: {showError.message}</TextCenter>;
  }

  if (showData) {
    return (
      <ShowPageWrapper>
        <BackHomeWrapper>
          <Link to="/"> Go Back Home </Link>
        </BackHomeWrapper>

        <ShowMainData
          image={showData.image}
          name={showData.name}
          rating={showData.rating}
          summary={showData.summary}
          genres={showData.genres}
        />

        <InfoBlock>
          <h2>Details</h2>
          <Deatils
            status={showData.status}
            premiered={showData.premiered}
            network={showData.network}
          />
        </InfoBlock>

        <InfoBlock>
          <h2>Seasions</h2>
          <Seasons seasons={showData._embedded.seasons} />
        </InfoBlock>

        <InfoBlock>
          <h2>Cast</h2>
          <Cast cast={showData._embedded.cast} />
        </InfoBlock>
      </ShowPageWrapper>
    );
  }

  return <TextCenter>Data is loading!</TextCenter>;
}

export default Show;

const BackHomeWrapper = styled.div`
  margin-bottom: 30px;
  text-align: left;
  a {
    padding: 10px;
    color: ${({ theme }) => theme.mainColors.dark};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ShowPageWrapper = styled.div`
  margin: auto;
  @media only screen and (min-width: 768px) {
    max-width: 700px;
  }
  @media only screen and (min-width: 992px) {
    max-width: 900px;
  }
`;

const InfoBlock = styled.div`
  margin-bottom: 40px;
  h2 {
    margin: 0;
    margin-bottom: 30px;
    font-size: 22px;
  }
`;
