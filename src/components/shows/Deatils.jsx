//just another way to destrucure & create a component.

import { styled } from "styled-components";

const  Deatils = props => {
    const {status, premiered, network} = props;
  return (
    <DetailsWrapper>
        <p>Status: {status}</p>
        <p>
            Premiered: {premiered} {!!network && `on ${network.name}`}
        </p>
    </DetailsWrapper>
  )
  }

export default Deatils

const DetailsWrapper = styled.div`
  p {
    margin: 5px 0;
  }
`;