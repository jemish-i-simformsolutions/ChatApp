import React, { createContext } from "react";
import UserVerification from "./UserVerification";

export const contextdemo = createContext("websocket");

export default function MainPage() {
  return (
    <>
      <contextdemo.Provider value="httpserver">
        <UserVerification />
      </contextdemo.Provider>
    </>
  );
}
