import {LeftTopSection, RoundImage} from "./common";
import {SmallButton} from "./styledComponents";
import styled from "styled-components";
import {useEffect, useRef, useState} from "react";

const PlayerRowContainer = styled.div`
  font-family: Orbitron;
  font-size: 24px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: #fff;
  width: 100%;
`

const Username = styled.span`
  font-family: Orbitron;
  font-size: 1.3rem;
  word-wrap: break-word;
`

type PlayerRowProps = {
    logo: string;
    username: string;
    money: number;
    color: string;
}

const PlayerRow = (props: PlayerRowProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const moneyRef = useRef<HTMLDivElement>(null);
    const voteKickRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isHovered) {
            moneyRef.current!.style.display = "none";
            voteKickRef.current!.style.display = "block";
        } else {
            moneyRef.current!.style.display = "block";
            voteKickRef.current!.style.display = "none";
        }
    });

    return (
        <PlayerRowContainer key={props.username} style={{color: props.color}}
                            onMouseOver={() => setIsHovered(true)}
                            onMouseOut={() => setIsHovered(false)}
        >
            <RoundImage src={props.logo} width="40px" />
            <div style={{textAlign: "left"}}>
                <Username>{props.username}</Username>
            </div>
            <div style={{textAlign: "right", lineHeight: 1}} ref={moneyRef}>
                <span>{props.money}</span>
            </div>
            <SmallButton style={{width: "14rem"}} ref={voteKickRef}>
                <span style={{ paddingTop: "5px" }}>Vote-kick</span>
            </SmallButton>
        </PlayerRowContainer>
    )
};

type PlayersTableProps = {
    players: Array<{logo: string, username: string, money: number, color: string}>;
}

export const PlayersTable = (props: PlayersTableProps) => {
    return (
        <LeftTopSection>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                }}
            >
                {props.players!.map((player, index) =>
                    <PlayerRow key={index} logo={player.logo} username={player.username} money={player.money} color={player.color} />
                )}
            </div>
        </LeftTopSection>
    );
}