import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import SendIcon from "@material-ui/icons/Send";
import "./chatpage.css";
import Avatar from "@material-ui/core/Avatar";
const socket = io.connect("http://localhost:3030");

export const ChatPage = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  let date = new Date();
  let time = date.getHours() + ":" + date.getMinutes();
  const [sender, setSender] = useState("Unknown");
  const [status, setStatus] = useState();
  const onChangeUser = (e) => {
    setUsername(e.target.value);
  };

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
    const flag = true;
    const data = { flag, username };
    socket.emit("typing", data);
  };

  const handleChat = (e) => {
    e.preventDefault();
    const data = { username, message, time };
    socket.emit("message", data);
  };

  useEffect(() => {
    socket.on("message", (data) => {
      setChat([
        ...chat,
        { username: data.username, message: data.message, time: time },
      ]);
      setMessage("");
      data.username !== username ? setSender(data.username) : setSender(sender);
    });
    socket.on("typing", (data) => {
      if (data.username != username) {
        setStatus("typing...");
      } else {
        setStatus(null);
      }
    });
  });
  const renderChat = () =>
    chat.map((val, index) => {
      return (
        <tr>
          {val.username === username ? (
            <td colSpan="2" align="right">
              <div className="sentmessage" key={index}>
                {val.message}
                <span className="chattime">{" " + val.time}</span>
              </div>
            </td>
          ) : (
            <td colSpan="2" align="left">
              <div className="receivedmessage" key={index}>
                {val.message} <span className="chattime">{" " + val.time}</span>
              </div>
            </td>
          )}
        </tr>
      );
    });
  return (
    <>
      <div className="chatpage">
        <div className="chatheader">
          <table>
            <tbody>
              <tr>
                <td>
                  <Avatar
                    alt="user"
                    src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
                  />
                </td>
                <td>
                  <span className="sendertext">{sender}</span>
                  <br />
                  <span className="status">{status}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="chatarea">
          <table className="chattable">
            <tbody>{renderChat()}</tbody>
          </table>
        </div>

        <div className="inputarea">
          <form onSubmit={handleChat}>
            <table>
              <tbody>
                <tr>
                  <td>
                    {" "}
                    <input
                      type="text"
                      placeholder="name"
                      name="username"
                      value={username}
                      onChange={(e) => onChangeUser(e)}
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      placeholder="message"
                      name="message"
                      value={message}
                      onChange={(e) => onChangeMessage(e)}
                    />
                  </td>
                  <td>
                    {" "}
                    <button type="submit">
                      <SendIcon />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
};
