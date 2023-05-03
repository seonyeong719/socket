import { useEffect, useState } from "react";
import styled from "styled-components";

function Chat({ socket, userName, room }) {
  const [currentMsg, setCurrentMsg] = useState("");
  const [msgList, setMsgList] = useState([]);

  const sendMsg = async () => {
    if (currentMsg !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: currentMsg,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("sendMessage", messageData);
      setMsgList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMsgList((list) => [...list, data]);
      console.log(msgList);
    });
  });
  return (
    <Wrapper>
      <div>
        <p>채팅</p>
      </div>
      <div>
        {msgList.map((msgContent) => {
          return (
            <div>
              <div>
                <p>{msgContent.message}</p>
              </div>
              <div>
                <p>{msgContent.time}</p>
                <p>{msgContent.author}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <input
          type="text"
          placeholder="Hi"
          onChange={(e) => {
            setCurrentMsg(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMsg();
          }}
        />
        <button onClick={sendMsg}>전송</button>
      </div>
    </Wrapper>
  );
}
export default Chat;

const Wrapper = styled.div`
  max-width: 500px;
  height: 700px;
  border: 1px solid black;
`;
