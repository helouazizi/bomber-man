
import { state, useState } from "../../src/index.js";
export const CounterObj = {
    isInitialized: false,
    timer: undefined
}

const counterRoom = () => {
    const [stateCounter,setCounter] = useState(state.get("counter"))
    if (!CounterObj.isInitialized) {
        CounterObj.isInitialized = true;
        let isRestartPhase = false;
        state.set("counter", 20);
        CounterObj.timer = setInterval(() => {
            let counter = state.get("counter");
            if (counter === 0) {
                if (isRestartPhase) {
                    clearInterval(CounterObj.timer);
                    return;
                } else {
                    state.get('ws').send(JSON.stringify({
                        type: "close-room",
                        id: state.get('current_room').id
                    }))
                    state.set('current_room', { ...state.get('current_room'), available: false })
                    state.set("counter", 10);
                    setCounter( state.get("counter"))
                    isRestartPhase = true;
                    return;
                }
            }
            state.set("counter", counter - 1);
            setCounter(state.get("counter"))
        }, 1000);
    }

    const counter = state.get("counter");
    return {
        tag: "div",
        attrs: {
            class: "wait-counter"
        },
        text: (counter || counter === 0) ? counter : 20
    };
};

export default counterRoom;
