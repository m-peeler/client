import React, { useReducer, useState } from "react";
import { Channel } from "stream-chat";
import Board from "./Board";

export default function Game(props: {channel: Channel}) {

    const [playersJoined, setPlayersJoined] = useState(props.channel.state.watcher_count === 2);

    props.channel.on("user.watching.start", () => setPlayersJoined(props.channel.state.watcher_count === 2));

    if (!playersJoined) {
        return (
            <h1> Waiting for other player...</h1>
        )
    }

    return (
        <div className="gameBoard">
            <Board depth={3} />
        </div>
    )
}