import React, { CSSProperties, FunctionComponent } from "react"
import { NotificationType } from "../types"

const notificationStyle: CSSProperties = {
  color: "white",
  fontSize: 17,
  padding: 10
}

const infoStyle: CSSProperties = {
  ...notificationStyle,
  backgroundColor: "green"
}

const errorStyle: CSSProperties = {
  ...notificationStyle,
  backgroundColor: "maroon"
}

export const Notification: FunctionComponent<NotificationType> = ({ message, type }) => (
  type === "none"
    ? null
    :
    <div style={type === "info" ? infoStyle : errorStyle}>
      {message}
    </div>
)
