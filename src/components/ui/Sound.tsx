import styled from "styled-components";
import {RightTopSection} from "./common";

export const SFX = styled.button`
  padding: 0;
  border: 0;
  height: 86px;
  width: 86px;
  background-color: transparent;
`

export const SFXRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`
export const Sound = () => {
return (
    <RightTopSection>
        <SFXRow>
        <SFX>
            <img
                src={import.meta.env.BASE_URL + "music on.png"}
                height="100%"
                width="100%"
            />
        </SFX>
        <SFX>
            <img
                src={import.meta.env.BASE_URL + "sound on.png"}
                height="100%"
                width="100%"
            />
        </SFX>
        </SFXRow>
    </RightTopSection>
);
}