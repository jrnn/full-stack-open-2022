import React, { CSSProperties, FunctionComponent } from "react"
import { Message } from "../types"

const notificationStyle: CSSProperties = {
  color: "white",
  fontSize: 17,
  padding: 10
}

const successStyle: CSSProperties = {
  ...notificationStyle,
  backgroundColor: "green"
}

const errorStyle: CSSProperties = {
  ...notificationStyle,
  backgroundColor: "maroon"
}

const Notification: FunctionComponent<Message> = ({ text, type }) => (
  type === "none"
    ? null
    :
    <div style={type === "success" ? successStyle : errorStyle}>
      {text}
    </div>
)

export default Notification
