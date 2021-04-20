import React from "react";
import ReactDOM from "react-dom";
import MainPage from "./Component/MainPage";
import { ChatPage } from "./Component/ChatPage";
ReactDOM.render(
  <div>
    <ChatPage />
  </div>,
  document.getElementById("parent")
);
