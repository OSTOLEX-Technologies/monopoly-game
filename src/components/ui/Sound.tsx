import styled from "styled-components";
import {RightTopSection} from "./common";
import {useState} from "react";
import {soundSettings} from "../../viewGlobals";

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
    const [musicOn, setMusicOn] = useState(true);
    const [soundOn, setSoundOn] = useState(true);

    return (
        <RightTopSection>
            <SFXRow>
                <SFX onClick={() => {
                    console.log(musicOn);
                    setMusicOn((prev) => {
                        soundSettings.setMusicK(prev ? 0 : 1)
                        return !prev;
                    })
                }}>
                    {musicOn ? <img
                        src= {import.meta.env.BASE_URL + "vault/music on.png"}
                        height="100%"
                        width="100%"
                    /> : <img
                        src= {import.meta.env.BASE_URL + "vault/music off.png"}
                        height="100%"
                        width="100%"
                    />
                    }
                </SFX>
                <SFX onClick={() => {
                    setSoundOn((prev) => {
                        soundSettings.setSoundsK(prev ? 0 : 1)
                        return !prev;
                    })
                }}>
                    {soundOn ? <img
                        src= {import.meta.env.BASE_URL + "vault/sound on.png"}
                        height="100%"
                        width="100%"
                    /> : <img
                        src= {import.meta.env.BASE_URL + "vault/sound off.png"}
                        height="100%"
                        width="100%"
                    />
                    }
                </SFX>
            </SFXRow>
        </RightTopSection>
    );
}