import useWebSocket from "react-use-websocket"
import React, { useState } from "react"

const MessageInterface =()=>
{
    const [newMessages, setNewMessages] = useState<string[]>([]);
    const [message,setMessage]  = useState("")
    const socketUrl = "ws://127.0.0.1:8080/ws/test"

    

const {sendJsonMessage} = useWebSocket(socketUrl,
    {
        onOpen:()=>
        {
            console.log("connected")
        },
        onClose:()=>
        {
            console.log("Disconnected")
        },
        onError:()=>
        {
            console.log("Error")
        },
        onMessage:(msg)=>
        {
            const data = JSON.parse(msg.data)
            setNewMessages((prevMsgs) => [...prevMsgs, data.new_message]);
        }
    })

    return(
    <div>
        {newMessages.map((msg,index)=>
        {
            return(
                <div key={index}>
                    <p>{msg}</p>
                </div>
            )
        })}
        <form>
            <label>
                Enter message:
                <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)}/>
            </label>

        </form>
        <button onClick={() => {sendJsonMessage({type:'message',message})} }>
            Send message
        </button>
    </div>
    ) 
}

export default MessageInterface