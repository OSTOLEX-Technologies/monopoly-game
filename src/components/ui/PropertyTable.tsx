import {SmallButton} from "./styledComponents";
import {RightBottomSection, RightTopSection, RoundImage} from "./common";
import styled from "styled-components";

const PropertyRow = styled.div`
  font-family: Orbitron;
  font-size: 24px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: #fff;
`

const PropertyName = styled.span`
  font-family: Orbitron;
  font-size: 16px;
  color: #fff;
  word-wrap: break-word;
`

type PlayerRowProps = {
    logo: string;
    propertyName: string;
}

const PlayerRow = (props: PlayerRowProps) => (
    <PropertyRow>
        <RoundImage width="40px" height="40px" src={props.logo}/>
        <div style={{textAlign: "center", width: "6rem", lineHeight: 0.8}}>
            <PropertyName>{props.propertyName}</PropertyName>
        </div>
        <SmallButton style={{width: "120px"}}>
            <span>mortgage</span>
        </SmallButton>
    </PropertyRow>
);

const ProperyTableContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 500px;
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar { width: 0; };
    -ms-overflow-style: none;
`

type PropertyTableProps = {
    properties: Array<{ logo: string; propertyName: string }>;
}

export const PropertyTable = (props: PropertyTableProps) => (
    <RightBottomSection style={{top: "150px", }}>
        <h2 style={{textAlign: "center"}}>Your property:</h2>
        <ProperyTableContainer>
                {props.properties.map((player, index) => (
                    <PlayerRow key={index} logo={player.logo} propertyName={player.propertyName}/>
                ))}
        </ProperyTableContainer>
    </RightBottomSection>
);
