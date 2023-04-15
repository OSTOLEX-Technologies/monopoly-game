import {Fragment, ReactNode, useEffect, useRef} from "react";
import {LeftBottomSection} from "./common";
import styled from "styled-components";

const HistoryMessageP = styled.p`
font-family: Orbitron;
font-size: 1rem;
word-wrap: break-word;
margin-top: 10px;
line-height: 1.5;
`;

type HistoryMessageProps = {
    // message in format: "(color).{username} sent 300$ to (color2).{username2}"
    message: string;
}

function HistoryMessage(props: HistoryMessageProps) {
    const regex = /(\([a-z]+\)\.{[a-zA-Z0-9.]+})/g;
    const parts = props.message.split(regex);
    const elements = parts.map((part, index) => {
        if (part === "") return <Fragment key={index}/>;
        if (part.match(regex)) {
            let color = part.split('.')[0];
            let username = part.split(".").slice(1).join('.')
            color = color.slice(1, -1);
            username = username.slice(1, -1);
            const style = { color };
            return (
                <span key={index} style={style}>{username}</span>
            );
        } else {
            return <span key={index}>{part}</span>;
        }
    });
    return <HistoryMessageP>{elements}</HistoryMessageP>;
}

type HistoryProps = {
    history: Array<string>;
}

const HistoryContainer = styled.div`
width: 20rem;
height: 500px;
overflow-y: scroll;
color: white;
padding: 1rem;
border-radius: 1rem;
scrollbar-width: none;
&::-webkit-scrollbar { width: 0; };
-ms-overflow-style: none;
`;

export function History(props: HistoryProps) {
    const historyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to the bottom of the history
        historyRef.current!.scrollTop = historyRef.current!.scrollHeight;
    });

    return (
        <LeftBottomSection>
            <HistoryContainer ref={historyRef}>
                {props.history.map((message, index) => <HistoryMessage key={index} message={message} />)}
            </HistoryContainer>
        </LeftBottomSection>
    );
}