import React, { CSSProperties } from "react"
import { useAppSelector } from "../store"

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

export const Notification = () => {
  const { type, message } = useAppSelector(state => state.notification)
  return (
    type === "none"
      ? null
      :
      <div
        id={`notification-${type}`}
        style={type === "info" ? infoStyle : errorStyle}
      >
        {message}
      </div>
  )
}
