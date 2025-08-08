import { CreateWs } from "../ws/Ws.js"
import { state } from "../../src/index.js";

function Joinning() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state.get("username").trim().length > 0) {
            try {
                await CreateWs();
                const socket = state.get("ws")
                socket.send(JSON.stringify({
                    type: "join",
                    username: state.get("username")
                }))

                // state.set('route', "/waitting");
                // uding location hashe to change the route 
                location.hash = "#/waiting";
            } catch (err) {
                console.log(err);
            }
        }

    };

    return {
        tag: "div",
        attrs: {
            class: "container",
        },
        children: [
            {
                tag: "h1",
                attrs: {
                    class: 'title'
                },
                text: "bomberman-dom"
            },
            {
                tag: 'form',
                attrs: {
                    onsubmit: handleSubmit,
                    class: "join-form"
                },
                children: [
                    {
                        tag: "input",
                        attrs: {
                            placeholder: "Enter your name",
                            maxlength: 20,
                            autofocus: true,
                            onchange: (e) => { state.set('username', e.target.value) }
                        }
                    }, {
                        tag: "button",
                        attrs: {
                            type: 'submit',
                        },
                        text: 'Join'

                    }
                ]
            }
        ]

    }

}

export default Joinning