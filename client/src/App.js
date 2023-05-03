import io from "socket.io-client";
import { useState } from "react";
import Chat from "./chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, serUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("joinRoom", room);
      setShowChat(true);
    }
  };

  return (
    <div>
      {!showChat ? (
        <div>
          <h2>채팅방 가입</h2>
          <input
            type="text"
            placeholder="msg"
            onChange={(e) => {
              serUserName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room Id"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button onClick={joinRoom}>가입</button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
}

export default App;
