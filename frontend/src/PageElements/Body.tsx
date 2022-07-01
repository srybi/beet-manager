import styled from "styled-components";
import Compost from "../Compost/Compost";
import * as React from "react";
import BedError from "../Bed/BedError";


const BodyWrapper = styled.main`
  grid-column: 1 / 3;
  display: flex;
  justify-content: center;
  margin: 40px;
`;

function Body () {
    return (
        <>
            <BodyWrapper>
                <Compost/>
            </BodyWrapper>
            <BodyWrapper>
                <BedError/>
            </BodyWrapper>
        </>
    );
}
export default Body;
