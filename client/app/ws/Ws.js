import { CounterObj } from "../components/counterRoom.js";
import { useState } from "../../src/index.js";
import { state } from "../../src/index.js";

export const CreateWs = () => {
    return new Promise((resolve, reject) => {
        const [ws, setWs] = useState(new WebSocket("ws://localhost:8080/ws"))
        
        ws.onopen = () => {
            console.log("🔗 WebSocket connection opened");
            state.set("ws", ws);
            setWs(ws)
            resolve(true);
        };

        ws.onclose = () => {
            console.log("❌ WebSocket error");
            reject(false);
        };

        ws.onmessage = (data) => {
            const message = JSON.parse(data.data)
            switch (message.type) {
                case "waitting_room":
                    CounterObj.isInitialized = false
                    clearInterval(CounterObj.timer)
                    state.set('current_room', message.room)
                    break;
                case "chating":
                    const messages = state.get('messages') || []; // get current messages
                    state.set('messages', [...messages, message]); // append new message
                    const [messgess , setmessages] = useState(messages)
                    setmessages([...messages, message])
                    break;
                case "userhange":
                    state.set("username", message.username)
                    break
                default:
                    break;
            }


        }
    });
}


