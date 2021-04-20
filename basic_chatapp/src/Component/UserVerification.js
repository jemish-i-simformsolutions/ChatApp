import React from "react";
import { contextdemo } from "./MainPage";
function UserVerification() {
  return (
    <>
      <contextdemo.Consumer>
        {(value) => value + "   hello"}
      </contextdemo.Consumer>
    </>
  );
}
export default UserVerification;
