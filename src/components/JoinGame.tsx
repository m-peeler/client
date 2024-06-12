import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { Channel } from "stream-chat";
import { Channel as ChannelJSX } from "stream-chat-react";
import { DefaultStreamChatGenerics, useChatContext } from "stream-chat-react";
import Game from "./Game";

export default function JoinGame () {
    const [rivalUsername, setRivalUsername] = useState('');
    const { client } = useChatContext();

    const findRival = useMutation({
        mutationFn: async () => {
            return await client.queryUsers(
                {name: { $eq: rivalUsername }}
            );
        }}
    ) 

    const createChannel = useMutation({
        mutationFn: async ({personalID, rivalID} : {personalID: string, rivalID: string}) => {
            const channel = client.channel
            (  
                "messaging", 
                undefined, 
                {members: [personalID, rivalID] }
            )
            await channel.watch();
            return channel;
        }
    })

    useEffect(() => {
        if (client.userID && findRival.isSuccess) {
            if( findRival.data.users.length === 0) {
            alert('User not found');
            } else {
                createChannel.mutate({
                    personalID: client.userID, 
                    rivalID: findRival.data.users[0].id
                })
            }
        }
    }, [findRival.isSuccess, findRival.data, client.userID])

    return (
        <>
            {!!createChannel.data ? 
                    <ChannelJSX channel={createChannel.data}>
                        <Game channel={createChannel.data} />
                    </ChannelJSX>
                :
                <div className="joinGame">
                    <h4>Create Game</h4>
                    <input
                        placeholder="Username of rival..."
                        onChange={(event) => setRivalUsername(event.target.value)} 
                    />
                    <button onClick={() => findRival.mutate()}> Join/Start Game </button>
                </div>
            }
        </>
    )
}