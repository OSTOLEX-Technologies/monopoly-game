import styled from "styled-components";
import {RightTopSection} from "./common";

export const SFX = styled.button`
  padding: 0;
  border: 0;
  height: 86px;
  width: 86px;
  background-color: transparent;

  &:focus {
    outline: none;
    border: 0;
`

export const SFXRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 480px;
`
export const Sound = () => {
return (
    <RightTopSection>
        <SFXRow>
        <SFX>
            <img
                src= {import.meta.env.BASE_URL + "vault/music on.png"}
                height="100%"
                width="100%"
            />
        </SFX>
        <SFX>
            <img
                src= {import.meta.env.BASE_URL + "vault/sound on.png"}
                height="100%"
                width="100%"
            />
        </SFX>
        </SFXRow>
    </RightTopSection>
);
}